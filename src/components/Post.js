import Card from 'react-bootstrap/Card';
import ReadMore from './ReadMore';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';
import {getAuthToken} from "./Auth"
function Post(props) {
  const navigate = useNavigate();
 

  const navToPage = () => {
    navigate(`blog/${props.id}`)
  }

  function deletePost(id) {
    let token = getAuthToken()
    fetch(`http://localhost:3004/blog/delete/post/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `${token}`
      }
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp.message)
        if(resp.message==="Admin Required!"){
          alert("You are not authorized to delete post")
        }
        else{
          alert("Post deleted successfully")
          window.location.reload();
        }
        
      })
    })
  }
  return (
    <Container className='Container'>
     

          <Card border="info" bg='light' style={{ width: '80rem' , marginTop:"20px" }}>
            <Card.Img variant="top" src={props.src} />
            <Card.Header >
            
              <small  >createdAt {props.createdAt}</small>
             
            </Card.Header>
            <Card.Body>
              <Card.Title>{props.title}</Card.Title>
              <Card.Text>
                <ReadMore>
                  {props.content}
                </ReadMore>
              </Card.Text>
              <Button onClick={() => navToPage()} >ReadMore</Button>
              <Button style={{float:"left"}}  onClick={() => deletePost(props.id)}>Delete Post</Button>
            </Card.Body>
          </Card>
      
    </Container>
  );
}

export default Post;
