import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks'; 
import { logout } from '../features/auth/authSlice';
import { AppBar,Toolbar,Typography,Button,Avatar } from '@mui/material';

const NavBar:React.FC=()=>{
    const dispatch = useAppDispatch();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { user } = useAppSelector((state: { auth: any; }) => state.auth);
    const handleLogout = () => {
        dispatch(logout());
    };
    return(
        <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Library Management
            </Typography>
            {!user ? (
            <>
                <Button color="inherit" component={Link} to="/login">
                Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                Register
                </Button>
            </>
            ) : (
            <>
                <Avatar sx={{ marginRight: 2 }} />
                <Typography>{user.userName}</Typography>
                <Button onClick={handleLogout}>Logout</Button>
            </>
            )}
        </Toolbar>
    </AppBar>
    )
}
export default NavBar;