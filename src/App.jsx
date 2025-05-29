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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<EditAccount />} />
        <Route path="/new" element={<AddAccount />} />
        {/* <Route path="/new" element={<AddAccount />} /> */}
        {/* <Route path="/delete" element={<DeleteAccount />} /> */}
        {/* <Route path="/view" element={<ViewAccount />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
