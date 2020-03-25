import React, { Component } from 'react'
import logo from '../logo.svg'
class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h3>Covid-19 <em>  Tracker</em></h3>
                <h4>#StayAtHome</h4>
            </header>
        )
    }
}
export default Header