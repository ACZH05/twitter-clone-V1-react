import { useEffect } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import useLocalStorage from "use-local-storage"
import ProfileMidBody from "./ProfileMidBody"
import ProfileSideBar from "./ProfileSideBar"

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
            <Row>
                <ProfileSideBar handleLogout={handleLogout} />
                <ProfileMidBody />
            </Row>
    </>
  )
}
