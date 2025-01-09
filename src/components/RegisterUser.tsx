import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, MenuItem, Select, TextField, Typography } from '@mui/material';
import './register.css';
import { toast, ToastContainer } from 'react-toastify';
const RegisterUser:React.FC=()=>{
    const [userData,setUserData] = useState({
        fullName:'',
        email:'',
        password:'',
        confirmPassword:'',
        dob:'',
        role:'student'
    })
    const [errors,setErrors] = useState({
        fullName:'',
        email:'',
        password:'',
        confirmPassword:'',
        dob:'',
    })
    const dispatch = useDispatch();
    const validateUser=()=>{
        let isValid = true;
        const newErrors = {
            fullName:'',
            email:'',
            dob:'',
            password:'',
            confirmPassword:'',
        }
        const today = new Date();
        const addedDate = new Date(userData.dob);
        const age = today.getFullYear() - addedDate.getFullYear();
        if(!userData.fullName.trim()){
            newErrors.fullName = 'Full Name is required';
            isValid = false;
        }
        if(!userData.email.trim()){
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(userData.email)){
            newErrors.email = 'Please enter a valid email !'
            isValid = false;
        } 
        if(!userData.password.trim()){
            newErrors.password = 'Password is required';
            isValid = false;
        }
        if(!userData.confirmPassword.trim()){
            newErrors.confirmPassword = 'Please Confirm your password';
            isValid = false;
        } else if(userData.confirmPassword !== userData.password){
            newErrors.confirmPassword = 'Password doesn\'t match';
            isValid = false;
        }
        if(!userData.dob.trim()){
            newErrors.dob = 'Please enter your Date of Birth';
            isValid = false;
        } else if(age<18){
            newErrors.dob = 'Age should be more than or equal to 18 years'
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    }
    const navigate = useNavigate();
    const sendUserRegistration=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
            if(validateUser()){
                const data = {
                    fullName:userData.fullName,
                    email:userData.email,
                    dob:userData.dob,
                    password:userData.password,
                    role:userData.role,
                }
                dispatch(registerUser(data));
                navigate('/login');
            }
        } catch (errors){
            console.log("Error: ",errors);
            if(errors instanceof Error){
                toast.error(errors.message);
            }
        }
    }
    return (
        <Container>
        <Box className="registration-box">
            <ToastContainer/>
            <div className='registration-container'>
            </div>
        
            <form onSubmit={sendUserRegistration} className='registration-form'>
            <Typography className='registration-title'>Register User</Typography>
                <div>
                    <TextField
                        className='text-field'
                        label="Full Name"
                        fullWidth
                        margin="normal"
                        value={userData.fullName}
                        onChange={(e)=>setUserData({...userData,fullName:e.target.value})}
                        error={!!errors.fullName}
                    />
                    { errors.fullName && <p className='error-message'>{errors.fullName}</p>}
                </div>
                <div>
                    <TextField
                        className='text-field'
                        label="Email"
                        fullWidth
                        margin="normal"
                        value={userData.email}
                        onChange={(e)=>setUserData({...userData,email:e.target.value})}
                        error={!!errors.email}
                    />
                    { errors.email && <p className='error-message'>{errors.email}</p>}
                </div>
                <div>
                    <TextField
                        className='text-field'
                        label="Password"
                        fullWidth
                        type="password"
                        margin="normal"
                        value={userData.password}
                        onChange={(e)=>setUserData({...userData,password:e.target.value})}
                        error={!!errors.password}
                    />
                    { errors.password && <p className='error-message'>{errors.password}</p>}
                </div>
                <div>
                    <TextField
                        className='text-field'
                        label="Confirm Password"
                        fullWidth
                        type="password"
                        margin="normal"
                        value={userData.confirmPassword}
                        onChange={(e)=>setUserData({...userData,confirmPassword:e.target.value})}
                        error={!!errors.confirmPassword}
                    />
                    { errors.confirmPassword && <p className='error-message'>{errors.confirmPassword}</p>}
                </div>
                <div>
                    <TextField
                        className='text-field'
                        label="Date of Birth"
                        fullWidth
                        margin="normal"
                        type="date"
                        value={userData.dob}
                        onChange={(e)=>setUserData({...userData,dob:e.target.value})}
                        error={!!errors.dob}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    { errors.dob && <p className='error-message'>{errors.dob}</p>}
                </div>
                <div>
                    <Select
                        className="text-field"
                        label="Role"
                        fullWidth
                        value={userData.role}
                        onChange={(e)=>setUserData({...userData,role:e.target.value})}
                    >
                        <MenuItem value="" disabled>
                            Select role                        
                        </MenuItem>
                        <MenuItem value="admin" key="admin">
                            Admin
                        </MenuItem>
                        <MenuItem value="student" key="student">
                            Student
                        </MenuItem>
                    </Select>
                </div>
                <Button type="submit" className='registeration-button'>Register</Button>
            </form>
        </Box>
        </Container>
    )
}
export default RegisterUser;