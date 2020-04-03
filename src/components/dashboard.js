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
            current: {},
            option: {},
            mode: "mortality",
            placeSelected: false
        }
        this.showStats = this.showStats.bind(this)

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
        console.log(world)
        this.setState({ summary: Object.entries(summary), world })
    }
    showStats(location) {
        const { country, coordinates, latest } = [...this.state.world].filter(l => l.country === location).shift()
        this.setState({
            option: {
                summary: Object.entries(latest),
                country,
                latitude: coordinates.latitude,
                longitude: coordinates.longitude
            },
            placeSelected: !(this.state.option.country === country && this.state.placeSelected)
        })
    }
    render() {

        return (
            <Container fluid style={{ margin: "20px 0 20px" }}>
                {
                    this.state.world.length ?
                        <Row>
                            <Col sm={12} lg={5} >
                                <WorldTable
                                    worldData={this.state.world}
                                    showStats={this.showStats}
                                    placeSelected={this.state.placeSelected}
                                />
                            </Col>
                            <Col sm={12} lg={7}>
                                {/* <h1>{`${this.state.option.country || "World"}'s stats`} </h1> */}
                                <Map
                                    worldData={this.state.world}
                                    showStats={this.showStats}
                                    mode={this.state.mode}
                                    current={
                                        Object.values(this.state.option).length ?
                                            this.state.option :
                                            this.state.current
                                    }
                                    summary={
                                        this.state.option.country ?
                                            this.state.option.summary :
                                            this.state.summary
                                    }
                                />
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