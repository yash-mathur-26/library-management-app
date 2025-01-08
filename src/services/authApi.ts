import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl:'/api',
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
        })
    })
})

export const { useLoginMutation,useLogoutMutation } = authApi;