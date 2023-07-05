import axios from "axios"
import jwtDecode from "jwt-decode"
import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"

export default function NewPostModal({ show, handleClose }) {
    const [postContent, setPostContent] = useState("")

    const handleSave = () => {
        const token = localStorage.getItem("authToken")
        const decode = jwtDecode(token)
        const userId = decode.id

        const data = {
            title: "Post Title",
            content: postContent,
            user_id: userId
        }

        axios
            .post("https://twitter-api-alfred-chinchin.sigma-school-full-stack.repl.co/posts", data)
            .then((res) => {
                console.log("Success: ", res.data)
                handleClose()
            })
            .catch((error) =>[
                console.error("Error: ", error)
            ])
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="postContent">
                            <Form.Control
                                placeholder="What is happening?"
                                as="textarea"
                                rows={3}
                                onChange={(e) => setPostContent(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="rounded-pill" onClick={handleSave}>Tweet</Button>
                </Modal.Footer>
            </Modal>  
        </>
    )
}
