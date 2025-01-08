import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl:'http://localhost:8080/api/auth',
    credentials:'include',
    prepareHeaders:(headers)=>{
        const token = localStorage.getItem('authToken');
        if(token){
            headers.set('Accept','application/json');
            headers.set('Authorization',`Bearer ${token}`);
        }
        return headers;
    },
})

export const authApi = createApi({
    reducerPath:'authApi',
    baseQuery,
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(credentials)=>({
                url:'/login',
                method:'POST',
                body:credentials,
            }),
        }),
        logout:builder.mutation({
            query:()=>({
                url:'/logout',
                method:'POST',
            })
        }),
        register: builder.mutation({
            query: (userData) => ({
            url: '/register',
            method: 'POST',
            body: userData,
            }),
        }),
    })
})

export const { useLoginMutation,useLogoutMutation,useRegisterMutation } = authApi;