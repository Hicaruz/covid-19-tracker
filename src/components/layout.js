import React, { Component } from 'react'
import { Container, Row, InputGroup, FormControl, Col } from 'react-bootstrap'
import { Country } from './Country';
import { DataTable, World, AccordionWorld } from './DataTable';
export const type = {
  mortality: "deaths",
  recovered: "recovered",
  infectivity: "confirmed"
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
        {
          window.screen.width > window.screen.height ?
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
            :
            <Row>
              <AccordionWorld
                worldData={this.props.worldData}
                checkInput={this.checkInput.bind(this)}
                orderBy={this.orderBy.bind(this)}
                mode={this.props.mode}

              />
            </Row>
        }

      </Container>
    )
  }
}
export { Card, WorldTable };