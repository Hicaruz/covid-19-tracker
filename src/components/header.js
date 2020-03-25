import React, { Component } from 'react'
import logo from '../logo.svg'
class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <br />
                <img src={logo} className="App-logo" alt="logo" />
                <br />
                <h3>Covid-19 <em>  Tracker</em></h3>
                <h4>#StayAtHome</h4>
                <br />
            </header>
        )
    }
}
export default Header