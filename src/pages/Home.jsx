import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, List, ListItem, ListItemText,
  Button, TextField, Box, Stack
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE = import.meta.env.VITE_API_BASE;

function Home() {
  const [accounts, setAccounts] = useState([]);
  const [form, setForm] = useState({ account_id: '', account_name: '', postal_address: '' });
  const [editing, setEditing] = useState(false);

  const fetchAccounts = async () => {
    try {
      const res = await axios.get(API_BASE);
      setAccounts(res.data);
    } catch (err) {
      toast.error('Failed to fetch accounts');
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      await axios.post(API_BASE, form);
      toast.success('Account added');
      setForm({ account_id: '', account_name: '', postal_address: '' });
      fetchAccounts();
    } catch (err) {
      toast.error('Failed to add account');
    }
  };

  const handleEdit = (account) => {
    setForm(account);
    setEditing(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_BASE}/${form.account_id}`, form);
      toast.success('Account updated');
      setForm({ account_id: '', account_name: '', postal_address: '' });
      setEditing(false);
      fetchAccounts();
    } catch (err) {
      toast.error('Failed to update account');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this account?')) return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      toast.success('Account deleted');
      fetchAccounts();
    } catch (err) {
      toast.error('Failed to delete account');
    }
  };

 return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
        paddingTop: '80px', // to offset fixed navbar
        backgroundColor: '#f9f9f9',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Accounts CRUD
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Stack spacing={2}>
            <TextField
              label="Account ID"
              name="account_id"
              value={form.account_id}
              onChange={handleChange}
              disabled={editing}
              fullWidth
            />
            <TextField
              label="Account Name"
              name="account_name"
              value={form.account_name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Postal Address"
              name="postal_address"
              value={form.postal_address}
              onChange={handleChange}
              fullWidth
            />
            <Button
              variant="contained"
              color={editing ? 'secondary' : 'primary'}
              onClick={editing ? handleUpdate : handleAdd}
            >
              {editing ? 'Update Account' : 'Add Account'}
            </Button>
          </Stack>
        </Box>

        <List>
          {accounts.map((acc) => (
            <ListItem key={acc.account_id} divider disablePadding>
              <ListItemText
                primary={`${acc.account_name} (ID: ${acc.account_id})`}
                secondary={acc.postal_address}
                sx={{ pr: 2 }}
              />
              <Button
                variant="outlined"
                color="info"
                onClick={() => handleEdit(acc)}
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(acc.account_id)}
              >
                Delete
              </Button>
            </ListItem>
          ))}
        </List>

        <ToastContainer />
      </Container>
    </Box>
  );

}

export default Home;
