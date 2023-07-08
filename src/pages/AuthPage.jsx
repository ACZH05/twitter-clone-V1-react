import { useEffect, useState } from "react"
import { Button, Col, Form, Image, Modal, Row, Spinner } from "react-bootstrap"
import axios from "axios"
import useLocalStorage from "use-local-storage"
import { useNavigate } from "react-router-dom"

export default function AuthPage() {
    const loginImage = "https://sig1.co/img-twitter-1"
    const url = "https://auth-back-end-alfred-chinchin.sigma-school-full-stack.repl.co"
    const [modalShow, setModalShow] = useState(null)
    const handleShowSignUp = () => setModalShow("SignUp")
    const handleShowLogin = () => setModalShow("Login")

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState("")
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")

    const navigate = useNavigate()

    useEffect(() => {
        if (authToken) {
            navigate("/profile")
        }
    }, [authToken, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        modalShow === "SignUp" ? handleSignUp() : handleLogin()
    }

    const handleLogin = async () => {
        try {
            const res = await axios.post(`${url}/login`, { username, password })
            if (res.data && res.data.auth === true && res.data.token){
                setAuthToken(res.data.token)
                console.log("Login was successful, token saved")
            }
        }
        catch (error) {
            console.error(error)
            const status = error.response.status
            console.log(status)
            if (status >= 400 && status <= 500) setIsError(error.response.data.message)
            console.log(isError)
        }
        setIsLoading(false)
    }

    const handleSignUp = async () => {
        try {
            const res = await axios.post(`${url}/signup`, { username, password })
            console.log(res.data)
        }
        catch (error) {
            console.error(error)
            const status = error.response.status
            if (status >= 400 || status <= 500) setIsError(error.response.data.message)
        }
        setIsLoading(false)
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
            <Button className="rounded-pill" variant="outline-dark">
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
