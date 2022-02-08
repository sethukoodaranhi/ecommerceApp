import React from 'react'
import './register.css'
import { Form, Button } from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'
import { useState,useContext } from 'react'
import axios from 'axios'
import { LoginContext } from '../Context/LoginContext'
export default function Login() {
    
    var{usrname}= useContext(LoginContext)
    const{setUserName}=useContext(LoginContext)
    let navigate=useNavigate()
    const [Login, setLogin] = useState({
        username:"",
        password:""
    });
    const LoginHandler=(e)=>{
      const {name,value}=e.target
      setLogin({
          ...Login,
          [name]:value
      })
    //   setUsername(Login.username)
      
    }
    
    const FetchUser=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:5000/api/logn',Login)
        .then((response)=>{
            console.log(response.data.data)
            usrname=response.data.data.username
            console.log(usrname)
            if(response.data.data.role===1)
            {
                navigate('/adminhome')
                localStorage.setItem("eshopyuserdetail",JSON.stringify({
                    username:response.data.data.username,
                    role:response.data.data.role
                }))
               
            }
            else{
                localStorage.setItem("eshopyuserdetail",JSON.stringify({
                    username:response.data.data.username,
                    role:response.data.data.role
                }))
                navigate('/home')
            }
            // setLogin({
            //     username:response.data.data.username
                
            // })
            // setUsername(response.data.data.username)            
            // navigate('/home')
            
           
        })
    }
   
   
    return (
        <div className="Register" style={{ width: "100%", height: "100vh" }}>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <h1 className='text-center text-white mt-2'>Login</h1>
                        
                            <div className='row'>
                                <div className='col-lg-6 text-center mt-5 pt-5'>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text" name='username' placeholder="Username" onChange={(e)=>{setLogin({...Login,username:e.target.value});setUserName(e.target.value)}}/>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="password" name='password' placeholder="Password" onChange={LoginHandler}/>
                                        </Form.Group>

                                        
                                        <Button variant="primary" type="submit" onClick={FetchUser}>
                                            Login
                                        </Button><br></br>
                                        
                                        <Link to='/register' ><label className='text-white mt-2' style={{cursor:"pointer"}}>Create New Account</label></Link>
                                    </Form>
                                </div>
                                <div className='col-lg-6 mt-5'>
                                    <img src='https://ordersells.com/wp-content/uploads/2020/05/shopping-transparent-ecommerce-4.png'></img>
                                </div>
                            </div>

                       
                    </div>
                </div>
            </div>
        </div>
    )
}
