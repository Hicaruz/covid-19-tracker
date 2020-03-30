import React, { Component } from 'react'
import crg from 'country-reverse-geocoding'
import getData from './data'
import { Container, Row, Col } from 'react-bootstrap'
import { WorldTable } from './layout'
import logo from '../logo.svg'
import Map from './map'

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            summary: {},
            world: [],
            current: {}
        }
    }

    async componentDidMount() {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const { latitude, longitude } = coords;
            const { name: country } = crg.country_reverse_geocoding().get_country(latitude, longitude);
            this.setState({ current: { latitude, longitude, country } });
        });
        const { summary, world } = await getData()

        // if(Object.values(this.state.current).length){
        //     const current = [...world].filter(location => location.country === current.country)

        // }
        this.setState({ summary, world })
    }
    showStats(location){
        console.log(location)
    }
    render() {
        return (
            <Container fluid style={{margin: "20px 0 20px"}}>
                {
                    this.state.world.length ?
                        <Row>
                            <Col sm={12} lg={5} >
                                <WorldTable worldData={this.state.world} showStats={this.showStats}/>
                            </Col>
                            <Col sm={12} lg={7}>
                                <Map worldData={this.state.world} current={this.state.current}/>
                            </Col>
                        </Row> :
                        <div>
                            <img
                                alt=""
                                src={logo}
                                className="loading App-logo"
                            />
                        </div>
                }
            </Container>
        )
    }
}
export default Dashboard