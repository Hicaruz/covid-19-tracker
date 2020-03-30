import React, { Component } from 'react';
import './App.css';
import { Dashboard } from './components'
import Header from './components/header'
class App extends Component {

  render() {
    return (
      <>
        <Header />
        <Dashboard />
        {/* <Router history={useHistory}  >
          <nav className="navbar d-flex option ">
            <Link to="/"><button type="button" className="btn btn-info option">Resume</button></Link>
            <Link to="/Stats"><button type="button" className="btn btn-info option">Stats</button></Link>
            <Link to="/about"><button type="button" className="btn btn-info option">About</button></Link>
          </nav>
          <Route path="/" exact component={Resume} />
          <Route path="/Stats" component={Stats} />
          <Route path="/about" component={About} />

        </Router> */}
      </>
    );
  }
}

export default App;



