import { Container, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const StudentDashboard:React.FC=()=>{
    const assignedBooks = useSelector((state:RootState)=>state.auth.currentUser?.assignedBooks);
    
    return (
        <Container>
            <Typography>Assigned Books List</Typography>
            {(assignedBooks && assignedBooks.length>0) ? (<TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Assign Date</TableCell>
                            <TableCell>Return Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                        {assignedBooks.map((book)=>(
                            <TableRow key={book.id}>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.assignDate}</TableCell>
                                <TableCell>{book.returnDate}</TableCell>
                                <TableCell>{book.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableHead>
                </Table>
            </TableContainer> ):(<Typography>No Books Added yet !!</Typography>)}
        </Container>
    )
}
export default StudentDashboard;