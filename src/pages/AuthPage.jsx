import { Button, Col, Image, Row } from "react-bootstrap"

export default function AuthPage() {
    const loginImage = "https://sig1.co/img-twitter-1"
  return (
    <Row>
      <Col sm={6}>
        <Image src={loginImage} fluid />
      </Col>
      <Col sm={6} className="p-4">
        <i className="bi bi-twitter" style={{ fontSize: 50, color: "dodgerblue"}}></i>
        <p className="mt-5" style={{ fontSize: 64 }}>Happening Now</p>
        <h2 className="my-5" style={{ fontSize: 31 }}>Join Twitter Today.</h2>
        <Col sm={5} className="d-grid gap-2">
            <Button className="rounded-pill" variant="outline-dark">
                <i className="bi bi-google" /> Sign up with google
            </Button>
            <Button className="rounded-pill" variant="outline-dark">
                <i className="bi bi-apple" /> Sign up with Apple
            </Button>
            <p style={{ textAlign: 'center' }}>or</p>
            <Button className="rounded-pill">Create an account</Button>
            <p style={{ fontSize: "12px" }}>By signing up, you agree to the Term of Service and Privacy Policy, including Cookie Use.</p>

            <p className="mt-5" style={{ fontWeight: 'bold' }}>Already have an account?</p>
            <Button className="rounded-pill" variant="outline-primary">Sign in</Button>
        </Col>
      </Col>
    </Row>
  )
}
