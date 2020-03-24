import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import crg from 'country-reverse-geocoding'
import { Card } from './layout'

class Resume extends Component {
  constructor() {
    super();
    this.state = {
      current: {},
      locations: [],
      confirmed: 0,
      deaths: 0,
      recovered: 0,
      query: "",
      sort: "deaths"
    }
  }
  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      const { name: country } = crg.country_reverse_geocoding().get_country(latitude, longitude);
      this.setState({
        current: {
          latitude,
          longitude,
          country
        }
      });
    });
    const res = await fetch("https://coronavirus-tracker-api.herokuapp.com/v2/locations", { mode: 'cors' })
    const data = await res.json()
    const countries = data.locations
    let initialStare = {
      confirmed: 0,
      deaths: 0,
      recovered: 0
    }
    for (const country of countries) {
      if (this.state.current.country) {
        const current = this.state.locations.filter(location => location.country === this.state.current.country)
        this.setState({ current: { ...current.shift(), ...this.state.current } })
      }
      initialStare.confirmed += country.latest.confirmed
      initialStare.deaths += country.latest.deaths
      initialStare.recovered += country.latest.recovered
    }
    this.setState({
      locations: countries.sort((a, b) => b.latest[this.state.sort] - a.latest[this.state.sort]),
      confirmed: initialStare.confirmed,
      deaths: initialStare.deaths,
      recovered: initialStare.recovered
    })
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
    const filtered = this.state.locations.filter(location => this.checkInput(location))
    const current = this.state.locations.filter(location => location.country === this.state.current.country).shift()
    const data = [current, ...filtered]
    return (
      <>
        <div className="App-header">
          <header className="App-header">

            <br />
            <img src={logo} className="App-logo" alt="logo" />
            <br />
            <h3>Covid-19 <em>  Tracker</em></h3>
            <h4>#StayAtHome</h4>
            <br />
          </header>
          <body className="text-center">
            <div className="container-xl">
              <input
                type="text" placeholder="Search a country..."
                onChange={this.queryOnChange.bind(this)}>
              </input>
              <br />

              <div className="container" >
                <div className="row list">
                  {
                    this.state.locations.length ?
                      data.map((location, key) => location ?
                        <Card
                          size={filtered.length}
                          key={key}
                          bg={location.country !== (current ? current.country : "") ? "bg-dark" : "bg-light"}
                          text={location.country !== (current ? current.country : "") ? "white" : "black"}
                          country={location.country}
                          confirmed={location.latest.confirmed}
                          deaths={location.latest.deaths}
                          recovered={location.latest.recovered}
                          date={location.last_updated}
                        /> : null)
                      :
                      <div className="d-flex justify-content-center App-header" style={{ marginLeft: "40%" }}>
                        <div className="spinner-border" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                  }
                </div>
              </div>
            </div>
          </body>
        </div>
      </>
    );
  }
}

export default Resume;
