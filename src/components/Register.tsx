import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Register=()=>{
    const [fullName,setFullName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [dob,setDOB] = useState('');
    const [role,setRole] = useState('student');
    const [errors,setErrors] = useState<{[key:string]:string}>({});
    const navigate = useNavigate();

    const validateForm=():boolean=>{
        const newErrors:{[key:string]:string}={};
        if(!fullName.trim()) {
            newErrors.fullName='Full name is required'
        }
        if(!email.trim()){
            newErrors.email = 'Email is required'
        } else if(!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is not valid';
        }
        if(!password.trim()){
            newErrors.password='Password is required';
        } else if(password.length<8) {
            newErrors.password = 'Password must be greater than 8 characters'
        }
        if(!confirmPassword.trim()){
            newErrors.confirmPassword = 'Confirm password is required';
        } else if(password!==confirmPassword){
            newErrors.confirmPassword = 'Password doesn\'t match'
        }
        if(!dob.trim()){
            newErrors.dob = 'Date of birth is required';
        }
        if(!role){
            newErrors.role= 'Please select a role';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length===0;
    }
    const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault();
        if(validateForm()){
            console.log('User Registered:',{fullName,email,password,dob,role});
            navigate('/login');
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <input
                        id="fullname"
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
            {errors.fullname && <p style={{ color: 'red' }}>{errors.fullname}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />{errors.confirmPassword && (
                        <p style={{ color: 'red' }}>{errors.confirmPassword}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                        Date of Birth
                    </label>
                    <input
                        id="dob"
                        type="date"
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={dob}
                        onChange={(e) => setDOB(e.target.value)}
                        required
                    />
                    {errors.dob && <p style={{ color: 'red' }}>{errors.dob}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                        Role
                    </label>
                    <select
                        id="role"
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                    </select>
                    {errors.role && <p style={{ color: 'red' }}>{errors.role}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md shadow-sm hover:bg-blue-700"
                >
                    Register
                </button>
            </form>
        </div>
    </div>
    )
}

export default Register;