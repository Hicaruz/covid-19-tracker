import React, { Component } from 'react'
import logo from '../logo.svg'
import { Navbar, Button } from 'react-bootstrap'
import crg from 'country-reverse-geocoding'
import { flags } from './flags'
/* <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h3>Covid-19 <em>  Tracker</em></h3>
              <h4>#StayAtHome</h4>
          </header> */
class Header extends Component {
    constructor() {
        super()
        this.state = {
            current: ""
        }
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const { latitude, longitude } = coords;
            const { name: country } = crg.country_reverse_geocoding().get_country(latitude, longitude);
            this.setState({ current: { latitude, longitude, country } });
        });
    }
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href=".">
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top App-logo"
                    />
                </Navbar.Brand>
                <Button variant="success">#StayAtHome</Button>{' '}
                {
                    this.state.current ?
                        <img src={`https://www.countryflags.io/${flags[this.state.current.country]}/flat/${window.screen.width > window.screen.height ? "64" : "32"}.png`} alt="" /> :
                        null
                }
            </Navbar>

        )
    }
}
export default Header