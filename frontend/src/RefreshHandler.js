import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler({setIsAuthenticated}) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('token')){
            setIsAuthenticated(true);
            if(location.pathname === '/' ||
               location.pathname === '/signup' ||
                location.pathname === '/login' 
            ){
                navigate('/home',{replace: false});
            }
        }

    },[location,navigate,setIsAuthenticated])


  return (
    <div>
    
    </div>
  )
}

export default RefreshHandler
