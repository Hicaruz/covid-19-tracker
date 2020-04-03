import React, { Component } from 'react'
import { Table, Container, Row, InputGroup, FormControl, Col, Card } from 'react-bootstrap'
import { MdKeyboardArrowRight } from "react-icons/md";
import { TimeLine } from './charts'

const DataTable = (props) => {
  const columns = ["country"]

  return (
    <div style={{ height: (window.screen.height / 1.4), overflow: "auto" }} className="table">
      <Table variant="light" size="sm">
        <thead>
          <tr className="thead active">
            <th>#</th>
            {
              columns.map((title, key) =>
                <th
                  key={key}
                  onClick={() => this.sortBy(title)}
                  className={title}>
                  {title}
                </th>
              )
            }
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
                    <td>{key + 1}</td>
                    <td className="icon">
                      <span>
                        <img src={`https://www.countryflags.io/${location.country_code}/flat/32.png`} alt="" />
                        {' '}
                        {location.country}
                      </span>
                      <span className="">
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
  console.log(current)
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
      date,
      infected: confirmed.timeline[date] || 0,
      deaths: deaths.timeline[date] || 0,
      recovered: recovered.timeline[date] || 0
    }))
  return (

    <Card style={{ width: '25rem' }}>
      <Card.Img
        variant="top"
        src={`https://flagpedia.net/data/flags/normal/${current.country_code}.png`.toLowerCase()}

      />
      <Card.Body>
        <Card.Title>{current.country}</Card.Title>
        <Card.Text>
          placeholder
        </Card.Text>
        <TimeLine
          data={data.filter(({ infected }) => infected > 0)}
        />
      </Card.Body>

    </Card>
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
      sortBy: "country",
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
    return this.state.order ?
      a[this.state.sortBy] - b[this.state.sortBy] :
      b[this.state.sortBy] - a[this.state.sortBy]
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