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
import {getAuthToken} from "./Auth"

function PostById() {
  let { id } = useParams()

  const [data1, setData] = useState("")
  // console.log(id)

  useEffect(() => {
    getData()
  }, []);

  const getData = () => {
    return Axios.get(`http://localhost:3004/blog/${id}`)
      .then((response) => setData(response.data));

  }

  const [titles, setTitle] = useState("")
  useEffect(() => {
    getTitle()
  }, []);
  const getTitle = () => {
    return Axios.get(`http://localhost:3004/blog/popular/posts/title`)
      .then((response) => setTitle(response.data));

  }



  const [comment, setComment] = useState("")


  useEffect(() => {
    commentData()
  }, []);

  const commentData = () => {
    return Axios.get(`http://localhost:3004/blog/comment/${id}`)
      .then((response) => setComment(response.data));

  }

  // console.log("Comment  :  ", comment.AllComments)

  let newComment = comment.AllComments



  const [content, setContent] = useState()


  const url = `http://localhost:3004/blog/create/comment/${id}`


  const navToPsge = () => {
    window.location.replace(`http://localhost:3000/blog/${id}`)
  }



  function getCommentData(e) {
    let token = getAuthToken()

    e.preventDefault()

    console.log("content   : ", content)
    let comment = { content }
    fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        'Authorization': `${token}`

      },
      body: JSON.stringify(comment)

    }).then((result) => {
      result.json().then((resp) => {
        console.log("resp   :: ", resp)
        navToPsge()


      })
    })
  }


  const navigate = useNavigate();
  const navToPage = () => {
    navigate(`/blog/update/post/${id}`)
  }
  const arr1 = []

  for (let i = 0; i < titles.length; i++) {
    // console.log(`/blog/${titles[i].id}`)
    arr1.push({ title: titles[i].title, to: `/blog/${titles[i].id}`, src: `${titles[i].imageUrl}` })
  }
  // console.log(arr1) 
  // console.log(titles)



  return (



    <Container>
      {
        data1 && data1.PostDetails && (
          <Row>
            <Col xs={12} md={8}>
              <Card  >
                <Card.Img variant="top" src={data1.PostDetails[0].imageUrl} />
                <Card.Header>
                  <small className="text-muted">createdAt {data1.PostDetails[0].createdAt}</small>
                </Card.Header>
                <Card.Body>

                  <Card.Title>{data1.PostDetails[0].title}</Card.Title>
                  <Card.Text>

                    {data1.PostDetails[0].content}

                  </Card.Text>
                  <Button onClick={() => navToPage()} >update Post</Button>

                </Card.Body>

                <Card border="secondary" style={{ margin: '20px' }} >

                  {newComment && newComment.map((item, index) => (
                    <Card.Body key={index}>

                      <Card.Header style={{ float: "left" }}>
                        comment :{item.content}
                      </Card.Header>

                    </Card.Body>
                  ))}
                </Card>

                <Form onSubmit={getCommentData} >
                  <Form.Group className="mb-3 m-5" controlId="formBasicEmail">
                    <Form.Label style={{ float: "left" }} > Comment here </Form.Label>
                    <Form.Control as="textarea" placeholder="Enter Your Comment" onChange={(e) => setContent(e.target.value)} />
                  </Form.Group>

                  <Button variant="primary" style={{ marginRight: "5%" }} type="submit">
                    Comment
                  </Button>
                </Form>
              </Card>
            </Col>
            <Col xs={6} md={4}>
              <Card style={{ width: '40rem' }}>
                <Card.Title>Popular Posts</Card.Title>
                {arr1 && arr1.map((item, index) => {
                  return (
                  

                    <NavLink
                      key={item.to}
                      to={item.to}
                    >
                      {item.title}
                    </NavLink>
                
                  );
                })}
              </Card>
            </Col>
          </Row>
        )
      }
    </Container>
  )

}

export default PostById;