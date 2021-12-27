import signup from "./Signup"
import React,{useState} from "react";
import Signup from "./Signup";
import {Container} from 'react-bootstrap'
import Signin from "./Signin";
import {BrowserRouter as Router,Route,Link,Routes, Outlet} from "react-router-dom"
import Dashboard from "./Dashboard";
import {onAuthStateChanged} from "firebase/auth"
import {auth} from "../firebase"




function App() {
  return (
    <>
    <Container className=" d-flex allign-items-center justify-content-center"
    style={{minHeight:"100vh"}}>
      <div className="w-100" style={{maxwidth:"400px"}}>
        <Router>
         <Routes>
           
           <Route  exact path ="/" element={<Signin/>}></Route>
       
           <Route path="Dashboard" element={<Dashboard/>}/>
            <Route  path ="Signup" element={<Signup/>}></Route>
            
        </Routes>
      
      </Router>

      
      
   </div>
    </Container>

    </>
  );
}

/*export var user = auth.currentUser.email;
export function ProtectedRoute(){
  console.log(user);
  return user ? <Outlet/> : <Signin/>;
}*/

export default App;
