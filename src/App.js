import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import crg from 'country-reverse-geocoding'
import Card from './Card'

const Main = ({country, confirmed, deaths, recovered, date}) => {
  return (
    <div className="card mb-3 main">
      <div className="row no-gutters">
        <div className="col-12">
          <div className="card-body">
            <h5 className="card-title">{country}</h5>
            <p className="card-text"><span className="badge badge-warning">Cconfirmed</span>  : {confirmed || 0}</p>
            <p className="card-text"><span className="badge badge-danger">Deaths</span> : {deaths || 0}</p>
            <p className="card-text"><span className="badge badge-success">Recovered</span> : {recovered || 0}</p>
          </div>
          <div className="card-footer">
            <small>last update: {(new Date(date)).toString().slice(0, 15)}</small>
          </div>
        </div>
      </div>
    </div>
  )
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      location: {},
      current: {},
      locations: [],
      confirmed: 0,
      deaths: 0,
      recovered: 0,
      query: "",
      sort: "deaths"
    }
  }

  async componentWillMount() {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      const { name: country } = crg.country_reverse_geocoding().get_country(latitude, longitude);
      this.setState({
        location: {
          latitude,
          longitude,
          country
        }
      });
    });
    const res = await fetch("https://covid-19api.com/api/countries-latest", { mode: 'cors' })
    const countries = await res.json()
    for (const country of countries) {
      this.setState({
        locations: [...this.state.locations, country].sort((a, b) => b[this.state.sort] - a[this.state.sort]),
        confirmed: this.state.confirmed + country.confirmed,
        deaths: this.state.deaths + country.deaths,
        recovered: this.state.recovered + country.recovered,
      })
    }
    const current = (this.state.locations.filter(location => location.country === this.state.location.country)).shift()
    this.setState({ current })
  }

  queryOnChange({ target }) {
    this.setState({ query: target.value })
  }


  render() {
    return (
      <>
        <header className="App-header">
          <br />
          <img src={logo} className="App-logo" alt="logo" />
          <p>Covid-19 <em>  Tracker</em></p>
          <br />
        </header>
        <body className="text-center">
          <div className="App-header">
            <div className="row">
              {
                this.state.current ?
                  <Main 
                      country={this.state.current.country}
                        confirmed={this.state.current.confirmed}
                        deaths={this.state.current.deaths}
                        recovered={this.state.current.recovered}
                        date={this.state.current.date}
                  />
                  : null
              }
            </div>
            <input type="text" placeholder="Search a country..." onChange={this.queryOnChange.bind(this)}></input>
            <div className="row list">
              {
                this.state.locations
                  .filter(location => this.state.query ?
                    location.country.toUpperCase().indexOf(this.state.query.toUpperCase()) > -1 :
                    Boolean)
                  .map((location, key) => {
                    return location.country !== this.state.location.country ?
                      <Card key={key}
                        country={location.country}
                        confirmed={location.confirmed}
                        deaths={location.deaths}
                        recovered={location.recovered}
                        date={location.date}
                      />
                      : null
                  })
              }
            </div>
          </div>
        </body>
      </>
    );
  }
}

export default App;
