import React, { Component } from 'react'
import logo from '../logo.svg'

class About extends Component {

    render() {
        return (
            <div>
                <div className="App-header">
                    <header className="App-header">
                        <br />
                        <img src={logo} className="App-logo" alt="logo" />
                        <br />
                        <h3>Covid-19 <em>  Tracker</em></h3>
                        <h4>#StayAtHome</h4>
                        <br />
                        <h1> <span role="img" aria-label="Fire">🔥 </span> Made by <em>Juan Pablo De La Cerda Castillo</em> <span role="img" aria-label="Fire"> 🔥 </span>  </h1>
                    </header>
                </div>
            </div>
        )
    }


}

export default About