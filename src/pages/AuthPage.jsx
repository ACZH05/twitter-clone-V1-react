import { useState } from "react"
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap"
import axios from "axios"

export default function AuthPage() {
    const loginImage = "https://sig1.co/img-twitter-1"
    const url = "https://auth-back-end-alfred-chinchin.sigma-school-full-stack.repl.co"
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${url}/signup`, { username, password })
            console.log(res.data)
            setShow(handleClose)
        }
        catch (error) {
            console.error(error)
        }
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
            <Button className="rounded-pill" onClick={handleShow}>Create an account</Button>
            <p style={{ fontSize: "12px" }}>By signing up, you agree to the Term of Service and Privacy Policy, including Cookie Use.</p>

            <p className="mt-4" style={{ fontWeight: 'bold' }}>Already have an account?</p>
            <Button className="rounded-pill" variant="outline-primary">Sign in</Button>
        </Col>
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Body className="d-grid gap-2 px-5">
                <h2 className="mb-4" style={{ fontWeight: 'bold' }}>Create your account</h2>
                <Form className="d-grid gap-2 px-5" onSubmit={handleSignUp}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control onChange={(e) => setUsername(e.target.value)} type="email" placeholder="Enter Email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                    </Form.Group>
                    <p style={{ fontSize: "12px" }}>By signing up, you agree to the Term of Service and Privacy Policy, including Cookie Use.</p>
                    <Button className="rounded-pill" type="submit">Sign Up</Button>
                </Form>
            </Modal.Body>
        </Modal>
      </Col>
    </Row>
  )
}
