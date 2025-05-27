import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

function App() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_BASE)
      .then(response => setAccounts(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Accounts</Typography>
      <List>
        {accounts.map(account => (
          <ListItem key={account.account_id}>
            <ListItemText
              primary={account.account_name}
              secondary={account.postal_address}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
