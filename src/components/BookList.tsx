import { Box, Button, Container, MenuItem, Modal, Paper, Select, SelectChangeEvent, Table, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { addBook,assignBook, deleteBook, editBook, showError } from '../features/bookSlice';
import { bookAssigned, updateBookDetails } from '../features/authSlice';
import { RootState } from '../app/store';
import { Add, Cancel, Delete, Edit } from '@mui/icons-material';
import './booklist.css';
import { toast, ToastContainer } from 'react-toastify';
const BooksList:React.FC=()=>{
    const [editBookModal,setEditBookModal] = useState(false);
    const [editData,setEditData] = useState({id:'',title:'',description:'',author:'',quantity:''});
    const [addBookModal,setAddBook] = useState(false);
    const [assignBookModal,setAssignBook] = useState(false);
    const [assignBookData,setAssignBookData] = useState({userId:'',bookId:'',title:'',assignDate:'',returnDate:'',userName:'',status:"Pending"});
    const [bookData,setBookData] = useState({title:'',description:'',author:'',quantity:''});
    const [deleteBookData,setDeleteBookData] = useState({title:'',bookId:''});
    const [deleteModal,setDeleteModal] = useState(false);
    const [errors,setError] = useState({title:'',description:'',author:'',quantity:''});
    const [selectedUserId,setUserId] = useState('');
    const [assignedErrors,setAssignError] = useState({userName:'',assignDate:'',returnDate:''});
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
        setEditData({
            id:'',
            title:'',
            author:'',
            description:'',
            quantity:''
            })
    }
    const handleEditDetails=(e:React.FormEvent)=>{
        e.preventDefault();
        if(editFormValidate()){
            const editedData = {
                id:editData.id,
                title:editData.title,
                author:editData.author,
                description:editData.description,
                quantity:parseInt(editData.quantity)
            }
            try {
                closeEditBookModal();
                dispatch(editBook(editedData));
                dispatch(updateBookDetails({bookId:editedData.id,title:editedData.title}));
            } catch (error) {
                console.log("Error",error);
                if(error instanceof Error){
                    toast.error(error.message);
                }
            }
        }
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
        if(assignFormValidate())
            {try {
            dispatch(assignBook(assignBookData));
            dispatch(bookAssigned(assignBookData));
            closeAssignBook();
        } catch (error) {
            console.log("Error",error);
            if(error instanceof Error){
                toast.error(error.message);
            }
        }
    }
    }
    const closeAssignBook = ()=>{
        setAssignBook(false);
        setAssignBookData({
            userId:'',bookId:'',title:'',assignDate:'',returnDate:'',userName:'',status:"Pending"
        })
        setAssignError({
            userName:'',assignDate:'',returnDate:''
        })
    }
    const handleDeleteBook=(bookId:string)=>{
        try {
            dispatch(deleteBook(bookId));
            closeDeleteModal();        
        } catch (error) {
            console.log("Error",error);
            if(error instanceof Error){
                toast.error(error.message);
            }
        }
    }

    const handleDeleteBookModal=(bookId:string,bookTitle:string)=>{
        setDeleteBookData({bookId:bookId,title:bookTitle});
        setDeleteModal(true);
    }
    const closeDeleteModal=()=>{
        setDeleteBookData({bookId:'',title:''});
        setDeleteModal(false);
    }

    useEffect(()=>{
        showError(null);
    },[])
    const users = useSelector((state:RootState)=>state.auth.users);
    const handleUserChange=(e:SelectChangeEvent<string>)=>{
        const userId = e.target.value;
        setUserId(userId);
        const user = users.find((user)=>user.id===userId);
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
                setBookData({
                    title:"",
                    author:"",
                    description:"",
                    quantity:""
                })
                dispatch(addBook(newBookData));
                closeAddBook();
            } catch (error) {
                console.log("Error",error);
                if(error instanceof Error){
                    toast.error(error.message);
                }
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
    const editFormValidate=()=>{
        let isValid = true;
        const newError = {title:'',description:'',author:'',quantity:''}
        if(!editData.title.trim()){
            newError.author = "Please add Book Title"
            isValid = false;
        }
        if(!editData.author.trim()){
            newError.author="Please add Author";
            isValid = false;
        }
        if(!editData.description.trim()){
            newError.description="Please add Description";
            isValid = false;
        }
        if(!editData.quantity.trim()){
            newError.title="Please add Quantity";
            isValid = false;
        }
        setError(newError);
        return isValid;
    }

    const assignFormValidate=()=>{
        let isValid = true;
        const newError = {userName:'',assignDate:'',returnDate:''};
        const assignDate = new Date(assignBookData.assignDate);
        const returnDate = new Date(assignBookData.returnDate);
        if(!assignBookData.userName.trim()){
            newError.userName = "Please select a student to assign book"
            isValid = false;
        } if(!assignBookData.assignDate.trim()){
            newError.assignDate = "Please select an Assigning Date"
            isValid = false;
        } if(!assignBookData.returnDate.trim()){
            newError.returnDate = "Please select a Return Date"
            isValid = false;
        } if(assignDate>returnDate){
            newError.returnDate = "Please choose the Return Date after Assigning date"
            isValid = false;
        }
        setAssignError(newError);
        return isValid;
    }
    const today = new Date().toISOString().split('T')[0];
    return (
        <Container className='bookListContainer'>
            <ToastContainer/>
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
                            error={!!errors.title}
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
                            error={!!errors.author}
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
                            error={!!errors.description}
                        />
                        { errors.description && <p className='error-message'>{errors.description}</p>}
                    </div>
                    <div>
                        <TextField
                            className='text-field'
                            label="Quantity"
                            fullWidth
                            margin="normal"
                            type="number"
                            value={bookData.quantity}
                            onChange={(e)=>setBookData({...bookData,quantity:e.target.value})}
                            error={!!errors.quantity}
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
                            onChange={(e)=>setEditData({...editData,title:e.target.value})}
                            error={!!errors.title}
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
                            error={!!errors.author}
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
                            error={!!errors.description}
                        />
                        { errors.description && <p className='error-message'>{errors.description}</p>}
                    </div>
                    <div>
                        <TextField
                            className='text-field'
                            label="Quantity"
                            fullWidth
                            margin="normal"
                            type="number"
                            value={editData.quantity}
                            onChange={(e)=>setEditData({...editData,quantity:e.target.value})}
                            error={!!errors.quantity}
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
                        <Select error={!!assignedErrors.userName} className='select-dropdown' id="userdropdown" value={selectedUserId} label="Select User" onChange={handleUserChange}>
                            <MenuItem value="">None</MenuItem>
                            { users.map((user)=>(
                                <MenuItem key={user.id} value={user.id}>
                                    {user.fullName}
                                </MenuItem>
                            )) }
                        </Select>  
                        {assignedErrors.userName && <p className='error-message'>{assignedErrors.userName}</p>}  
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
                            inputProps={{
                                min:today
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={!!assignedErrors.assignDate}
                        />
                        {assignedErrors.assignDate && <p className='error-message'>{assignedErrors.assignDate}</p>}
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
                            inputProps={{
                                min: assignBookData.assignDate || today
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}    
                            error={!!assignedErrors.returnDate}
                        />
                        {assignedErrors.returnDate && <p className='error-message'>{assignedErrors.returnDate}</p>}
                    </div>
                    <Button className="primary-button" type="submit">Assign Book</Button>
                </form>
                </Box>
        </Modal>


        <Modal open={deleteModal} onClose={closeDeleteModal} 
            aria-labelledby="modal-modal-title" 
            aria-describedby='modal-modal-description'>
            <Box className="modal-box" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                <Typography className='modal-title'>Are you sure you want to delete <b>{deleteBookData.title}</b> ?</Typography>
                <div>
                    <Button onClick={closeDeleteModal}><Cancel/>Cancel</Button>
                    <Button className="delete-button" onClick={()=>handleDeleteBook(deleteBookData.bookId)}><Delete/>Delete</Button>
                </div>
            </Box>
        </Modal>



            <Typography className='modal-title'>Books List</Typography>
            <Button className="primary-button" onClick={openAddBookModal}>Add Book</Button>
            {books.length>0 ? (<TableContainer className='table-container' component={Paper}>
                <Table className='booklist-table'>
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
                                    <Button className='edit-button' onClick={()=>{openEditBookModal(book.id)}}><Edit/>Edit</Button>
                                    <Button className='delete-button' onClick={()=>{handleDeleteBookModal(book.id,book.title)}}><Delete/>Delete</Button>
                                    <Button className="assign-button" onClick={()=>{handleAssignBook(book.title,book.id)}}><Add/>Assign Book</Button>
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