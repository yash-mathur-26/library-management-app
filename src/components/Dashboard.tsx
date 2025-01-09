import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Box, Card, CardContent, Container, List, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material';
import { Assignment, Book, BookOnlineRounded, DashboardRounded } from '@mui/icons-material';
import StudentDashboard from './StudentDashboard';
import AssignedBooks from './AssignedBook';
import BooksList from './BookList';
import { ToastContainer } from 'react-toastify';
import './dashboard.css'
const Dashboard:React.FC=()=>{
    const user = useSelector((state:RootState)=>state.auth.currentUser);
    const [page,setPage] = useState('dashboard');
    const handlePage =(value:string)=>{
        setPage(value);
    }
    const books = useSelector((state:RootState)=>state.book.books);
    const assignedBookList = useSelector((state:RootState)=>state.book.assignedBookList);
    const totalBooks = books.length;
    const returnedBookLength = assignedBookList.filter((book)=>book.status==='Returned').length
    const assignedBookLength = assignedBookList.length;
    
    return (
        <>
        {user?.role==='admin' && 
        <Container className="dashboard-container" sx={{display:"flex",flexDirection:"row",gap:2,padding:1,marginTop:"6%",marginLeft:"-20px"}}>
            <ToastContainer/>
                <Box className="sidebar-container">
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
                </Box>
            <Box className="mainContainer">
                { page==='dashboard' && 
                    <Container>
                    <Box className="dashboard-cards-container">
                    <Card className="dashboard-card">
                        <CardContent>
                        <Box className="card-content">
                            <Book className="card-icon" />
                            <Box>
                            <Typography variant="h6" className="card-title">
                                Total Books
                            </Typography>
                            <Typography variant="h4" className="card-value">
                                {totalBooks}
                            </Typography>
                            </Box>
                        </Box>
                        </CardContent>
                    </Card>
            
                    <Card className="dashboard-card">
                        <CardContent>
                        <Box className="card-content">
                            <Book className="card-icon" />
                            <Box>
                            <Typography variant="h6" className="card-title">
                                Assigned Books
                            </Typography>
                            <Typography variant="h4" className="card-value">
                                {assignedBookLength}
                            </Typography>
                            </Box>
                        </Box>
                        </CardContent>
                    </Card>
            
                    <Card className="dashboard-card">
                        <CardContent>
                        <Box className="card-content">
                            <Book className="card-icon" />
                            <Box>
                            <Typography variant="h6" className="card-title">
                                Returned Books
                            </Typography>
                            <Typography variant="h4" className="card-value">
                                {returnedBookLength}
                            </Typography>
                            </Box>
                        </Box>
                        </CardContent>
                    </Card>
                    </Box>
                </Container>
                }
                { page==='assigned' && <AssignedBooks/>}
                { page==='bookslist' && <BooksList/>}

            </Box>
        </Container>}
        {user?.role==='student' && <StudentDashboard/>}
    </>
    )
}
export default Dashboard;