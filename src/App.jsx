import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EditAccount from './pages/EditAccount';
import AddAccount from './pages/AddAccount';

// Future: import AddAccount, DeleteAccount, ViewAccount from './pages/...'
function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: '80px', display: 'flex', justifyContent: 'center' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit" element={<EditAccount />} />
          <Route path="/new" element={<AddAccount />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
