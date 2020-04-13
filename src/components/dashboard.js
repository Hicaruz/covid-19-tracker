import React, { Component } from 'react'
import crg from 'country-reverse-geocoding'
import getData from './data'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap'
import { WorldTable } from './layout'
import logo from '../logo.svg'
import Map from './map'

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            summary: {},
            world: [],
            current: {},
            option: {},
            show: false,
            mode: "mortality",
            placeSelected: false
        }
        this.showStats = this.showStats.bind(this)
    }
    async componentDidMount() {

        const { summary, world } = await getData()
        // if(Object.values(this.state.current).length){
        //     const current = [...world].filter(location => location.country === current.country)

        // }
        this.setState({ summary: Object.entries(summary), world })
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const { latitude, longitude } = coords;

            const { name: country } = crg.country_reverse_geocoding().get_country(latitude, longitude);
            const current = [...this.state.world].filter(l => l.country === country).shift()
            this.setState({
                current: {
                    ...current,
                    latitude,
                    longitude,
                    country
                }
            });
        });
    }
    showStats(location) {
        const current = [...this.state.world].filter(l => l.country === location).shift()
        const { country, coordinates, latest } = current
        this.setState({
            option: {
                ...current,
                summary: Object.entries(latest),
                country,
                latitude: coordinates.latitude,
                longitude: coordinates.longitude
            },
            show: false,
            placeSelected: !(this.state.option.country === country && this.state.placeSelected)
        })
    }
    handleChange({ target }) {
        this.setState({ mode: target.value })
    }
    handleClose = () => this.setState({ show: false });
    handleShow = () => {
        console.log("bruh")
        this.setState({ show: true });

    }

    render() {
        return (
            <Container fluid style={{ margin: "20px 0 20px" }}>
                {
                    this.state.world.length ?
                        <Row>
                            {
                                window.screen.width > window.screen.height ?
                                    <>
                                        <Col sm={12} lg={6}>
                                            <WorldTable
                                                handleChange={this.handleChange.bind(this)}
                                                mode={this.state.mode}
                                                worldData={this.state.world}
                                                summary={this.state.summary}
                                                showStats={this.showStats}
                                                placeSelected={this.state.placeSelected}
                                                handleShow={this.handleShow}
                                                current={
                                                    Object.values(this.state.option).length ?
                                                        this.state.option :
                                                        this.state.current
                                                }
                                            />

                                        </Col>
                                        <Col sm={12} lg={6}>
                                            <Modal show={this.state.show} onHide={this.handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Modal heading</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>Woohoo, im still working on whit D:!</Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={this.handleClose}>
                                                        Close
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                            <h1>World map <small> Colored by {this.state.mode}</small></h1>
                                            <Map
                                                worldData={this.state.world}
                                                showStats={this.showStats}
                                                mode={this.state.mode}
                                                placeSelected={this.state.placeSelected}
                                                current={
                                                    Object.values(this.state.option).length ?
                                                        this.state.option :
                                                        this.state.current
                                                }
                                                summary={
                                                    this.state.option.country && this.state.placeSelected ?
                                                        this.state.option.summary :
                                                        this.state.summary
                                                }
                                            />
                                        </Col>
                                    </> :
                                    <>
                                        <Col sm={12} lg={6}>
                                            <h4>
                                                World map
                                            <small>Colored by {this.state.mode}</small>
                                            </h4>
                                            <div
                                                className="accordion"
                                            >
                                                <Map
                                                    worldData={this.state.world}
                                                    showStats={this.showStats}
                                                    mode={this.state.mode}
                                                    placeSelected={this.state.placeSelected}
                                                    current={
                                                        Object.values(this.state.option).length ?
                                                            this.state.option :
                                                            this.state.current
                                                    }
                                                    summary={
                                                        this.state.option.country && this.state.placeSelected ?
                                                            this.state.option.summary :
                                                            this.state.summary
                                                    }
                                                />
                                            </div>

                                        </Col>
                                        <Col sm={12} lg={6}>
                                            <WorldTable
                                                handleShow={this.handleShow.bind(this)}
                                                handleChange={this.handleChange.bind(this)}
                                                mode={this.state.mode}
                                                worldData={this.state.world}
                                                summary={this.state.summary}
                                                showStats={this.showStats}
                                                placeSelected={this.state.placeSelected}
                                                current={
                                                    Object.values(this.state.option).length ?
                                                        this.state.option :
                                                        this.state.current
                                                }
                                            />

                                        </Col>
                                    </>
                            }
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