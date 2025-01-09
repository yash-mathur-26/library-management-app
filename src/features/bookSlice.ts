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
}

const initialState: BookState={
    books:[],
    assignedBookList:[]
}

const bookSlice = createSlice({
    name:'book',
    initialState,
    reducers:{
        addBook:(state,action:PayloadAction<{title:string,description:string,quantity:number,author:string}>)=>{
            const existingBook = state.books.find((book)=>book.title==action.payload.title);
            if(!existingBook){
                const newBook = {
                    id:uuid(),
                    ...action.payload
                }
                state.books.push(newBook);
            } else {
                throw new Error('Book Already Exists');
            }
        },
        assignBook:(state,action:PayloadAction<{title:string,bookId:string,userId:string,assignDate:string,returnDate:string,status:string,userName:string}>)=>{
            const book = state.books.find((book)=>book.id===action.payload.bookId);
            if(book){
                const alreadyAssigned = state.assignedBookList.find((assigned)=>assigned.bookId===action.payload.bookId && assigned.userId===action.payload.userId);
                const isReturned = state.assignedBookList.find((assigned)=>assigned.bookId===action.payload.bookId && assigned.userId===action.payload.userId && assigned.status!=="Returned");
                
                if(alreadyAssigned && isReturned){
                    throw new Error("Book already assigned!")
                }
                if(book.quantity>0){
                    book.quantity -=1;
                    const newAssign = {
                        id:uuid(),
                        ...action.payload
                    }
                    state.assignedBookList.push(newAssign);    
                }
            } else {
                throw new Error('Sorry, no more books available to be assigned');
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
            } else {
                throw new Error('Book not found');
            }
        },
        deleteBook:(state,action:PayloadAction<string>)=>{
            const bookAssigned = state.assignedBookList.some((book)=>book.bookId===action.payload && book.status==="Pending")
            if(bookAssigned){
                throw new Error("Book cannot be deleted, it's assigned to user");
            }
            const bookIndex = state.books.findIndex((book)=>book.id===action.payload);
            if(bookIndex !== -1){
                state.books.splice(bookIndex,1);
            } else {
                throw new Error('Book not found');
            }
        }
    }
})
export const { addBook,assignBook,returnBook,editBook,deleteBook } = bookSlice.actions;
export default bookSlice.reducer;