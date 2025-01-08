import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { useEditBookMutation } from '../services/booksApi';

interface EditBookModalProps {
    book: { id: string; title: string; author: string };
    onClose: () => void;
}

const EditBookModal: React.FC<EditBookModalProps> = ({ book, onClose }) => {
    const [editBook] = useEditBookMutation();
    const [formData, setFormData] = useState({
        title: book.title,
        author: book.author,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        await editBook({ id: book.id, ...formData });
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
            <h2>Edit Book</h2>
            <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            <TextField
            label="Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            fullWidth
            margin="normal"
            />
            <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 2, mr: 2 }}
            >
            Save
            </Button>
            <Button variant="outlined" onClick={onClose} sx={{ mt: 2 }}>
            Cancel
            </Button>
        </Box>
        </Modal>
    );
};

export default EditBookModal;
