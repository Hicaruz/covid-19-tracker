import React, { Component } from 'react';
import './App.css';
import { Resume, About, Timeline as Stats } from './components'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {

  render() {
    return (
      <>
        <Router>
          <nav className="navbar d-flex option ">
            <Link to="/"><button type="button" className="btn btn-info option">Resume</button></Link>
            <Link to="/Stats"><button type="button" className="btn btn-info option">Stats</button></Link>
            <Link to="/about"><button type="button" className="btn btn-info option">About</button></Link>
          </nav>
          <Route path="/" exact component={Resume} />
          <Route path="/Stats" component={Stats} />
          <Route path="/about" component={About} />

        </Router>
      </>
    );
  }
}

export default App;



