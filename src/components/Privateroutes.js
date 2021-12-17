import { useState,useEffect } from "react";
import { Redirect, Route } from "react-router";
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box';
import Layout from "./layout";
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
        return ()=>{
            setAuthenicated(false)
        }
    }, []);
    if(loading){
        return (
            <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        )
    }
    return(
        <Route  {...path}
         render={ ({location}) =>
            Authenicated ? 
            (<Layout/>):(<Redirect to={{pathname:"/login", state:{from: location}}}/>)


         }
        
        />
    )
}

export default PrivateRoutes;