import React from 'react';
import { Row, Container, Card, Form, Accordion, Col, Button } from 'react-bootstrap';
import { MdKeyboardArrowDown, MdSearch } from "react-icons/md";
import { type } from './layout';
import { Country } from './Country';
export const AccordionWorld = props => {
    return (<div className="accordion">
        <Card>
            <Container>
                <div className="center select">
                    <Form>
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Row>
                                <Col xs={10}>
                                    <Form.Control as="select" custom onChange={props.handleChange}>
                                        <option value="mortality">mortality</option>
                                        <option value="infectivity">infectivity</option>
                                        <option value="recovered">recovered</option>
                                    </Form.Control>
                                </Col>
                                <Col xs={2}>
                                    <Button variant="info">
                                        <MdSearch/>
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>
                </div>
            </Container>
            <div style={{ height: (window.screen.height * 0.35), overflow: "auto" }} className="select">

                <Accordion>
                    {props.worldData
                        .filter(location => props.checkInput(location))
                        .map(location => {
                            return {
                                ...location,
                                ...location.latest
                            };
                        })
                        .sort((a, b) => props.orderBy(a, b))
                        .map((location, key) => <Card key={key} style={{ color: "#000" }}>
                            <Card.Header>
                                <Accordion.Toggle as={Container} eventKey={key}>
                                    <div className="icon">
                                        <span>
                                            <img src={`https://www.countryflags.io/${location.country_code}/flat/32.png`} alt="" />
                                            {' '}
                                            {location.country}
                                            {' '}
                                        </span>
                                        <span>
                                            <small className="small-value">{location.latest[type[props.mode]].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</small>
                                            <MdKeyboardArrowDown />
                                        </span>
                                    </div>
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={key}>
                                <Card.Body>
                                    <Country current={location} isAccordion={true} />
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>)}
                </Accordion>
            </div>
        </Card>
    </div>);
};
