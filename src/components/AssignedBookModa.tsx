import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { useAssignBookMutation } from '../services/booksApi';

interface AssignBookModalProps {
    book: { id: string; title: string };
    onClose: () => void;
}

const AssignBookModal: React.FC<AssignBookModalProps> = ({ book, onClose }) => {
    const [assignBook] = useAssignBookMutation();
    const [formData, setFormData] = useState({
        studentEmail: '',
        assignedDate: '',
        returnDate: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
    await assignBook({
        bookId: book.id,
        ...formData,
    });
    onClose();
    };

    return (
        <Modal open={!!book} onClose={onClose}>
        <Box
            sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            p: 4,
            boxShadow: 24,
            borderRadius: 1,
            }}
        >
            <h2>Assign Book</h2>
            <TextField
            label="Student Email"
            name="studentEmail"
            value={formData.studentEmail}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            <TextField
            label="Assigned Date"
            name="assignedDate"
            value={formData.assignedDate}
            onChange={handleChange}
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            />
            <TextField
            label="Return Date"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleChange}
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            />
            <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 2, mr: 2 }}
            >
            Assign
            </Button>
            <Button variant="outlined" onClick={onClose} sx={{ mt: 2 }}>
            Cancel
            </Button>
        </Box>
        </Modal>
    );
};

export default AssignBookModal;
