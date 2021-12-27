import { signInWithEmailAndPassword } from "firebase/auth";
import React,{useState} from "react";
import {Card,Alert,Form,Button} from "react-bootstrap";
import {auth} from "../firebase"
import "./componets.css"
import { onAuthStateChanged} from "firebase/auth";
import {useNavigate} from "react-router-dom"



export default function Signin() {

   const[email,setEmail]=useState()
   const[password,setPassword]=useState()
   const[loading,setLoading]= useState()
   const[user,setUser] =useState()
   const[error,setError]=useState(false)
   
   let navigate=useNavigate()
   async function handleSubmit(e){
       e.preventDefault()

       onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      })
      
      
          setError("")
          try{
          setLoading(true)
         const message= await signInWithEmailAndPassword(auth,email,password)
        navigate("/Dashboard")
         console.log(message)
        }
         catch(error){
             setError("Failed to log in")
         }

   

      setLoading(false)

      
      
       
   }
    return (
        <div>
            <Card className="box">
                <Card.Body>
                    <h2 className="text-center">Sign in</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" onChange={(e)=>{setEmail(e.target.value)}}></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={(e)=>{setPassword(e.target.value)}}></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className="w-100 submit" type="submit" id="button">Login</Button>
                    </Form>
                   
                </Card.Body>
            </Card> 
            <div className="text-center">Don't have an Account : <a className="click" onClick={()=>{navigate("/Signup")}}>Signup</a></div>
        </div>
    )
}
