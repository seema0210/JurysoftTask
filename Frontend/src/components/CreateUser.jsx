import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';
import { addUser } from '../ApiHandler/HandleApi';
import { validateUser } from '../validation/Validation';
import { toast } from 'react-toastify';

const CreateUser = ({ open, handleClose }) => {
  const [newUser, setNewUser] = useState({ 
      name: '', 
      email: '', 
      age: '', 
      message: '' 
    });

    const handelChange = (e) => {
      setNewUser((preData) => {
        return {...preData, [e.target.name]: e.target.value}
      })
    }

    const handleSubmit = (e) => {
    e.preventDefault()
    const errorMsg = validateUser(newUser);
    if (errorMsg) {
      toast.warning(errorMsg); // show toast warning
      return;
    }
    let obj = {
      name : newUser.name,
      email : newUser.email,
      age : newUser.age,
      message : newUser.message
    }
    addUser(obj)
    handleClose();
  };

  const handleCancel = () => {
    setNewUser({ name: '', email: '', age: '', message: '' });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <DialogTitle>Add New User</DialogTitle>
      <form onSubmit={handleSubmit}>
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
          name='email'
          type="email"
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
        <Button type='submit' variant="contained">
          Add User
        </Button>
      </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateUser;