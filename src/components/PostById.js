import Axios from "axios";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { Button } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { getAuthToken } from "./Auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 function PostById() {
  const { id } = useParams();
  const [data1, setData] = useState([]);
  const [titles, setTitle] = useState([]);
  const [comment, setComment] = useState([]);
  const [content, setContent] = useState("");
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  // Fetch post data
  useEffect(() => {
    setToken(getAuthToken())
    Axios.get(`http://localhost:3004/blog/${id}`)
      .then((response) => setData(response.data));
  }, [id]);

  // Fetch popular post titles
  useEffect(() => {
    Axios.get(`http://localhost:3004/blog/popular/posts/title`)
      .then((response) => setTitle(response.data));
  }, [id]);

  // Fetch comments for the post
  useEffect(() => {
    Axios.get(`http://localhost:3004/blog/comment/${id}`)
      .then((response) => setComment(response.data));
  }, [id]);

  // Function to handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (token == null) {
      toast.error("Please sign in before commenting on any post");
      return;
    }

    // Post comment data
    Axios.post(`http://localhost:3004/blog/create/comment/${id}`, { content }, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        'Authorization': `${token}`
      }
    })
    .then(() => {
      toast.success("Comment added successfully!");
      navigate(`/blog/${id}`);
    })
    .catch(error => {
      toast.error("Failed to add comment.");
      console.error("Error adding comment:", error);
    });
  };

  // Generate popular posts links
  const popularPosts = titles.map(post => ({
    title: post.title,
    to: `/blog/${post.id}`,
    src: post.imageUrl
  }));
  return (
    <>
      <ToastContainer />
      <Container fluid>
        {data1 && data1.PostDetails && (
          <Row>
            <Col>
              <Card style={{ width: '40rem', marginTop: "20px" }}>
                <Card.Img variant="top" height="400px" width="200px" src={data1.PostDetails[0].imageUrl} />
                <Card.Header>
                  <small className="text-muted">Created At: {data1.PostDetails[0].createdAt.substring(0, 10)}</small>
                </Card.Header>
                <Card.Body>
                  <Card.Title>{data1.PostDetails[0].title}</Card.Title>
                  <Card.Text>
                    {data1.PostDetails[0].content}
                  </Card.Text>
                  <Button variant="dark" onClick={() => {token==null ? toast.error("Please sign in before Updating on any post"): navigate(`/blog/update/post/${id}`)}}>Update Post</Button>
                </Card.Body>

                <Card border="secondary" style={{ margin: '20px' }}>
                  {comment && comment.AllComments && comment.AllComments.map((item, index) => (
                    <Card.Body key={index}>
                      <Card.Header style={{textAlign:"start"}}>Comment: {item.content}</Card.Header>
                    </Card.Body>
                  ))}
                </Card>

                <Form onSubmit={handleCommentSubmit}>
                  <Form.Group className="mb-3 m-5" controlId="formBasicComment">
                    <Form.Label>Comment Here</Form.Label>
                    <Form.Control as="textarea" placeholder="Enter Your Comment" value={content} onChange={(e) => setContent(e.target.value)} />
                  </Form.Group>
                  <Button variant="dark" type="submit">Comment</Button>
                </Form>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: '35rem', marginTop: "20px", marginLeft: "40px" }}>
                <Card.Title>Popular Posts</Card.Title>
                {popularPosts.map((item, index) => (
                  <NavLink key={index} to={item.to}>
                    <div>{item.title}</div>
                  </NavLink>
                ))}
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}

export default PostById;
