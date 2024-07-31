import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useAuth } from './AuthContext';

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const url = "http://localhost:3004/blog/signin/user";

  const getSigninData = (e) => {
    e.preventDefault();

    fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    }).then(result => {
      result.json().then(resp => {
        if (resp.status === 'false') {
          alert("Please fill all required fields: email and password");
        } else {
          signIn(resp.accessToken);
          alert("Signin Successfully");
          navigate("/");
        }
      });
    });
  };

  return (
    <div>

    <Container className=' col-3 ' style={{ marginTop: "10rem" , border:"1px solid black" ,borderRadius:"5px", paddingLeft: "30px",paddingRight: "30px" ,paddingTop: "50px" ,paddingBottom: "50px" }}>
      <Form  onSubmit={getSigninData}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter Your Password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <button  className='btn' style={{color:'#ffffff8c', backgroundColor:'#212529'}} type="submit">Submit</button>
      </Form>
    </Container>
            
    </div>
  );
}

export default SignIn;
