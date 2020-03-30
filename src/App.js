import React, { Component } from 'react';
import './App.css';
import {Header, Dashboard, Footer } from './components'

class App extends Component {

  render() {
    return (
      <>
        <Header />
        <Dashboard />
        <Footer/>
      </>
    );
  }
}

export default App;



