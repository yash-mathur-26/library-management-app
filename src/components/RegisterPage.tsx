import React, {useState} from 'react';
import { TextField,Button,Box,Typography,MenuItem } from '@mui/material';
import { useRegisterMutation } from '../services/authApi';
import { useNavigate } from 'react-router-dom';
const roles = ['admin', 'student'];
const RegisterPage=()=>{
    const [register] = useRegisterMutation();
    const [formData,setFormData] = useState<{
        fullName:string;
        email:string;
        password:string;
        confirmPassword:string;
        dob:string;
        role:string;
    }>({
        fullName:'',
        email:'',
        password:'',
        confirmPassword:'',
        dob:'',
        role:'student',
    });
    const [errors,setErrors] = useState<{
        fullName:string;
        email:string;
        password:string;
        confirmPassword:string;
        dob:string;
    }>({
        fullName:'',
        email:'',
        password:'',
        confirmPassword:'',
        dob:''
    })
    const navigate = useNavigate();
    const validateForm = (): boolean => {
        let isValid = true;
        const newErrors = { fullName: '', email: '', password: '', confirmPassword: '', dob: '' };
    
        if (!formData.fullName) {
            newErrors.fullName = 'Name is required';
            isValid = false;
        }
        if (!formData.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
            isValid = false;
        }
    
        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        }
    
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirm Password is required';
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }
    
        if (!formData.dob) {
            newErrors.dob = 'Date of birth is required';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    const handleRegister=async(e:React.FormEvent)=>{
        e.preventDefault();
        if(validateForm()){
            try {
                const userData = {
                    fullName:formData.fullName,
                    email:formData.email,
                    password:formData.password,
                    dob:formData.dob,
                    role:formData.role
                }
                await register(userData).unwrap();
                
                setFormData({
                    fullName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    dob: '',
                    role: '',
                });
                setErrors({
                    fullName:'',
                    email:'',
                    password:'',
                    confirmPassword:'',
                    dob:''
                });
                navigate('/login');
            } catch (error) {
                console.error('Registration failed', error);
                alert('Registration failed. Please try again.');
            }
        }
    }

    return (
            <Box style={{backgroundColor:"whitesmoke",boxShadow:"2px 2px"}} maxWidth={500} mx="auto" mt={5}>
            <Typography variant="h4" mb={3} style={{color:"black"}}>
            Register
            </Typography>
            <form onSubmit={handleRegister}>
            <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
            />
            {errors.fullName && <p style={{color:"red"}}>{errors.fullName}</p>}
            <TextField
                label="Email"
                fullWidth
                margin="normal"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
            />
                        {errors.email && <p style={{color:"red"}}>{errors.email}</p>}
            <TextField
                label="Password"
                fullWidth
                margin="normal"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
            />
                        {errors.password && <p style={{color:"red"}}>{errors.password}</p>}
            <TextField
                label="Confirm Password"
                fullWidth
                margin="normal"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
            />
                        {errors.confirmPassword && <p style={{color:"red"}}>{errors.confirmPassword}</p>}
            <TextField
                label="Date of Birth"
                fullWidth
                margin="normal"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                required
            />
                        {errors.dob && <p style={{color:"red"}}>{errors.dob}</p>}
            <TextField
                label="Role"
                fullWidth
                margin="normal"
                select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
            >
                {roles.map((r) => (
                <MenuItem key={r} value={r}>
                    {r}
                </MenuItem>
                ))}
            </TextField>
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Register
            </Button>
            </form>
        </Box>

    )

}
export default RegisterPage;