import { AppBar, Avatar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { logoutUser } from '../features/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import "./navbar.css";
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
        <AppBar className='app-bar'>
            <Container className='app-bar-container'>
                <Toolbar className='app-bar-toolbar'>
                    <Typography className='app-bar-title'>Library Management System</Typography> 
                    { !user?.id && 
                        <Box className="navbar-items">
                        <MenuItem className='menu-item'>
                            <Typography>
                                <Link to="/login">Login</Link>
                            </Typography>    
                        </MenuItem>
                        <MenuItem className='menu-item'>
                        <Typography>
                            <Link to="/register">Register</Link></Typography>
                        </MenuItem>
                        </Box>
                    }
                </Toolbar>
                { user?.id && 
                <Box className="avatar-box">
                    <IconButton className="icon-button" onClick={handleOpenLogoutMenu}>
                        <Avatar/>
                    </IconButton>
                    <Menu
                        className='logoutMenu'
                        sx={{
                            "& .MuiPaper-root": {
                                top: "43px !important",
                            },
                        }}
                        style={{top:"23px"}}
                        id="menu-appbar"
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            
                        }}
                        open={openLogoutMenu}
                        onClose={handleCloseLogoutMenu}
                        >
                        <MenuItem key='logout' onClick={handleLogout}>
                            <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                        </MenuItem>
                    
                    </Menu>
                </Box>
                }
            </Container>
        </AppBar>
    )
}
export default Navbar;