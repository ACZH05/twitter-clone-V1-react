import { Button, Col, Image, Row } from "react-bootstrap"

export default function ProfilePostCard({ date, content }) {
    const pic = "https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg"
    const newDate = new Date(date)
    const options = { day: "numeric", month: "long", year: "numeric" }
    const formattedDate = newDate.toLocaleDateString('en-GB', options)
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
