import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    name: string;
    email: string;
    role: string;
    token: string;
}

interface AuthState {
    user: User | null;
}

const initialState: AuthState = {
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User | null>) {
        state.user = action.payload;
        console.log("sTates",state);
    },
        logout(state) {
        state.user = null;
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
