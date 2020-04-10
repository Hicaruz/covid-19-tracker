import React from 'react';
import { Table, Row, Container, Card, Form, Accordion, InputGroup, FormControl } from 'react-bootstrap';
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { type } from './layout';
import { Country } from './Country';
export const DataTable = (props) => {
    return (<div style={{ height: (window.screen.height * 0.85), overflow: "auto" }} className="table">
        <Table variant="light" size="sm">
            <thead>
                <tr className="thead">
                    <th>
                        <Form>
                            <Form.Label>List of countries</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Search a country"
                                    onChange={props.onChange}
                                />
                            </InputGroup>
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label>Sort by</Form.Label>
                                <Form.Control as="select" custom onChange={props.handleChange}>
                                    <option value="mortality">mortality</option>
                                    <option value="infectivity">infectivity</option>
                                    <option value="recovered">recovered</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.worldData
                    .filter(location => props.checkInput(location))
                    .map(location => {
                        return {
                            ...location,
                            ...location.latest
                        };
                    })
                    .sort((a, b) => props.orderBy(a, b))
                    .map((location, key) => {
                        return (<tr key={key} className="active" onClick={() => props.showStats(location.country)}>
                            <td className="icon">
                                <span>
                                    <img src={`https://www.countryflags.io/${location.country_code}/flat/32.png`} alt="" />
                                    {' '}
                                    {location.country}
                                    {' '}
                                </span>
                                <span className="">
                                    <small className="small-value">
                                        {
                                            location.latest[type[props.mode]]
                                                .toString()
                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")

                                        }
                                    </small>
                                    <MdKeyboardArrowRight />
                                </span>
                            </td>

                        </tr>);
                    })}
            </tbody>
        </Table>
    </div>);
};
export const AccordionWorld = props => {
    return (<div className="accordion">
        <Card>
            <Container>
                <div className="center select">
                    <Form>
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Row>
                                <Form.Control as="select" custom onChange={props.handleChange}>
                                    <option value="mortality">mortality</option>
                                    <option value="infectivity">infectivity</option>
                                    <option value="recovered">recovered</option>
                                </Form.Control>
                            </Row>
                        </Form.Group>
                    </Form>
                </div>
            </Container>
            <div style={{ height: (window.screen.height * 0.45), overflow: "auto" }} className="select">

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
                        .map((location, key) =>
                            <Card key={key} style={{ color: "#000" }}>
                                <Card.Header>
                                    <Accordion.Toggle as={Container} eventKey={key}>
                                        <div className="icon" >
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
                                        <Country
                                            current={location}
                                            isAccordion={true}
                                        />
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>)}
                </Accordion>
            </div>
        </Card>
    </div>
    );
};
