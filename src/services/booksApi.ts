import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../app/store';

export const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api', 
        prepareHeaders: (headers, { getState }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const token = (getState() as RootState).auth.user?.token;
        console.log("token is here",token);
        if (token) headers.set('Authorization', `Bearer ${token}`);
        return headers;
        }
    }),
    tagTypes: ['Books', 'Assignments'],
    endpoints: (builder) => ({
        getBooks: builder.query({
        query: () => '/books',
        providesTags: ['Books'],
        }),
        getAssignedBooks: builder.query({
        query: () => 'books/my-books/',
        providesTags: ['Assignments'],
        }),
        addBook: builder.mutation({
        query: (book) => ({
            url: '/books',
            method: 'POST',
            body: book,
        }),
        invalidatesTags: ['Books'],
        }),
        deleteBook: builder.mutation({
        query: (id) => ({
            url: `/books/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Books'],
        }),
        editBook: builder.mutation({
        query: ({ id, ...book }) => ({
            url: `/books/${id}`,
            method: 'PUT',
            body: book,
        }),
        invalidatesTags: ['Books'],
        }),
        assignBook: builder.mutation({
        query: (assignment) => ({
            url: '/books/assign',
            method: 'POST',
            body: assignment,
        }),
        invalidatesTags: ['Assignments'],
        }),
    }),
});

export const {
    useGetBooksQuery,
    useGetAssignedBooksQuery,
    useAddBookMutation,
    useDeleteBookMutation,
    useEditBookMutation,
    useAssignBookMutation,
} = booksApi;
