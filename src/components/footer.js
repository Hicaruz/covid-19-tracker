import React, { Component } from 'react'
import { Navbar, Button } from 'react-bootstrap'
import logo from '../logo.svg'
class Footer extends Component {

    render() {
        return (
            <footer className="footer">
                <Navbar bg="dark" variant="dark" className="justify-content-end">
                    <Navbar.Brand href="." >
                        <img
                            alt=""
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top App-logo"
                        />{' '}
                    </Navbar.Brand>
                    <Button variant="warning">#BuyMeACoffee</Button>
                    <Button variant="info">Follow Me On Twitter</Button>
                </Navbar>
            </footer>
        )
    }
}
export default Footer