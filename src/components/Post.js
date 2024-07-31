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
    <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center'>
     

          <Card border="1px solid #212529" bg='light' style={{ width: '300px' , marginTop:"20px" ,height:"525px" ,overflow:"hidden"}}>
            <Card.Img height="300px" variant="top" src={props.src} />
            <Card.Header >
            
              <small  >createdAt {props.createdAt.substring(0, 10)}</small>
             
            </Card.Header>
            <Card.Body>
              <Card.Title>{props.title}</Card.Title>
              <Card.Text style={{}}>
                <ReadMore>
                  {props.content.substring(0, 97)+"..."}
                </ReadMore>
              </Card.Text>
              <div style={{display:"flex",justifyContent:"space-between"}} >
              <button  className='btn' style={{color:'#ffffff8c', backgroundColor:'#212529'}} onClick={() => navToPage()}>ReadMore</button>
              <button  className='btn' style={{color:'#ffffff8c', backgroundColor:'#212529'}} onClick={() => deletePost(props.id)}>Delete Post</button>
              {/* <Button onClick={() => navToPage()} >ReadMore</Button> */}
              {/* <Button  onClick={() => deletePost(props.id)}>Delete Post</Button> */}
              </div>
            </Card.Body>
          </Card>
      
    </div>
  );
}

export default Post;
