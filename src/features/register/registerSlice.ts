import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface User {
    fullName:string;
    email:string;
    role:string;
    password:string;
    dob:string;
}
interface RegisterState{
    user : User | null
    isRegistered: boolean;
}

const initialState:RegisterState={
    user:null,
    isRegistered:false,
}

const registerSlice=createSlice({
    name:'register',
    initialState,
    reducers:{
        registerUser:(state, action: PayloadAction<User>)=>{
            state.user = action.payload;
            state.isRegistered = true;
        },
    }
})

export const { registerUser } = registerSlice.actions;
export default registerSlice.reducer;