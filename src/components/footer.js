import React, { Component } from 'react'
import { Navbar, Button } from 'react-bootstrap'
class Footer extends Component {

    render() {
        return (
            <footer className="footer">
                <Navbar bg="dark" variant="dark" className="justify-content-end">
                    <Navbar.Brand href="." >
                    
                    </Navbar.Brand>
                    <Button variant="warning" href="https://paypal.me/Hicarus" target="_blank">#BuyMeACoffee</Button>
                    <Button variant="info" href="https://twitter.com/_Hicarus" target="_blank">Follow me!</Button>
                </Navbar>
            </footer>
        )
    }
}
export default Footer