import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon
} from '@mui/icons-material';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import { getUsers, handleDelete } from '../ApiHandler/HandleApi';

const Users = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateData, setUpdateData] = useState({ 
        name: '', 
        email: '', 
        age: '', 
        message: '' 
      })
  const [users, setUsers] = useState([]);

  useEffect(()=> {
    getUsers().then((data) => setUsers(data))
  },[updateData, users])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateOpen = (userData) => {
    setUpdateOpen(true)
    setUpdateData(userData)
  }
  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'linear-gradient(135deg, #fafbfd 0%, #f1f3f6 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: isMobile ? 1 : 3
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: isMobile ? '100%' : '70%',
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            p: 2,
            bgcolor: 'primary.dark',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography variant="h6">User Management</Typography>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
            size={isMobile ? "small" : "medium"}
          >
            Add User
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.100' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Age</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Message</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell>{user.message}</TableCell>
                  <TableCell>
                    <IconButton color="primary" size="small"
                    onClick={() => handleUpdateOpen(user)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      color="error" 
                      size="small"
                      onClick={() => handleDelete(user._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <CreateUser 
        open={open} 
        handleClose={handleClose} 
      />

      <UpdateUser
      open={updateOpen}
      handleClose={handleUpdateClose} 
      updateData={updateData}
      setUpdateData={setUpdateData}
      />
    </Box>
  );
}

export default Users;