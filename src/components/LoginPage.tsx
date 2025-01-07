import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../feature/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage=()=>{
    const [password,setPassword] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault();
        dispatch(login({password,email}));
        navigate('/');
    };

    return (
        <div className='flex justify-center items-center h-screen bg-gray-100'>
            <div className='bg-white shadow-md rounded-lg p-6 w-full max-w-md'>
                
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Email:</label>
                        <input type="email" value={email} className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"onChange={(e)=>setEmail(e.target.value)} required/>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>Password:</label>
                        <input type="password" value={password}
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e)=>setPassword(e.target.value)} required/>
                    </div>
                    <button type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md shadow-sm hover:bg-blue-700"
                    >Submit</button>
                </form>
            </div>
        
        </div>
    )
}
export default LoginPage;