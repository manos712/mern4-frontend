import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_API_BASE);
        setAccounts(res.data);
      } catch (err) {
        toast.error('Failed to fetch accounts');
        console.error(err);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Accounts List
      </Typography>
      <List>
        {accounts.map((account) => (
          <ListItem key={account.account_id}>
            <ListItemText
              primary={`${account.account_name} (ID: ${account.account_id})`}
              secondary={account.postal_address}
            />
          </ListItem>
        ))}
      </List>
      <ToastContainer />
    </Container>
  );
}

export default App;
