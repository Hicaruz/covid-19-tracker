import React, { Component } from 'react'
import { Table, Container, Row, InputGroup, FormControl, Col, Card, Form } from 'react-bootstrap'
import { MdKeyboardArrowRight } from "react-icons/md";
import { TimeLine } from './charts'

const DataTable = (props) => {
  const type = {
    mortality: "deaths",
    recovered: "recovered",
    infectivity: "confirmed"
  }
  return (
    <div style={{ height: (window.screen.height / 1.45), overflow: "auto" }} className="table">
      <Table variant="light" size="sm">
        <thead>
          <tr className="thead">
            <th>
              <Form>
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Label>Sort by</Form.Label>
                  <Form.Control as="select" custom
                    onChange={props.handleChange}
                  >
                    <option value="mortality">mortality</option>
                    <option value="infectivity">infectivity</option>
                    <option value="recovered">recovered</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </th>
          </tr>
        </thead>
        <tbody >
          {
            props.worldData
              .filter(location => props.checkInput(location))
              .map(location => {
                return {
                  ...location,
                  ...location.latest
                }
              })
              .sort((a, b) => props.orderBy(a, b))
              .map((location, key) => {
                return (
                  <tr
                    key={key}
                    className="active"
                    onClick={() => props.showStats(location.country)}>
                    <td className="icon">
                      <span>
                        <img src={`https://www.countryflags.io/${location.country_code}/flat/32.png`} alt="" />
                        {' '}
                        {location.country}
                        {' '}
                      </span>
                      <span className="">
                        <small className="small-value">{location.latest[type[props.mode]]}</small>
                        <MdKeyboardArrowRight />
                      </span>
                    </td>

                  </tr>
                )
              })
          }
        </tbody>
      </Table>
    </div>
  )
}
const Country = ({ current }) => {
  const { confirmed, deaths, recovered } = current.timelines
  const data = []
  const dates = [...new Set(
    Object.keys(confirmed.timeline),
    Object.keys(deaths.timeline),
    Object.keys(recovered.timeline)
  )]
  dates
    .reverse()
    .forEach(date => data.push({
      date: date.slice(0, 10).split("-").reverse().join("/"),
      infected: confirmed.timeline[date] || 0,
      deaths: deaths.timeline[date] || 0,
      recovered: recovered.timeline[date] || 0
    }))
  return (
    <div style={{ height: (window.screen.height / 1.45), overflow: "auto" }}>
      <Card style={{ width: window.screen.width * 0.25 }}>
        <Card.Img
          variant="top"
          className="card-image"
          src={`https://flagpedia.net/data/flags/normal/${current.country_code}.png`.toLowerCase()}

        />
        <Card.Body>
          <Card.Title><h1>{current.country}</h1></Card.Title>
          <Card.Text>
            {"{{country-description}}"}
          </Card.Text>
          <TimeLine
            data={data.filter(({ infected }) => infected > 0)}
          />
        </Card.Body>
      </Card>

    </div>
  )
}
const World = () => {
  return (
    null
  )
}
class WorldTable extends Component {
  constructor() {
    super()
    this.state = {
      sortBy: "deaths",
      order: false,
      query: "",
    }
  }
  sortBy(sortBy) {
    if (sortBy === this.state.sortBy) {
      this.setState({ sortBy, order: !this.state.order })
    }
    this.setState({ sortBy })
  }
  orderBy(a, b) {
    const type = {
      mortality: "deaths",
      recovered: "recovered",
      infectivity: "confirmed"
    }
    return this.state.order ?
      a[type[this.props.mode]] - b[type[this.props.mode]] :
      b[type[this.props.mode]] - a[type[this.props.mode]]
  }
  queryOnChange({ target }) {
    this.setState({ query: target.value })
  }
  checkInput(location) {
    return this.state.query ?
      location.country.toUpperCase().indexOf(this.state.query.toUpperCase()) > -1 :
      Boolean
  }

  render() {
    return (
      <Container >
        <Row className="list">
          <h1>List of countries</h1>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search a country"
              onChange={this.queryOnChange.bind(this)}
            />
          </InputGroup>
        </Row>
        <Row className="worldTable">
          <Col lg={5}>
            <DataTable
              handleChange={this.props.handleChange}
              mode={this.props.mode}
              order={this.state.order}
              sortBy={this.sortBy.bind(this)}
              showStats={this.props.showStats}
              worldData={this.props.worldData}
              checkInput={this.checkInput.bind(this)}
              orderBy={this.orderBy.bind(this)}
            />
          </Col>

          <Col lg={7} className="text-black">
            {
              this.props.current.country ?
                <Country
                  current={this.props.current}
                /> :
                <World />
            }

          </Col>


        </Row>
      </Container>
    )
  }
}
export { Card, WorldTable };