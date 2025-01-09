import { Box, Button, Container, Modal, Paper, Table, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { returnBook } from '../features/bookSlice';
import { bookReturned } from '../features/authSlice';

const AssignedBooks:React.FC=()=>{
    const [assignBookModal,setAssignBookModal] = useState(false);
    const [bookData,setBookData] = useState({title:'',description:'',author:'',quantity:''});
    const dispatch = useDispatch();
    const handleReturnBook=(id:string,bookId:string,userId:string)=>{
        dispatch(returnBook({id:id,bookId:bookId,userId:userId}));
        dispatch(bookReturned({id:id,bookId:bookId,userId:userId}));
    }
    const closeAddBook=()=>{
        setAssignBookModal(false)
    }
    const assignedBooks = useSelector((state:RootState)=>state.book.assignedBookList);
    const handleAssignBook=(e:React.FormEvent)=>{
        e.preventDefault();
    }
    return (
        <Container>
        <Modal 
            open={assignBookModal} onClose={closeAddBook} 
            aria-labelledby="modal-modal-title" 
            aria-describedby='modal-modal-description'>
                <Box>
                <Typography>Assign Book</Typography>
                <form onSubmit={handleAssignBook}>
                    <div>
                        <TextField
                            label="Title"
                            fullWidth
                            margin="normal"
                            value={bookData.title}
                            onChange={(e)=>setBookData({...bookData,title:e.target.value})}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Author"
                            fullWidth
                            margin="normal"
                            value={bookData.author}
                            onChange={(e)=>setBookData({...bookData,author:e.target.value})}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Description"
                            fullWidth
                            margin="normal"
                            value={bookData.description}
                            onChange={(e)=>setBookData({...bookData,description:e.target.value})}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Quantity"
                            fullWidth
                            margin="normal"
                            value={bookData.quantity}
                            onChange={(e)=>setBookData({...bookData,quantity:e.target.value})}
                        />
                    </div>
                    <Button type="submit">Add Book</Button>
                </form>
                </Box>
        </Modal>

            <Typography>Assigned Books List</Typography>
            {assignedBooks.length>0 ? (<TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell>Assign Date</TableCell>
                            <TableCell>Return Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                        {assignedBooks.map((book)=>(
                            <TableRow key={book.id}>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.userName}</TableCell>
                                <TableCell>{book.assignDate}</TableCell>
                                <TableCell>{book.returnDate}</TableCell>
                                <TableCell>{book.status}</TableCell>
                                <TableCell><Button disabled={(book.status==='Returned'?true:false)} onClick={()=>{handleReturnBook(book.id,book.bookId,book.userId)}}>Return</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableHead>
                </Table>
            </TableContainer> ):(<Typography>No Books Added yet !!</Typography>)}
        </Container>
    )
}
export default AssignedBooks;