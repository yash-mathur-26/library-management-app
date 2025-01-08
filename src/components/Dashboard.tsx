/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography, Grid, Card, CardContent } from '@mui/material';
import { useGetBooksQuery, useGetAssignedBooksQuery } from '../services/booksApi'; // Assuming RTK Query slice
import { useNavigate } from 'react-router-dom';
import { setUser } from '../features/auth/authSlice';

const Dashboard = () => {
const dispatch = useDispatch();
const navigate = useNavigate();

const { user } = useSelector((state: any) => state.auth);

const { data: books, isLoading: booksLoading, isError: booksError } = useGetBooksQuery(undefined);
const { data: assignedBooks, isLoading: assignedBooksLoading, isError: assignedBooksError } = useGetAssignedBooksQuery(undefined);

useEffect(() => {
    if (!user) {
    navigate('/login');
    }
}, [user, navigate]);

    const handleLogout = () => {
        dispatch(setUser(null));
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '250px', backgroundColor: '#f4f4f4', padding: '1rem' }}>
            <Typography variant="h5">Admin Dashboard</Typography>
            <Button onClick={() => navigate('/assigned-books')} fullWidth variant="contained" sx={{ mt: 2 }}>
            Assigned Books
            </Button>
            <Button onClick={() => navigate('/books')} fullWidth variant="contained" sx={{ mt: 2 }}>
            Books List
            </Button>
            <Button onClick={handleLogout} fullWidth variant="contained" sx={{ mt: 2 }}>
            Logout
            </Button>
        </Box>

        <Box sx={{ flexGrow: 1, padding: '1rem' }}>
            <Typography variant="h4" gutterBottom>
            Welcome, {user?.name}
            </Typography>
            <Typography variant="h5" gutterBottom>
            Books List
            </Typography>

            {booksLoading ? (
            <Typography>Loading books...</Typography>
            ) : booksError ? (
            <Typography color="error">Error fetching books</Typography>
            ) : (
            <Grid container spacing={2}>
                {books?.map((book: any) => (
                <Grid item xs={12} sm={6} md={4} key={book.id}>
                    <Card>
                    <CardContent>
                        <Typography variant="h6">{book.title}</Typography>
                        <Typography variant="body2">{book.author}</Typography>
                        <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={() => navigate(`/edit-book/${book.id}`)}>
                        Edit
                        </Button>
                        <Button variant="contained" color="error" sx={{ mt: 1, ml: 1 }} onClick={() => navigate(`/delete-book/${book.id}`)}>
                        Delete
                        </Button>
                    </CardContent>
                    </Card>
                </Grid>
                ))}
            </Grid>
            )}

            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Assigned Books
            </Typography>

            {assignedBooksLoading ? (
            <Typography>Loading assigned books...</Typography>
            ) : assignedBooksError ? (
            <Typography color="error">Error fetching assigned books</Typography>
            ) : (
            <Grid container spacing={2}>
                {assignedBooks?.map((assignedBook: any) => (
                <Grid item xs={12} sm={6} md={4} key={assignedBook.id}>
                    <Card>
                    <CardContent>
                        <Typography variant="h6">{assignedBook.bookTitle}</Typography>
                        <Typography variant="body2">Assigned to: {assignedBook.studentName}</Typography>
                        <Typography variant="body2">Assigned on: {assignedBook.assignmentDate}</Typography>
                        <Typography variant="body2">Return by: {assignedBook.returnDate}</Typography>
                    </CardContent>
                    </Card>
                </Grid>
                ))}
            </Grid>
            )}
        </Box>
        </Box>
    );
};

export default Dashboard;
