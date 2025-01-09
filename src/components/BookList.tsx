import { Box, Button, Container, MenuItem, Modal, Paper, Select, SelectChangeEvent, Table, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { addBook,assignBook, deleteBook, editBook } from '../features/bookSlice';
import { bookAssigned } from '../features/authSlice';
import { RootState } from '../app/store';
import { Add, Delete, Edit } from '@mui/icons-material';
import './booklist.css';
const BooksList:React.FC=()=>{
    const [editBookModal,setEditBookModal] = useState(false);
    const [editData,setEditData] = useState({id:'',title:'',description:'',author:'',quantity:''});
    const [addBookModal,setAddBook] = useState(false);
    const [assignBookModal,setAssignBook] = useState(false);
    const [assignBookData,setAssignBookData] = useState({userId:'',bookId:'',title:'',assignDate:'',returnDate:'',userName:'',status:"Pending"});
    const [bookData,setBookData] = useState({title:'',description:'',author:'',quantity:''});
    const [errors,setError] = useState({title:'',description:'',author:'',quantity:''});
    const [selectedUserId,setUserId] = useState('');
    const books = useSelector((state:RootState)=>state.book.books);
    const openEditBookModal=(bookId:string)=>{
        setEditBookModal(true);
        const book = books.find((book)=>book.id===bookId);
        if(book)
            {setEditData({
            id:book?.id,
            title:book?.title,
            author:book?.author,
            description:book?.description,
            quantity:book?.quantity.toString()
            })
        }
    }
    const closeEditBookModal=()=>{
        setEditBookModal(false)
    }
    const handleEditDetails=(e:React.FormEvent)=>{
        e.preventDefault();
        const editedData = {
            id:editData.id,
            title:editData.title,
            author:editData.author,
            description:editData.description,
            quantity:parseInt(editData.quantity)
        }
        dispatch(editBook(editedData));
        closeEditBookModal();
    }
    const openAddBookModal=()=>{
        setAddBook(true)
    }
    const dispatch = useDispatch();
    const closeAddBook=()=>{
        setAddBook(false)
    }
    
    const handleAssignBook = (title:string,bId:string)=>{
        setAssignBook(true);
        setAssignBookData({
            ...assignBookData,
            bookId:bId,title:title
        })
        
    }
    const bookAssignmentMethod=(e:React.FormEvent)=>{
        e.preventDefault();
        try {
            dispatch(assignBook(assignBookData));
            dispatch(bookAssigned(assignBookData));
        } catch (error) {
            console.log("Error:",error);
            alert("Cannot be assigned");
        }
    }
    const closeAssignBook = ()=>{
        setAssignBook(false);
    }
    const handleDeleteBook=(bookId:string)=>{
        dispatch(deleteBook(bookId));
    }
    const users = useSelector((state:RootState)=>state.auth.users);
    const handleUserChange=(e:SelectChangeEvent<string>)=>{
        const userId = e.target.value;
        setUserId(userId);
        console.log("User Id",userId);
        const user = users.find((user)=>user.id===userId);
        console.log("User Id",userId,user);
        console.log("All users",users);
        if(user){
            setAssignBookData({
                ...assignBookData,userId:userId,userName:user?.fullName
            })
        }
    }
    const handleAddBook=(e:React.FormEvent)=>{
        e.preventDefault();
        if(validate()){
            try {
            const newBookData = {
                    title:bookData.title,
                    author:bookData.author,
                    description:bookData.description,
                    quantity:parseInt(bookData.quantity)
                }
                dispatch(addBook(newBookData));
                closeAddBook();
            } catch (error) {
                console.log("Error:",error);
                alert("Error while adding book");
            }
        }
    }
    const validate=()=>{
        let isValid = true;
        const newError = {title:'',description:'',author:'',quantity:''}
        if(!bookData.title.trim()){
            newError.title="Please add Title";
            isValid = false;
        }
        if(!bookData.author.trim()){
            newError.author="Please add Author";
            isValid = false;
        }
        if(!bookData.description.trim()){
            newError.description="Please add Description";
            isValid = false;
        }
        if(!bookData.quantity.trim()){
            newError.title="Please add Quantity";
            isValid = false;
        }
        setError(newError);
        return isValid;
    }

    return (
        <Container className='container'>
        <Modal
            open={addBookModal} onClose={closeAddBook} 
            aria-labelledby="modal-modal-title" 
            aria-describedby='modal-modal-description'>
                <Box className='modal-box'>
                <Typography className='modal-title'>Add Book</Typography>
                <form onSubmit={handleAddBook} className='modal-form'>
                    <div>
                        <TextField
                            className='text-field'
                            label="Title"
                            fullWidth
                            margin="normal"
                            value={bookData.title}
                            onChange={(e)=>setBookData({...bookData,title:e.target.value})}
                        />
                        { errors.title && <p className='error-message'>{errors.title}</p>}
                    </div>
                    <div>
                        <TextField
                            className='text-field'
                            label="Author"
                            fullWidth
                            margin="normal"
                            value={bookData.author}
                            onChange={(e)=>setBookData({...bookData,author:e.target.value})}
                        />
                        { errors.author && <p className='error-message'>{errors.author}</p>}
                    </div>
                    <div>
                        <TextField
                            className='text-field'
                            label="Description"
                            fullWidth
                            margin="normal"
                            value={bookData.description}
                            onChange={(e)=>setBookData({...bookData,description:e.target.value})}
                        />
                        { errors.description && <p className='error-message'>{errors.description}</p>}
                    </div>
                    <div>
                        <TextField
                            className='text-field'
                            label="Quantity"
                            fullWidth
                            margin="normal"
                            value={bookData.quantity}
                            onChange={(e)=>setBookData({...bookData,quantity:e.target.value})}
                        />
                        { errors.quantity && <p className='error-message'>{errors.quantity}</p>}
                    </div>
                    <Button type="submit" className='primary-button'>Add Book</Button>
                </form>
                </Box>
        </Modal>


        <Modal 
            open={editBookModal} onClose={closeEditBookModal} 
            aria-labelledby="modal-modal-title" 
            aria-describedby='modal-modal-description'>
                <Box className="modal-box">
                <Typography className='modal-title'>Edit Book Details</Typography>
                <form onSubmit={handleEditDetails}>
                    <div>
                        <TextField
                            className='text-field'
                            label="Title"
                            fullWidth
                            margin="normal"
                            value={editData.title}
                            disabled={true}
                            onChange={(e)=>setEditData({...editData,title:e.target.value})}
                        />
                    </div>
                    <div>
                        <TextField
                            className='text-field'
                            label="Author"
                            fullWidth
                            margin="normal"
                            value={editData.author}
                            onChange={(e)=>setEditData({...editData,author:e.target.value})}
                        />
                        { errors.author && <p className='error-message'>{errors.author}</p>}
                    </div>
                    <div>
                        <TextField
                            className='text-field'
                            label="Description"
                            fullWidth
                            margin="normal"
                            value={editData.description}
                            onChange={(e)=>setEditData({...editData,description:e.target.value})}
                        />
                        { errors.description && <p className='error-message'>{errors.description}</p>}
                    </div>
                    <div>
                        <TextField
                            className='text-field'
                            label="Quantity"
                            fullWidth
                            margin="normal"
                            value={editData.quantity}
                            onChange={(e)=>setEditData({...editData,quantity:e.target.value})}
                        />
                        { errors.quantity && <p className='error-message'>{errors.quantity}</p>}
                    </div>
                    <Button className="primary-button" type="submit">Edit Book</Button>
                </form>
                </Box>
        </Modal>



        <Modal 
            open={assignBookModal} onClose={closeAssignBook} 
            aria-labelledby="modal-modal-title" 
            aria-describedby='modal-modal-description'>
                <Box className="modal-box">
                <Typography className='modal-title'>Assign Book</Typography>
                <form onSubmit={bookAssignmentMethod}>
                    <div>
                        <Select className='select-dropdown' id="userdropdown" value={selectedUserId} label="Select User" onChange={handleUserChange}>
                            <MenuItem value="">None</MenuItem>
                            { users.map((user)=>(
                                <MenuItem key={user.id} value={user.id}>
                                    {user.fullName}
                                </MenuItem>
                            )) }
                        </Select>    
                    </div>
                    <div>
                        <TextField
                            className='text-field'
                            label="Assigning Date"
                            fullWidth
                            type="date"
                            margin="normal"
                            value={assignBookData.assignDate}
                            onChange={(e)=>setAssignBookData({...assignBookData,assignDate:e.target.value})}
                        />
                    </div>
                    <div>
                        <TextField
                            className='text-field'
                            label="Return Date"
                            fullWidth
                            margin="normal"
                            type="date"
                            value={assignBookData.returnDate}
                            onChange={(e)=>setAssignBookData({...assignBookData,returnDate:e.target.value})}
                        />
                    </div>
                    <Button className="primary-button" type="submit">Assign Book</Button>
                </form>
                </Box>
        </Modal>




            <Typography className='modal-title'>Books List</Typography>
            <Button className="primary-button" onClick={openAddBookModal}>Add Book</Button>
            {books.length>0 ? (<TableContainer className='table-container' component={Paper}>
                <Table className='table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                        {books.map((book)=>(
                            <TableRow key={book.id}>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.author}</TableCell>
                                <TableCell>{book.description}</TableCell>
                                <TableCell>{book.quantity}</TableCell>
                                <TableCell>
                                    <Button className='primary-button' onClick={()=>{openEditBookModal(book.id)}}><Edit/>Edit</Button>
                                    <Button className='danger-button' onClick={()=>{handleDeleteBook(book.id)}}><Delete/>Delete</Button>
                                    <Button className="secondary-button" onClick={()=>{handleAssignBook(book.title,book.id)}}><Add/>Assign Book</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableHead>
                </Table>
            </TableContainer> ):(<Typography className='no-books'>No Books Added yet !!</Typography>)}
        </Container>
    )
}
export default BooksList;