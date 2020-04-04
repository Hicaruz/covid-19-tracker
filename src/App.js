import React, { Component } from 'react';
import './App.css';
import { Header, Dashboard, Footer } from './components'
import { ProgressBar } from 'react-bootstrap'
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
        <ProgressBar>
          <ProgressBar striped variant="success" now={35} key={1} />
          <ProgressBar variant="warning" now={20} key={2} />
          <ProgressBar striped variant="danger" now={10} key={3} />
        </ProgressBar>
      </>
    );
  }
}

export default App;



