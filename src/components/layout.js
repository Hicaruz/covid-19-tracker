import React, { Component } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Country } from './Country';
import { DataTable } from './DataTable';
import { AccordionWorld } from "./AccordionWorld";
import { World } from "./World";
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
                  onChange={this.queryOnChange.bind(this)}

                />
              </Col>
              <Col lg={7} className="text-black">
                {
                  this.props.placeSelected ?
                    <Country
                      current={this.props.current}
                    /> :
                    <World
                      world={this.props.worldData}
                      summary={this.props.summary}
                    />
                }

              </Col>
            </Row>
            :
            <Row>
              <AccordionWorld
                order={this.state.order}
                handleChange={this.props.handleChange}
                worldData={this.props.worldData}
                checkInput={this.checkInput.bind(this)}
                orderBy={this.orderBy.bind(this)}
                mode={this.props.mode}
                sortBy={this.sortBy.bind(this)}
                onChange={this.queryOnChange.bind(this)}
                placeSelected={this.props.placeSelected}
              />
            </Row>
        }

      </Container>
    )
  }
}
export { Card, WorldTable };