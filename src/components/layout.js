import React, { Component } from 'react'
import { Table, Container, Row, InputGroup, FormControl } from 'react-bootstrap'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

class Card extends Component {

  render() {
    return (
      <div className={`col-lg-${this.props.size <= 1 ? "12" : "4"} col-sm-12 col-xs-12`}>
        <div className={`card text-${this.props.text} ${this.props.bg}`}>
          <div className="card-body">
            <h4 className="card-title">{this.props.country}{this.props.province ? `, ${this.props.province} ` : null} <img src={`https://www.countryflags.io/${this.props.flag}/flat/32.png`} alt="" />
            </h4>
            <p className="card-text"><span className="badge badge-warning">Confirmed</span>  : {this.props.confirmed}</p>
            <p className="card-text"><span className="badge badge-danger">Deaths</span> : {this.props.deaths}</p>
            <p className="card-text"><span className="badge badge-success">Recovered</span> : {this.props.recovered}</p>
          </div>
          <div className="card-footer">
            <small style={{ fontSize: "20px" }}>last update: {(new Date(this.props.date)).toString().slice(0, 15)}</small>
          </div>
        </div>
      </div>
    )
  }
}

class WorldTable extends Component {
  constructor() {
    super()
    this.state = {
      sortBy: "country",
      order: false,
      query: ""
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
    const columns = ["country", "confirmed", "deaths", "recovered"]
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
        <div style={{ height: (window.screen.height / 1.4), overflow: "auto" }} className="table">
          <Table variant="light" responsive size="sm" >
            <thead>
              <tr className="thead">
                <th className="active">#</th>
                {
                  columns.map((title, key) =>
                    <th
                      key={key}
                      onClick={() => this.sortBy(title)}
                      className={title}>
                      {title}
                      {
                        this.state.order ? 
                        <MdKeyboardArrowDown className={this.state.sortBy === title ? "" : "d-display"} /> :
                        <MdKeyboardArrowUp className={this.state.sortBy === title ? "" : "d-display"} />
                      }
                    </th>
                  )
                }
              </tr>
            </thead>
            <tbody >
            {/* <tr>
              <td>dummie</td>
            </tr> */}
              {
                this.props.worldData
                  .filter(location => this.checkInput(location))
                  .map(location => {
                    return {
                      ...location,
                      ...location.latest
                    }
                  })
                  .sort((a, b) => this.orderBy(a, b))
                  .map((location, key) => {
                    return (
                      <tr key={key} className="active" onClick={() => this.props.showStats(location.country)}>
                        <td>{key + 1}</td>
                        <td>
                          <img src={`https://www.countryflags.io/${location.country_code}/flat/32.png`} alt="" />
                          {' '}
                          {location.country}
                        </td>
                        <td className="confirmed">{location.confirmed}</td>
                        <td className="deaths">{location.deaths}</td>
                        <td className="recovered">{location.recovered}</td>
                      </tr>
                    )
                  })
              }
            </tbody>
          </Table>
        </div>
      </Container>
    )
  }
}
export { Card, WorldTable };