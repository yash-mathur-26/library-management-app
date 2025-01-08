/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useGetAssignedBooksQuery } from '../services/booksApi';

const AssignedBooks: React.FC = () => {
    const { data: assignments, isLoading } = useGetAssignedBooksQuery(undefined);

    if (isLoading) return <p>Loading...</p>;

    return (
        <Table>
        <TableHead>
            <TableRow>
            <TableCell>Book Title</TableCell>
            <TableCell>Assigned To</TableCell>
            <TableCell>Assigned Date</TableCell>
            <TableCell>Return Date</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {assignments.map((assignment:any) => (
            <TableRow key={assignment.id}>
                <TableCell>{assignment.bookTitle}</TableCell>
                <TableCell>{assignment.assignedTo}</TableCell>
                <TableCell>{assignment.assignedDate}</TableCell>
                <TableCell>{assignment.returnDate}</TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    );
};

export default AssignedBooks;
