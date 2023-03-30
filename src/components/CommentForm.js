import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';


  const [content , setContent] = useState()
 

  const url="http://localhost:3004/blog/create/comment/:id"
  


  function getCommentData(e){
    console.log( "content   : " , content )
    e.preventDefault()
    
    let comment ={content}
    fetch(url,{
      method:"POST",
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify(comment)

    }).then((result)=>{
      result.json().then((resp)=>{
          console.log("resp   :: ",resp)
          
          
          
      })
    })
  }







function CommentForm() {
  return (
    <Form  onSubmit={getCommentData}  >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" placeholder="Enter Your Comment" />
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default CommentForm;