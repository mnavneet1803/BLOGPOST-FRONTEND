
import { removeAuthToken } from "./Auth"



function SignOut(){
    removeAuthToken()
    alert("SignOut succesfully" )
  
}   



export default SignOut