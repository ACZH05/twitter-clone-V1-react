import axios from "axios"
import jwtDecode from "jwt-decode"
import { useEffect, useState } from "react"
import { Button, Col, Image, Row } from "react-bootstrap"

export default function ProfilePostCard({ date, content, postId }) {
    const pic = "https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg"
    const BASE_URL = "https://twitter-api-alfred-chinchin.sigma-school-full-stack.repl.co"
    const [likes, setLikes] = useState([])
    const newDate = new Date(date)
    const options = { day: "numeric", month: "long", year: "numeric" }
    const formattedDate = newDate.toLocaleDateString('en-GB', options)

    // Decoding to het userId
    const token = localStorage.getItem("authToken")
    const decode = jwtDecode(token)
    const userId = decode.id

    useEffect(() => {
      fetch(`${BASE_URL}/likes/post/${postId}`)
        .then((res) => res.json())
        .then((data) => setLikes(data))
        .catch((error) => console.error("Error: ", error))
    }, [postId])

    const isLiked = likes.some((like) => like.user_id === userId)

    const handleLike = () => (isLiked ? removeFromLikes() : addToLikes())

    const addToLikes = () => {
      axios
        .post(`${BASE_URL}/likes`, {
          user_id: userId,
          post_id: postId
        })
        .then((res) => {
          setLikes([...likes, { ...res.data, likes_id: res.data.id }])
        })
        .catch((error) => console.error("Error: ", error))
    }

    const removeFromLikes = () => {
      const like = likes.find((like) => like.user_id === userId)
      if (like) {
        axios
          .put(`${BASE_URL}/likes/${like.likes_id}`)
          .then(() => setLikes(likes.filter(like => like.user_id !== userId)))
          .catch((error) => console.error("Error: ", error))
      }
    }

  return (
    <Row className="p-3" style={{ borderTop: "1px solid #D3D3D3", borderBottom: "1px solid #d3d3d3" }}>
      <Col sm={1}>
        <Image src={pic} fluid roundedCircle />
      </Col>
      <Col>
        <strong>Haris</strong>
        <span>@haris.samingan ~ {formattedDate}</span>
        <p>{content}</p>
        <div className="d-flex justify-content-between">
            <Button variant="light">
                <i className="bi bi-chat" />
            </Button>
            <Button variant="light">
                <i className="bi bi-repeat" />
            </Button>
            <Button variant="light" onClick={handleLike}>
                {isLiked ? (
                  <i className="bi bi-heart-fill text-danger"></i>
                ) : (
                  <i className="bi bi-heart"></i>
                )}
                {likes.length}
            </Button>
            <Button variant="light">
                <i className="bi bi-heart" />
            </Button>
            <Button variant="light">
                <i className="bi bi-graph-up" />
            </Button>
            <Button variant="light">
                <i className="bi bi-upload" />
            </Button>
        </div>
      </Col>
    </Row>
  )
}
