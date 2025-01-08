import React, {useState} from 'react';
import { TextField,Button,Box,Typography } from '@mui/material';
const Login=()=>{
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [errors,setErrors] = useState<{email:string,password:string}>({
        email:'',
        password:'',
    });

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

    const handleLogin = (e:React.FormEvent)=>{
        e.preventDefault();
        if(validate()){
            console.log('Login Successful')
        }
    }

    return (
        <Box style={{backgroundColor:"whitesmoke",boxShadow:"2px 2px"}}maxWidth={400} mx="auto" mt={5}>
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
