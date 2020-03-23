import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import crg from 'country-reverse-geocoding'
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
      const { latitude, longitude } = coords
      const { name: country } = crg.country_reverse_geocoding().get_country(latitude, longitude)
      this.setState({
        location: {
          latitude,
          longitude,
          country
        }
      })
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
    console.log(current)
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
              <div className="card mb-3 main">
                <div className="row no-gutters">
                  <div className="col-12">
                    <div className="card-body">
                      <h5 className="card-title">{this.state.location.country}</h5>
                      <p className="card-text"><span class="badge badge-warning">Cconfirmed</span>  : {this.state.current.confirmed || 0}</p>
                      <p className="card-text"><span class="badge badge-danger">Deaths</span> : {this.state.current.deaths || 0}</p>
                      <p className="card-text"><span class="badge badge-success">Recovered</span> : {this.state.current.recovered || 0}</p>
                    </div>
                    <div className="card-footer">
                      <small>last update: {(new Date(this.state.current.date)).toString().slice(0, 15)}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <input type="text" placeholder="Search a country..." onChange={this.queryOnChange.bind(this)}></input>
            <div className="row list">
              {
                this.state.locations
                  .filter(location => this.state.query ?
                    location.country.toUpperCase().indexOf(this.state.query.toUpperCase()) > -1 :
                    Boolean)
                  .map((location, key) => {
                    return location.country !== this.state.location.country ? (
                      <div className="card text-white bg-dark mb-3" key={key}>
                        <div className="card-body">
                          <h5 className="card-title">{location.country}</h5>
                          <p className="card-text"><span class="badge badge-warning">Cconfirmed</span>  : {location.confirmed}</p>
                          <p className="card-text"><span class="badge badge-danger">Deaths</span> : {location.deaths}</p>
                          <p className="card-text"><span class="badge badge-success">Recovered</span> : {location.recovered}</p>
                        </div>
                        <div className="card-footer">
                          <small style={{ fontSize: "20px" }}>last update : {(new Date(location.date)).toString().slice(0, 15)}</small>
                        </div>
                      </div>
                    ) : null
                  })
              }
            </div>
          </div>
        </body>
      </>
    );
    // } catch (e) {
    //   return (

    //     <div className="App-header">
    //       <br />
    //       <div class="spinner-border text-danger" role="status">
    //         <span class="sr-only"></span>
    //       </div>
    //     </div>
    //   )
    // }
  }
}

export default App;
