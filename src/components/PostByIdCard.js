import Card from 'react-bootstrap/Card';

import ReadMore from './ReadMore';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function PostByIdCard(props) {
  
  return (

   <div className='card'>

     <Container>
      <Row>
        <Col xs={12} md={8}>
        <Card  >
            <Card.Img variant="top" src={props.src} />
            <Card.Header>
                <small className="text-muted">createdAt {props.createdAt}</small>
            </Card.Header>
            <Card.Body>
           
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
            
                {props.content} 
          
                </Card.Text>
               
            </Card.Body>
            
        </Card>
        </Col>
        <Col xs={6} md={4}>
          xs=6 md=4
        </Col>
      </Row>

      
    </Container>
   </div>
  );
}



export default PostByIdCard