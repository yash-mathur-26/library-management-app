/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { useGetBooksQuery, useDeleteBookMutation } from '../services/booksApi';
import EditBookModal from './EditBookModal';
import AssignBookModal from './AssignedBookModa';

const BooksList: React.FC = () => {
    const { data: books, isLoading } = useGetBooksQuery(undefined);
    const [deleteBook] = useDeleteBookMutation();
    const [selectedBook, setSelectedBook] = useState(null);

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Actions</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-explicit-any
            {books.map((book:any) => (
                <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>
                    <Button onClick={() => setSelectedBook(book)}>Edit</Button>
                    <Button onClick={() => deleteBook(book.id)}>Delete</Button>
                    <Button onClick={() => setSelectedBook(book)}>Assign</Button>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        {selectedBook && (
            <>
            <EditBookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
            <AssignBookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
            </>
        )}
        </div>
    );
};

export default BooksList;
