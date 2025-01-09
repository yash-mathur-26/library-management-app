import React, {useState} from 'react';
import { TextField,Button,Box,Typography } from '@mui/material';
import { useLoginMutation } from '../services/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
const Login=()=>{
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [errors,setErrors] = useState<{email:string,password:string}>({
        email:'',
        password:'',
    });
    const [login] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const validate=():boolean=>{
        let isValid = true;
        const newError = {email:'',password:''};
        if(!email){
            newError.email = 'Email is required';
            isValid = false;
        } else if(!/\S+@\S+\.\S+/.test(email)){
            newError.email = 'Please Enter a valid email';
            isValid = false;
        }

        if(!password){
            newError.password = 'Password is required';
            isValid = false;
        }

        setErrors(newError);
        return isValid;
    }

    const handleLogin = async(e:React.FormEvent)=>{
        e.preventDefault();
        if(validate()){
            const data = await login({email:email,password:password}).unwrap();
            if(data.token){
                const user = {
                    name:data.user.name,
                    email:data.user.email,
                    role:data.user.role,
                    token:data.token
                }
            try {
                dispatch(setUser(user));
                navigate('/dashboard');        
            } catch (error) {
                console.log(error);
                if(error instanceof Error){
                    toast.error(error.message);
                }
            }  
        }
        }
    }

    return (
        <Box style={{backgroundColor:"whitesmoke",boxShadow:"2px 2px"}}maxWidth={400} mx="auto" mt={5}>
        <ToastContainer/>
        <Typography style={{color:"black"}}variant="h4" mb={3}>
        Login
        </Typography>
        <form onSubmit={handleLogin}>
        <TextField
            label="Email"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
        {errors.email && <p style={{color:"red"}}>{errors.email}</p>}
        <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
                {errors.password && <p style={{color:"red"}}>{errors.password}</p>}
        <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
        </Button>
        </form>
    </Box>
    )
}

export default Login;
