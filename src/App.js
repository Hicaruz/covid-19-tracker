import React, { Component } from 'react';
import './App.css';
import { Resume, About } from './components'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {

  render() {
    return (
      <>
        <Router>
          <nav className="navbar d-flex option ">
              <Link to="/"><button type="button" className="btn btn-info option">Resume</button></Link>
              <Link to="/map"><button type="button" className="btn btn-info option">Map</button></Link>
              <Link to="/timeline"><button type="button" className="btn btn-info option text-center">Timeline</button></Link>
              <Link to="/about"><button type="button" className="btn btn-info option">About</button></Link>
          </nav>
          <Route path="/" exact component={Resume} />
          <Route path="/contact" component={Resume} />
          <Route path="/timeline" component={About} />
          <Route path="/about" component={About} />

        </Router>
      </>
    );
  }
}

export default App;



