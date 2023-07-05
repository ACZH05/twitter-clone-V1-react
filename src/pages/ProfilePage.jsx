import { useEffect } from "react"
import { Button, Container, Navbar, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import useLocalStorage from "use-local-storage"
import ProfileMidBody from "./ProfileMidBody"

export default function ProfilePage() {
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")
    const navigate = useNavigate()

    useEffect(() => {
        if (!authToken) {
            navigate("/login")
        }
    }, [authToken, navigate])
    const handleLogout = () => {
        setAuthToken("")
    }
  return (
    <>
        <Container>
            <Row>
                <ProfileMidBody />
            </Row>
        </Container>
    </>
  )
}
