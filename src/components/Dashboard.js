import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useState ,useEffect} from 'react'
import { db } from '../firebase'
import {collection, getDocs,doc,addDoc, setDoc, deleteDoc} from "firebase/firestore"
import {user} from "./App"
import {Alert, Button, Card,Form,Table} from "react-bootstrap"
import {BrowserRouter as Router,Route,Link,Routes, Outlet} from "react-router-dom"
import "./componets.css"



import "./componets.css"
import { async } from '@firebase/util'

export default function Dashboard() {
   // console.log(user)
    

   
        
    
   const[user,setUser] = useState([])
    const userCollection = collection(db,"users");
    const [count,setCount] = useState(0)
    const[name,setName] = useState()
    const[age,setAge] = useState()
    const[country,setCountry]=useState()
    const[phone,setPhone]= useState()
    const[ocupation,setOcupation]= useState()
    const[error,setError]=useState()
  
    
    useEffect(()=>{
       const getUser = async ()=>{
          const store = await getDocs(userCollection)
          //console.log(store)
          setUser(store.docs.map((doc)=>({ id: doc.id, ...doc.data() })))
          setCount(count+1)
          
       }
       getUser()
    },[])
   // console.log(age,name,country,ocupation,phone)


    const addUser= async (e)=>{
        e.preventDefault()
        
        let newData={Name:name,Age:age,Country:country,Ocupation:ocupation,Phone:phone}
        console.log(newData)
        const newdocref = await doc(collection(db,"users"));

        setDoc(newdocref,newData);
           
        
    }

    const deleteUser = async (id)=>{
        console.log(id)
        const userdata =   doc(db,"users",id)
        console.log(userdata)
       await deleteDoc(userdata)
    }
   
   async function logOut(){

        try {
            
            const out=await signOut(auth)
            console
            .log(out)
            navigate("/")
        }
        catch(err){
            setError(err)
        }
    }
    let navigate=useNavigate()
    
    return (
        <>
        <Button  className="log-out" onClick={logOut}>Log Out</Button>
        {error && <Alert variant='danger'>{error}</Alert>}
        <br></br>
        <br></br>
        <h1 className='title'>React FireBase Crud</h1>
        <div className='top text-center'> User Details :</div>
        <Card> 
        <Card.Body>
        <div> 
            
                    
            { user.map((details)=>{
                
                 return (
                     
                       <Card className='new-card'>
                         <Card.Body>
                           <h2 className='text-center'>
                               
                            {details.Name} {" "}
                            {details.Age} {" "}
                           {details.Country} {" "}
                           {details.Ocupation}{" "}
                            {details.Phone} 
                            </h2>  
                           
                            </Card.Body>

                           <div className='text-center'> <Button style={{width:"300px"}} variant='danger' onClick={()=>{deleteUser(details.id)}}>delete</Button></div>
                  
                   
                       </Card>      
                )
            })}
            
           
        </div> 
         </Card.Body>
        </Card>
    <Card className='add-user'>
        <Card.Header className='text-center'>ADD USER</Card.Header>
        <Card.Body>
        <Form onSubmit={addUser}>
        <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control input='text' placeholder='Jacob' onChange={(e)=>{setName(e.target.value)}}></Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>Age</Form.Label>
            <Form.Control input='number' placeholder='23' onChange={(e)=>{setAge(e.target.value)}}></Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>Country</Form.Label>
            <Form.Control input='text' placeholder='France' onChange={(e)=>{setCountry(e.target.value)}}></Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>Ocupation</Form.Label>
            <Form.Control input='text' placeholder='doctor' onChange={(e)=>{setOcupation(e.target.value)}}></Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control input='number' placeholder='234541411' onChange={(e)=>{setPhone(e.target.value)}}></Form.Control>
        </Form.Group>

    <div className='text-center'><Button type="submit" variant='dark'  id="button"> ADD</Button></div>
    </Form>
        </Card.Body>
</Card>
       
        
        </>
    )
}



