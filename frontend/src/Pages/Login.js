import React, { useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handelError, handleSuccess } from '../utils'
import { backend_url } from '../server';
function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email:'',
        password:''
    })

    const navigate = useNavigate();

    const handleChange= (e)=>{
        const {name, value } = e.target;
        console.log(name,value);
        const copyLoginInfo ={...loginInfo};
        copyLoginInfo[name]= value;
        setLoginInfo(copyLoginInfo);

    }

 const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    // Corrected validation
    if (!email || !password) {
        return handelError('Email, and password are required');
    }

    try {
        const url = `${backend_url}/auth/login`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        });

        const result = await response.json();
        const {success,message,jwtToken,name,error} = result;

        if(success){
            handleSuccess(message);
            localStorage.setItem('token',jwtToken);
            localStorage.setItem('loggedInUser',name);
            setTimeout(()=>{
                navigate('/home')

            }, 1000)
        }else if(error){
            const details = error?.details[0].message;
            handelError(details);
        }else if(success){
            handelError(message);
        }
        console.log(result);
    } catch (err) {
        handelError(err);
    }
};

  return (
 <div className='container'>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
             <div>
                <label htmlFor='email'>Email</label>
                <input
                onChange={handleChange}
                type='email'
                name='email'
                placeholder='Enter your email...' 
                value={loginInfo.email} 
                />
            </div>
             <div>
                <label htmlFor='password'>Password</label>
                <input
                onChange={handleChange}
                type='password'
                name='password'
                placeholder='Enter your Passwrod...'
                value={loginInfo.password}  
                />
            </div>
            <button type='submit'>Login</button>
            <span>Don't have an account?
                <Link to ='/signup'>Signup</Link>

            </span>
        </form>
         <ToastContainer/>
    </div>
  )
}

export default Login
