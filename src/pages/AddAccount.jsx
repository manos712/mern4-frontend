import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function AddAccount() {
  const [form, setForm] = useState({
    account_id: '',
    account_name: '',
    postal_address: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(API_BASE, form);
      toast.success('Account added!');
      setForm({ account_id: '', account_name: '', postal_address: '' });
    } catch (err) {
      toast.error('Failed to add account');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Add New Account</Typography>
      <TextField label="Account ID" name="account_id" value={form.account_id} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="Account Name" name="account_name" value={form.account_name} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="Postal Address" name="postal_address" value={form.postal_address} onChange={handleChange} fullWidth margin="normal" />
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>Add Account</Button>
      <ToastContainer />
    </Box>
  );
}
