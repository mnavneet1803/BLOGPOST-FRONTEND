import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Container from 'react-bootstrap/Container';
import {getAuthToken} from "./Auth"

function ContactUs() {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [content, setContent] = useState()

    const [nameErr, setNameErr] = useState(false)
    const [emailErr, setEmailErr] = useState(false)
    const [contentErr, setContentErr] = useState(false)


    const url = "http://localhost:3004/blog/contact/us"



    function getContactData(e) {
       
        if(nameErr===true || emailErr===true ||contentErr===true){
            alert("please fill all details")
            return
        }
    let token = getAuthToken()

        e.preventDefault()

        let data = { name, email, content }
        fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                 'Authorization': `${token}`

            },
            body: JSON.stringify(data)
            
        }).then((result) => {
            result.json().then((resp) => {
                console.log("resp   :: ", resp)
                if (resp.status === "falseField") {
                    alert("Please fill all required fields: name, email, and content.")
                } else if(resp.status === true){
                    alert("Contected Successfully")
                    navToPsge()
                } 
            })
        })
    }

    const navigate = useNavigate()
    const navToPsge = () => {
        navigate("/")
    }


    function nameHandler(e){
        let item = e.target.value
    
        if(item.length===0){
            setNameErr(true)
        }else{
            setNameErr(false)
         setName(e.target.value)
        }
    }

    function emailHandler(e){
        let item = e.target.value
       
        if(item.length===0){
            setEmailErr(true)
        }else{
            setEmailErr(false)
         setEmail(e.target.value)
        }
    }
    function contentHandler(e){
        let item = e.target.value
        if(item.length===0){
            setContentErr(true)
        }else{
            setContentErr(false)
         setContent(e.target.value)
        }
    }
    
    return (

                 <Container className=' col-3 ' style={{ marginTop: "10rem" , border:"1px solid black" ,borderRadius:"5px", paddingLeft: "30px",paddingRight: "30px" ,paddingTop: "50px" ,paddingBottom: "50px" }}>
  
                    <Form onSubmit={getContactData} >
                        <Form.Group className="mb-3" >
                      
                            <Form.Label>Name</Form.Label><br />
                       
                            <Form.Control type="text" placeholder="Enter Your Name" onChange={nameHandler} />{nameErr?<span style={{color:"red"}}>Please fill Your Name</span>:""}

                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Enter Your Email" onChange={emailHandler} />{emailErr?<span style={{color:"red"}}>Please fill Your Email</span>:""}
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" placeholder="Enter Your Content" style={{ height: '100px' }} onChange={contentHandler} />{contentErr?<span style={{color:"red"}}>Please fill Your Content</span>:""}
                        </Form.Group>


                        <button  className='btn' style={{color:'#ffffff8c', backgroundColor:'#212529'}} type="submit">Submit</button>

                        {/* <Button variant="primary" type="submit">
                            Submit
                        </Button> */}
                    </Form>
          

        </Container>

    );
}

export default ContactUs;
