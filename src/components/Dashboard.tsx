import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Box, Card, Container, Drawer, List, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material';
import { Assignment, BookOnlineRounded, DashboardRounded } from '@mui/icons-material';
import StudentDashboard from './StudentDashboard';
import AssignedBooks from './AssignedBook';
import BooksList from './BookList';
const Dashboard:React.FC=()=>{

    const user = useSelector((state:RootState)=>state.auth.currentUser);
    const [page,setPage] = useState('dashboard');
    const handlePage =(value:string)=>{
        setPage(value);
    }
    return (
        <>
        {user?.role==='admin' && 
        <Container>
            <Drawer anchor='left' variant='persistent' open={true}>
                <List>
                    <ListItemButton onClick={()=>handlePage('dashboard')}>
                        <ListItem key='dashboard'> 
                            <ListItemIcon><DashboardRounded/></ListItemIcon>
                            <Typography>Dashboard</Typography> 
                        </ListItem>
                    </ListItemButton>
                    <ListItemButton onClick={()=>handlePage('assigned')}>
                        <ListItem key='assigned'> 
                            <ListItemIcon><Assignment/></ListItemIcon>
                            <Typography>Assigned Books</Typography> 
                        </ListItem>
                    </ListItemButton>
                    <ListItemButton onClick={()=>handlePage('bookslist')}>
                        <ListItem key='bookslist'> 
                            <ListItemIcon><BookOnlineRounded/></ListItemIcon>
                            <Typography>Books List</Typography> 
                        </ListItem>
                    </ListItemButton>
                </List>
            </Drawer>
            <Box>
                { page==='dashboard' && <Card>Dashboard details</Card>}
                { page==='assigned' && <AssignedBooks/>}
                { page==='bookslist' && <BooksList/>}

            </Box>
        </Container>}
        {user?.role==='student' && <StudentDashboard/>}
    </>
    )
}
export default Dashboard;