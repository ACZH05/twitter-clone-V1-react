import { useContext, useEffect } from "react"
import { Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
// import ProfileMidBody from "./ProfileMidBody"
import ProfileSideBar from "./ProfileSideBar"
import { getAuth } from "firebase/auth"
import { AuthContext } from "../components/AuthProvider"

export default function ProfilePage() {
    const navigate = useNavigate()
    const auth = getAuth()
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        if (!currentUser) navigate("/login")
    }, [currentUser, navigate])

    const handleLogout = () => auth.signOut()

  return (
    <>
        <Row>
            <ProfileSideBar handleLogout={handleLogout} />
            {/* <ProfileMidBody /> */}
        </Row>
    </>
  )
}
