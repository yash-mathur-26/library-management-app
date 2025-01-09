import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';

export interface Book{
    id:string;
    title:string;
    description:string;
    author:string;
    quantity:number;
}

export interface AssignedBooks {
    id:string;
    bookId:string;
    userId:string;
    title:string;
    userName:string;
    assignDate:string;
    returnDate:string;
    status:string;
}

interface BookState{
    books:Book[],
    assignedBookList:AssignedBooks[],
    error:string|null
}

const initialState: BookState={
    books:[],
    assignedBookList:[],
    error:null
}

const bookSlice = createSlice({
    name:'book',
    initialState,
    reducers:{
        showError:(state,action:PayloadAction<string|null>)=>{
            state.error = action.payload
        },
        addBook:(state,action:PayloadAction<{title:string,description:string,quantity:number,author:string}>)=>{
            const existingBook = state.books.find((book)=>book.title==action.payload.title);
            if(!existingBook){
                const newBook = {
                    id:uuid(),
                    ...action.payload
                }
                state.books.push(newBook);
            } else {
                state.error='Book Already Exists';
                throw new Error(state.error);
            }
        },
        assignBook:(state,action:PayloadAction<{title:string,bookId:string,userId:string,assignDate:string,returnDate:string,status:string,userName:string}>)=>{
            const book = state.books.find((book)=>book.id===action.payload.bookId);
            if(book){
                const alreadyAssigned = state.assignedBookList.find((assigned)=>assigned.bookId===action.payload.bookId && assigned.userId===action.payload.userId);
                const isNotReturned = state.assignedBookList.find((assigned)=>assigned.bookId===action.payload.bookId && assigned.userId===action.payload.userId && assigned.status==="Pending");
                if((!alreadyAssigned && !isNotReturned) || (alreadyAssigned && !isNotReturned)){
                    book.quantity -=1;
                    const newAssign = {
                        id:uuid(),
                        ...action.payload
                    }
                    state.assignedBookList.push(newAssign);    
                } else if(alreadyAssigned && isNotReturned){
                    state.error="Book already assigned!"
                    throw new Error(state.error);
                } else if(book.quantity<=0){
                    state.error = 'Sorry, no more books available to be assigned'
                    throw new Error(state.error);
                }
            }
        },
        returnBook:(state,action:PayloadAction<{id:string,bookId:string,userId:string}>)=>{
            const book = state.assignedBookList.find((book)=>book.id===action.payload.id && book.bookId===action.payload.bookId && book.userId===action.payload.userId);
            if(book){
                book.status="Returned"
            }
            const updateBook = state.books.find((book)=>book.id===action.payload.bookId);
            if(updateBook){
                updateBook.quantity+=1;
            }
        },
        editBook:(state,action:PayloadAction<{id:string,title:string,description:string,author:string,quantity:number}>)=>{
            const bookIndex = state.books.findIndex((book)=>book.id===action.payload.id);
            if(bookIndex !== -1){
                state.books[bookIndex]={
                    ...state.books[bookIndex],
                    ...action.payload,
                };
                state.assignedBookList.forEach((assignBook)=>{
                    if(assignBook.bookId===action.payload.id){
                        assignBook.title = action.payload.title;
                    }
                })
            } else {
                state.error= 'Book not found';
                throw new Error(state.error);
            }
        },
        deleteBook:(state,action:PayloadAction<string>)=>{
            const bookAssigned = state.assignedBookList.some((book)=>book.bookId===action.payload && book.status==="Pending")
            if(bookAssigned){
                state.error="Book cannot be deleted, it's assigned to user";
                throw new Error(state.error);
            }
            const bookIndex = state.books.findIndex((book)=>book.id===action.payload);
            if(bookIndex !== -1){
                state.books.splice(bookIndex,1);
            } else {
                state.error='Book not found';
                throw new Error(state.error);
            }
        }
    }
})
export const { addBook,assignBook,returnBook,editBook,deleteBook,showError } = bookSlice.actions;
export default bookSlice.reducer;