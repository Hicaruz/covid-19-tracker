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
            mode: "mortality"
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
        console.log(world)
        // if(Object.values(this.state.current).length){
        //     const current = [...world].filter(location => location.country === current.country)

        // }
        this.setState({ summary, world })
    }
    showStats(location) {
        const { country, coordinates } = [...this.state.world].filter(l => l.country === location).shift()
        this.setState({
            option: {
                country,
                latitude: coordinates.latitude,
                longitude: coordinates.longitude
            }
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
                                    showStats={this.showStats} />
                            </Col>
                            <Col sm={12} lg={7}>
                                <h1>{`${this.state.option.country}'s stats `|| "World map"} </h1>
                                <Map
                                    worldData={this.state.world}
                                    showStats={this.showStats}
                                    mode={this.state.mode}
                                    current={Object.values(this.state.option).length ?
                                        this.state.option :
                                        this.state.current}
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