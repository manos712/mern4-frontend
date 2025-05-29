import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Typography, TextField, Button, MenuItem, Stack
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function EditAccount() {
  const [accounts, setAccounts] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [form, setForm] = useState({ account_id: '', account_name: '', postal_address: '' });

  useEffect(() => {
    axios.get(API_BASE)
      .then(res => setAccounts(res.data))
      .catch(() => toast.error('Failed to fetch accounts'));
  }, []);

  useEffect(() => {
    if (selectedId) {
      const acc = accounts.find(a => a.account_id === selectedId);
      if (acc) setForm(acc);
    }
  }, [selectedId, accounts]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_BASE}/${form.account_id}`, form);
      toast.success('Account updated');
    } catch (err) {
      toast.error('Failed to update account');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Edit Account</Typography>

      <TextField
        select
        label="Select Account"
        fullWidth
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        sx={{ mb: 3 }}
      >
        {accounts.map(acc => (
          <MenuItem key={acc.account_id} value={acc.account_id}>
            {`${acc.account_id} : ${acc.account_name}`}
          </MenuItem>
        ))}
      </TextField>

      {selectedId && (
        <Stack spacing={2}>
          <TextField
            label="Account Name"
            name="account_name"
            value={form.account_name}
            onChange={handleChange}
          />
          <TextField
            label="Postal Address"
            name="postal_address"
            value={form.postal_address}
            onChange={handleChange}
          />
          <Button variant="contained" onClick={handleUpdate}>Update Account</Button>
        </Stack>
      )}
      <ToastContainer />
    </Box>
  );
}
