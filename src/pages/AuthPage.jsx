import { useContext, useEffect, useState } from "react"
import { Button, Col, Form, Image, Modal, Row, Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../components/AuthProvider"
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"

export default function AuthPage() {
    const loginImage = "https://sig1.co/img-twitter-1"
    const [modalShow, setModalShow] = useState(null)
    const handleShowSignUp = () => setModalShow("SignUp")
    const handleShowLogin = () => setModalShow("Login")

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState("")

    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (currentUser) navigate("/profile")
    }, [currentUser, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        modalShow === "SignUp" ? handleSignUp() : handleLogin()
    }

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, username, password)
        }
        catch (error) {
            console.error(error)
            if (error.code === "auth/wrong-password") {
                setIsError("Email or password incorrect.")
            }
            else if (error.code === "auth/too-many-requests") {
                setIsError("Sorry, you have exceeded the maximum number of allowed login attempts. For security purposes, please try again later.")
            }
        }
        setIsLoading(false)

    }

    const handleSignUp = async () => {
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                username,
                password
            )
            console.log(res.user)
        }
        catch (error) {
            console.error(error)
            setIsError("Email already existed.")
        }
        setIsLoading(false)
    }

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, provider)
        }
        catch (error) {
            console.error(error)
        }
    }

    const handleClose = () => {
        setModalShow(null)
        setIsError("")
    }
  return (
    <Row>
      <Col sm={5}>
        <Image src={loginImage} fluid />
      </Col>
      <Col sm={7} className="p-4">
        <i className="bi bi-twitter" style={{ fontSize: 50, color: "dodgerblue"}}></i>
        <p className="mt-4" style={{ fontSize: 64 }}>Happening Now</p>
        <h2 className="my-5" style={{ fontSize: 31 }}>Join Twitter Today.</h2>
        <Col sm={5} className="d-grid gap-2">
            <Button className="rounded-pill" variant="outline-dark" onClick={handleGoogleLogin}>
                <i className="bi bi-google" /> Sign up with google
            </Button>
            <Button className="rounded-pill" variant="outline-dark">
                <i className="bi bi-apple" /> Sign up with Apple
            </Button>
            <p style={{ textAlign: 'center' }}>or</p>
            <Button className="rounded-pill" onClick={handleShowSignUp}>Create an account</Button>
            <p style={{ fontSize: "12px" }}>By signing up, you agree to the Term of Service and Privacy Policy, including Cookie Use.</p>

            <p className="mt-4" style={{ fontWeight: 'bold' }}>Already have an account?</p>
            <Button className="rounded-pill" variant="outline-primary" onClick={handleShowLogin}>Sign in</Button>
        </Col>
        <Modal show={modalShow !== null} onHide={handleClose} animation={false} centered>
            <Modal.Body>
                <h2 className="mb-4" style={{ fontWeight: 'bold' }}>
                    {modalShow === "SignUp" ? "Create your account" : "Log in to your account"}
                </h2>
                <Form className="d-grid gap-2 px-5" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control onChange={(e) => setUsername(e.target.value)} type="email" placeholder="Enter Email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                    </Form.Group>
                    <p style={{ fontSize: "12px" }}>By signing up, you agree to the Term of Service and Privacy Policy, including Cookie Use.</p>
                    <p className="text-danger">{isError}</p>
                    {isLoading ? (
                        <Button className="rounded-pill" type="submit" disabled>
                            <Spinner animation="border" variant="secondary" size="sm" />
                        </Button>
                    ) : (
                        <Button className="rounded-pill" type="submit">
                            {modalShow === "SignUp" ? "Sign Up" : "Log in"}
                        </Button>
                    )}
                </Form>
            </Modal.Body>
        </Modal>
      </Col>
    </Row>
  )
}
