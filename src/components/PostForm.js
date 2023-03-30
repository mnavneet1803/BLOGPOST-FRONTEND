import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {getAuthToken} from "./Auth"

function PostForm() {

  const [title , setTitle]=useState()
  const [content , setContent] = useState()
  const [imageUrl , setImageUrl]= useState()
  const [titleErr,setTitleErr]=useState(false)
  const [contentErr , setContentErr] = useState()
  const [imageUrlErr , setImageUrlErr]= useState()

  const url="http://localhost:3004/blog/create/post"
  


  function getFormData(e){
    let token = getAuthToken()

    if(titleErr===true||contentErr===true ||imageUrlErr===true){
      alert("please fill all details")
      return
    }
    e.preventDefault()
    
    let data ={title,content,imageUrl}
    fetch(url,{
      method:"POST",
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json",
          'Authorization': `${token}`
      
      },
      body:JSON.stringify(data)

    }).then((result)=>{
      result.json().then((resp)=>{
          console.log("resp   :: ",resp)
          if(resp.status ===false){
            alert("This title is already exist , Please use different title!")
            
          } else if(resp.status==="falseField"){
              alert("Please fill all required fields: title, content, and imageUrl.")
          } else{
            navToPsge()
          }
      })
    })
  }

      const navigate = useNavigate()
   const  navToPsge = ()=>{
      navigate("/")
   }
   const titleHandler = (e)=>{
    let item = e.target.value
    if(item.length<5){
      setTitleErr(true)
    }
    else{
      setTitleErr(false)
      setTitle(e.target.value)
    }

    console.log(e.target.value)
   }
   const contentHandler = (e)=>{
    let item = e.target.value
    if(item.length<5){
      setContentErr(true)
    }
    else{
      setContentErr(false)
      setContent(e.target.value)
    }

    console.log(e.target.value)
   }
   const imageUrlHandler = (e)=>{
    let item = e.target.value
    if(item.length<5){
      setImageUrlErr(true)
    }
    else{
      setImageUrlErr(false)
      setImageUrl(e.target.value)
    }

    console.log(e.target.value)
   }


  return (
 

    <Container>
      <Row>
        <Col xs={12} md={8}>
    <Form  onSubmit={getFormData} >
      <Form.Group className="mb-3" >
        <Form.Label>Title</Form.Label><br/>
        <Form.Text className="text-muted">
          Please Give Title As You Want For Your Blog
        </Form.Text>
        <Form.Control type="text" placeholder="Enter Title" onChange={titleHandler}/>{titleErr?<span style={{color:"red"}} >please fill title field</span>:""}
        
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" placeholder="Enter Your Blog Content" style={{ height: '100px' }}  onChange={contentHandler} />{contentErr?<span  style={{color:"red"}} >please fill content field</span>:""}
      </Form.Group>
    
      <Form.Group className="mb-3" >
        <Form.Label>Image Url</Form.Label>
        <Form.Control type="text" placeholder="Enter Your Image URL" onChange={imageUrlHandler} />{imageUrlErr?<span  style={{color:"red"}} >please fill imageUrl field</span>:""}
      </Form.Group>
      

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Col>
    </Row>

    
      </Container>
    
  );
}

export default PostForm;