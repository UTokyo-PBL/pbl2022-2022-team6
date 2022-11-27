import React from 'react';
import logo from './logo.svg';
import classes from './App.module.scss';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import WelcomePage from './pages/welcome';



function App() {
  return (
    <div className={classes.App}>
      <header className={classes.AppHeader}>
        <WelcomePage />
      </header>
    </div>
  );
}

export default App;
