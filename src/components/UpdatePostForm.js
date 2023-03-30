import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect } from 'react';
import Axios from "axios";
import { getAuthToken } from "./Auth"

function UpdatePostForm() {
  let { id } = useParams()

  const [data1, setData] = useState([])

  useEffect(() => {
    getData()
  }, []);

  const getData = () => {
    return Axios.get(`http://localhost:3004/blog/${id}`)
      .then((response) => setData(response.data));
  }

  let datas
  {
    data1 && data1.PostDetails && data1.PostDetails.length > 0 && (datas = data1.PostDetails[0])
  }

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (datas && datas.title) {
      setTitle(datas.title);
    }
  }, [datas]);

  useEffect(() => {
    if (datas && datas.content) {
      setContent(datas.content);
    }
  }, [datas]);

  useEffect(() => {
    if (datas && datas.imageUrl) {
      setImageUrl(datas.imageUrl);
    }
  }, [datas]);

  const url = `http://localhost:3004/blog/update/post/${id}`

  function getFormData(e) {
    let token = getAuthToken()

    e.preventDefault()

    let data = { title, content, imageUrl }

    fetch(url, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${token}`

      },
      body: JSON.stringify(data)
    }).then((result) => {
      result.json().then((resp) => {

        if (resp.status === false) {
          alert("This title is already exist , Please use different title!")
        } else if(resp.status === "falseUser"){
          alert("not vailid user to update post")
        } else {
          alert("Post Updated Successfully")
          navToPsge()
        }
      })
    }).catch((error) => console.log("Form submit error", error));
  }

  const navigate = useNavigate()

  const navToPsge = () => {
    navigate("/")
  }

  return (

    <Container>
      {data1 && data1.PostDetails && data1.PostDetails.length > 0 && (
        <Row>
          <Col xs={12} md={8}>
            <Form onSubmit={getFormData}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label><br />
                <Form.Text className="text-muted">
                  Please Give Title As You Want For Your Blog
                </Form.Text>
                <Form.Control type="text" id="title" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Content</Form.Label>
                <Form.Control type="text" id="content" placeholder="Enter Your Blog Content" value={content} style={{ height: '100px' }} onChange={(e) => setContent(e.target.value)} />

              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label>Image Url</Form.Label>
                <Form.Control type="text" id="imageUrl" placeholder="Enter Your Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

              </Form.Group>


              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>

          </Col>
        </Row>
      )
      }


    </Container>


  );
}

export default UpdatePostForm;