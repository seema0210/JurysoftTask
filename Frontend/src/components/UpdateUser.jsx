import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from '@mui/material';
import { Link } from 'react-router-dom';
import { updateUser } from '../ApiHandler/HandleApi';
import { validateUser } from '../validation/Validation';
import { toast } from 'react-toastify';

const UpdateUser = ({ open, handleClose, updateData }) => {
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        age: '',
        message: ''
    });

    useEffect(() => {
        if (updateData) {
            setNewUser({
                name: updateData.name || '',
                email: updateData.email || '',
                age: updateData.age || '',
                message: updateData.message || ''
            })
        }
    }, [updateData])

    const handelChange = (e) => {
        setNewUser((preData) => ({
            ...preData,
            [e.target.name]: e.target.value
        })
        )
    }

    const handleSubmit = () => {

        const errorMsg = validateUser(newUser);
            if (errorMsg) {
              toast.warning(errorMsg); // show toast warning
              return;
            }
        if (!updateData || !updateData._id) {
            console.error("No updateData provided");
            return;
        }
        updateUser(updateData._id, newUser).then((data) => {
            if (data) {
                setNewUser({
                    name: data.name || '',
                    email: data.email || '',
                    age: data.age || '',
                    message: data.message || ''
                });
            }
        })
            .catch((err) => console.error("Update failed:", err));
        handleClose()
    };

    const handleCancel = () => {
        setNewUser({ name: '', email: '', age: '' });
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
            <DialogTitle>Update User</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    name='name'
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={newUser.name}
                    onChange={handelChange}
                    sx={{ mt: 2 }}
                />
                <TextField
                    margin="dense"
                    label="Email"
                    type="email"
                    name='email'
                    fullWidth
                    variant="outlined"
                    value={newUser.email}
                    onChange={handelChange}
                />
                <TextField
                    margin="dense"
                    label="Age"
                    name='age'
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={newUser.age}
                    onChange={handelChange}
                />
                <TextField
                    margin="dense"
                    label="Message"
                    name='message'
                    type="text"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={3}
                    value={newUser.message}
                    onChange={handelChange}
                    placeholder="Enter a custom message for the user"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">
                    Update User
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateUser;