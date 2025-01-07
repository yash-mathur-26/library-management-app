import React from 'react';
import { Link } from 'react-router-dom';

const Navbar:React.FC=()=>{
    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className='container mx-auto px-4 py-3 fles justify-between items-center'>
                <h1 className='text-lg font-bold'>Library Management</h1>
                <div className='space-x-4'>
                    <Link to='/' className='hover:underline'>
                        Home
                    </Link>
                    <Link to='/login' className='hover:underline'>
                        Login
                    </Link>
                    <Link to='/register' className='hover:underline'>
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;