import { useState,useEffect } from "react";
import {  Navigate ,Outlet} from "react-router";
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box';

import {
    Route,
    Routes,
  } from "react-router-dom";
import LayoutComp from "./LayoutComp";
import AuthorizeGetRequest from "../api/authorizeGetRequest";

const PrivateRoutes =({...path})=>{
    const [Authenicated, setAuthenicated] = useState(false)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        AuthorizeGetRequest('api/ValidateToken').then((response)=>{
            if(response.status === 200){
                setAuthenicated(true)
            }
            setLoading(false)
        });
        
    }, [Authenicated]);
    if(loading){
        return (
            <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        )
    }
    return(
      
            <>
            { Authenicated ? 
                <Outlet/>:<Navigate to={{pathname:"/"}}/>}
            
               
            </>
           
                
            
       
    )
}

export default PrivateRoutes;