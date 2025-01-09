import { AppBar, Avatar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { logoutUser } from '../features/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const Navbar=()=>{
    const user = useSelector((state:RootState)=>state.auth.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openLogoutMenu,setLogoutMenu] = useState(false);
    const handleOpenLogoutMenu=()=>{
        setLogoutMenu(true);
    }
    const handleCloseLogoutMenu=()=>{
        setLogoutMenu(false);
    }
    const handleLogout=()=>{
        dispatch(logoutUser());
        navigate('/login');
    }
    return (
        <AppBar>
            <Container>
                <Toolbar>
                    <Typography>Library Management System</Typography> 
                { !user?.id && 
                        <>
                        <MenuItem>
                            <Typography>
                                <Link to="/login">Login</Link></Typography>
                                
                        </MenuItem>
                        <MenuItem>
                        <Typography>
                        <Link to="/register">Register
                        </Link></Typography>
                        </MenuItem>
                        </>
                }
                </Toolbar>
                { user?.id && 
                <Box>
                    <IconButton onClick={handleOpenLogoutMenu}>
                        <Avatar/>
                    </IconButton>
                    <Menu onClose={handleCloseLogoutMenu} open={openLogoutMenu}>
                        <MenuItem onClick={handleLogout}>
                            Logout
                        </MenuItem>
                    </Menu>
                    
                </Box>
                }
            </Container>
        </AppBar>
    )
}
export default Navbar;