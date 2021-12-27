import React,{ useRef,useState} from 'react'
import {Card, Form , Button,Alert} from "react-bootstrap"
import "./componets.css"
import {auth} from "../firebase"
import { createUserWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


export default function Signup() {
    const [email,setEmail] = useState()
    const [password,setPassword]= useState()
    const [passwordConf,setPasswordConf]= useState()

    const [user,setUser] = useState()
  
    const [error,setError] = useState()
    const [loading,setLoading] = useState(false)
    
 console.log(email,passwordConf)
   let navigate=useNavigate()
   
    async function handleSubmit  (e) {
        e.preventDefault()
       
        
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
          });

        if(password!=passwordConf){
            console.log("heee")
            setError("Passwords do not match")
        }
        else{
        try{
            setError("")
            setLoading(true)
            const signInMessage =await createUserWithEmailAndPassword(auth,email,password)
            console.log(signInMessage)
            
        }

        catch{
            setError("Failed to signup")
        }

        setLoading(false)
    }
    }
    return (
       <>
       <Card className="box">
           <Card.Body>
               <h2 className='text-center'>Sign Up</h2>
                   {error && <Alert variant='danger'>{error}</Alert>}
               <Form onSubmit={handleSubmit} >
                   
                   <Form.Group id="email">
                       <Form.Label>Email Id</Form.Label>
                       <Form.Control onChange={(e)=>setEmail(e.target.value)} type="email"  ></Form.Control>
                   </Form.Group>
                   <Form.Group id="password">
                   <Form.Label>Password</Form.Label>
                   <Form.Control onChange={(e)=>setPassword(e.target.value)} type="password" ></Form.Control>
                   </Form.Group>
                   <Form.Group id="password-confirm" className='mb-25'>
                   <Form.Label>Confirm Password</Form.Label>
                   <Form.Control onChange={(e)=>setPasswordConf(e.target.value)}  type="password"></Form.Control>
                   </Form.Group>
                <Button disabled={loading} id="button"className=" w-100" type='submit'>Sign Up</Button>
               </Form>
              
           </Card.Body>
       </Card>
       <div className='text-center'>To Login : <a className='click' onClick={()=>{navigate("/")}}>Click here</a></div>
       </>
    )
}
