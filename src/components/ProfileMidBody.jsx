import { Button, Col, Image, Nav, Row, Spinner } from "react-bootstrap"
import ProfilePostCard from "./ProfilePostCard"
import { useEffect, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPostsByUser } from "../features/posts/postsSlice"
import { AuthContext } from "../components/AuthProvider"

export default function ProfileMidBody() {
    const url = "https://pbs.twimg.com/profile_banners/83072625/1602845571/1500x500"
    const pic = "https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg"

    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts.posts)
    const loading = useSelector((state) => state.posts.loading)
    const { currentUser } = useContext(AuthContext)
    const userId = currentUser ? currentUser.uid : null

    useEffect(() => {
        dispatch(fetchPostsByUser(userId))
    }, [dispatch, userId])

    return (
        <Col sm={6} className="bg-light" style={{ border: '1px solid light grey' }}>
            <Image src={url} fluid />
            <br />
            <Image
                src={pic}
                roundedCircle
                style={{
                    width: 150,
                    position: "absolute",
                    top: "140px",
                    border: "4px solid #F8F9FA",
                    marginLeft: 15
                }}
            />

            <Row className="justify-content-end">
                <Col xs="auto">
                    <Button className="rounded-pill mt-2" variant="outline-secondary">Edit Profile</Button>
                </Col>
            </Row>

            <p className="mt-5" style={{ margin: 0, fontWeight: 'bold', fontSize: "15px" }}>Haris</p>
            <p style={{ marginBottom: "2px" }}>@haris.samigan</p>
            <p>
                I help people switch careers to be a software developer at sigmaschool.co
            </p>
            <p>Entrepreneur</p>
            <p><strong>271</strong> Following <strong>610</strong> Followers</p>

            <Nav variant="underline" defaultActiveKey="/home" justify>
                <Nav.Item>
                    <Nav.Link eventKey="/home">Tweets</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Replies</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Highlights</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-3">Media</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-4">Likes</Nav.Link>
                </Nav.Item>
            </Nav>
            {loading && (
                <Spinner animation="border" className="ms-3 mt-3" variant="primary" />
            )}
            {posts.map((post) => (
                <ProfilePostCard key={post.id} post={post} />
            ))}
        </Col>
    )
}