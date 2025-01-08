import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl:'/api',
    credentials:"include",
    prepareHeaders:(header)=>{
        const token = localStorage.getItem('authToken')
        if(token){
            header.set('Accept','application/json');
            header.set('Authorization',`Bearer ${token}`)
        }
        return header;
    },
});

export const booksApi = createApi({
    reducerPath:'booksApi',
    baseQuery,
    endpoints:(builder)=>({
        fetchAllBooks:builder.query({
            query:()=>({
                url:'/all-books',
                method:'GET',
            })
        }),
        addNewBook:builder.mutation({
            query:(newBook)=>({
                url:'/add-book',
                method:"POST",
                body:newBook
            })
        })
    }),
});

export const { useFetchAllBooksQuery, useAddNewBookMutation } = booksApi;