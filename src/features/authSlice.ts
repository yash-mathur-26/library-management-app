import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';
export interface AssignedBooks {
    bookId:string;
    title:string;
    assignDate:string;
    returnDate:string;
    status:string;
    userId:string;
    id:string;
}
export interface User{
    id:string;
    fullName:string;
    email:string;
    password:string;
    dob:string;
    role:string;
    assignedBooks:AssignedBooks[];
}

interface AuthState {
    users: User[];
    currentUser: User | null;
}

const initialState:AuthState = {
    users:[],
    currentUser:null,
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        registerUser:(state,action:PayloadAction<{fullName:string,email:string,dob:string,password:string,role:string}>)=>{
            const existingUser = state.users.find((user)=> user.email==action.payload.email);
            if(!existingUser){
                const newUser = {
                    id:uuid(),
                    ...action.payload,
                    assignedBooks:[]
                }
                state.users.push(newUser);
            } else {
                throw new Error('Email already Exists!');
            }
        },
        loginUser:(state,action:PayloadAction<{email:string,password:string}>)=>{
            const { email,password } = action.payload;
            const user = state.users.find((user)=> user.email === email && user.password === password);
            console.log(state.users,"Email",action.payload);
            if(user){
                state.currentUser = user;
                console.log("Current user",JSON.stringify(state.currentUser,null,2))
                console.log("User",JSON.stringify(user,null,2))
            } else {
                throw new Error('Invalid credentails!');
            }
        },
        logoutUser:(state)=>{
            state.currentUser = null;
        },
        bookAssigned:(state,action:PayloadAction<{bookId:string,userId:string,title:string,assignDate:string,returnDate:string,status:string}>)=>{
            const user = state.users.find((user)=>user.id===action.payload.userId);
            if(user){
                const isAssigned = user.assignedBooks.some((book)=>book.bookId===action.payload.bookId)
                const isReturned = user.assignedBooks.find((book)=>book.bookId===action.payload.bookId && book.status!=='Returned')
                console.log("Returned",isAssigned,isReturned);
                if(!isAssigned){
                    const newAssigned = {
                        id:uuid(),
                        ...action.payload
                    }
                    user.assignedBooks.push(newAssigned);
                } else if(isReturned){
                    const newAssigned = {
                        id:uuid(),
                        ...action.payload
                    }
                    user.assignedBooks.push(newAssigned);
                } 
                else {
                    throw new Error('Book is already assigned to the user');
                }
            }
        },
        bookReturned:(state,action:PayloadAction<{bookId:string,userId:string,id:string}>)=>{
            const user = state.users.find((user)=>user.id===action.payload.userId);
            const userBook=user?.assignedBooks.find((book)=>book.bookId===action.payload.bookId && book.userId===action.payload.userId);
            if(userBook){
                userBook.status='Returned';
            }
            console.log("returned or not",user);
        }
    },
})

export const { registerUser,loginUser,logoutUser,bookAssigned,bookReturned } = authSlice.actions;
export default authSlice.reducer;