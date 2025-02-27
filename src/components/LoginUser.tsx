import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import './loginUser.css';
import loginLibrary from '../assets/libraryPhoto.webp';
import { toast, ToastContainer } from 'react-toastify';
const LoginUser:React.FC=()=>{
    const [formData,setFormData] = useState({email:'',password:''});
    const [ errors,setErrors ] = useState({email:'',password:''});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const validateLoginDetails=()=>{
        let isValid = true;
        const newErrors = {email:'',password:''};
        if(!formData.email.trim()){
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)){
            newErrors.email = 'Please enter a valid email !'
            isValid = false;
        } 
        if(!formData.password.trim()){
            newErrors.password = 'Password is required';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    }
    const loginPortal = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(validateLoginDetails()){
            try {
                dispatch(loginUser({email:formData.email,password:formData.password}));
                navigate('/dashboard');
            } catch (error) {
                if(error instanceof Error){
                    toast.error(error.message);
                }
            }
        }
    }
    return (
        <Container className="loginContainer">
        <Box className="loginbox">
            <ToastContainer/>
            <div className="imageDivision">
                <img src={loginLibrary}/>
            </div>
        
            <form onSubmit={loginPortal}>
                <Typography>Login</Typography>
            <div>
                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={formData.email}
                    onChange={(e)=>setFormData({...formData,email:e.target.value})}
                />
                { errors.email && <p style={{color:"red"}}>{errors.email}</p>}
            </div>
            <div>
                <TextField
                    label="Password"
                    fullWidth
                    type='password'
                    margin="normal"
                    value={formData.password}
                    onChange={(e)=>setFormData({...formData,password:e.target.value})}
                />
                { errors.password && <p style={{color:"red"}}>{errors.password}</p>}
            </div>
            <Button type="submit">Login</Button>
        </form>    
        </Box>
        </Container>
    )
}
export default LoginUser;