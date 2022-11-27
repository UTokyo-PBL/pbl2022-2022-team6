import React from 'react';
import logo from './logo.svg';
import classes from './App.module.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UploadImage } from './pages/uploadpage';

import WelcomePage from './pages/welcome';



function App() {
  return (
    <div className={classes.App}>
      <header className={classes.AppHeader}>
        <Router>
          <Routes>
            <Route path='/' element={<WelcomePage />} />
            <Route path="/upload-image" element={<UploadImage />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
