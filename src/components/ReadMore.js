
import{Button} from "react-bootstrap"
import { useState } from "react"

const ReadMore = ({children})=>{

    const [isReadMoreShown , setReadMoreShown] = useState(false)
        const toggleButton=()=>{
            setReadMoreShown(prevState =>prevState)
        }
    return(
    <>

        {isReadMoreShown?children:children.substr(0,340)}
    

       <Button onClick={toggleButton}></Button>
       
       </>
    
        )
}

export default ReadMore