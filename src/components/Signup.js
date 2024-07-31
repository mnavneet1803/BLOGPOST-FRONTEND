import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Container from 'react-bootstrap/Container';

function SignUp() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")




    const url = "http://localhost:3004/blog/signup/user"



    function getSignupData(e) {
        e.preventDefault()
     
        console.log(name,email,password)
        fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
             "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })

        }).then((result) => {
            result.json().then((resp) => {
                console.log("resp   :: ", resp)
                if(resp.status==='false'){
                    alert("Please fill all required fields: title, content, and imageUrl")
                }
                else{
                    alert("SignUp Successfully")
                }
                navToPsge()

            })
        })
    }

    const navigate = useNavigate()
    const navToPsge = () => {
        navigate("/")
    }

    return (


        // <Container style={{padding:"120px" }}>
    <Container className=' col-3 ' style={{ marginTop: "10rem" , border:"1px solid black" ,borderRadius:"5px", paddingLeft: "30px",paddingRight: "30px" ,paddingTop: "50px" ,paddingBottom: "50px" }}>
          
                    <Form onSubmit={getSignupData}>
                        <Form.Group className="mb-3" >

                            <Form.Label>Name</Form.Label><br />

                            <Form.Control type="text" placeholder="Enter Your Name" onChange={(e)=>setName(e.target.value)} />

                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Enter Your Email" onChange={(e)=>setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text" placeholder="Enter Your password" style={{ height: '100px' }} onChange={(e)=>setPassword(e.target.value)} />
                        </Form.Group>
                        {/* <Button variant="primary" type="submit">
                            Submit
                        </Button> */}
        <button  className='btn' style={{color:'#ffffff8c', backgroundColor:'#212529'}} type="submit">Submit</button>

                    </Form>
           


        </Container>

    );
}

export default SignUp;
