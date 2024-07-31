
import{Button} from "react-bootstrap"
import { useState } from "react"

const ReadMore = ({children})=>{

    const [isReadMoreShown , setReadMoreShown] = useState(false)
        // const toggleButton=()=>{
        //     setReadMoreShown(prevState =>prevState)
        // }
    return(
    <>

        {isReadMoreShown?children:children.substr(0,100)}
    


       
       </>
    
        )
}

export default ReadMore
