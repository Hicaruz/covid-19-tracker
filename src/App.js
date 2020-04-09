import React, { Component } from 'react';
import './App.css';
import { Header, Dashboard, Footer } from './components'
import { BrowserRouter as Router } from "react-router-dom";

class App extends Component {

  render() {
    return (
      <>
        <Router>
          <Header />
          <Dashboard />
          <Footer />
        </Router>
    
      </>
    );
  }
}

export default App;



