import React from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ width: '100%' }}>
      <Toolbar>
         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

            <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MERN CRUD
            </Typography>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" endIcon={<ArrowDropDownIcon />} onClick={handleOpen}>
            Account
            </Button>
        </Box>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem component={Link} to="/new" onClick={handleClose}>New</MenuItem>
          <MenuItem component={Link} to="/edit" onClick={handleClose}>Edit</MenuItem>
          <MenuItem component={Link} to="/delete" onClick={handleClose}>Delete</MenuItem>
          <MenuItem component={Link} to="/view" onClick={handleClose}>View</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
