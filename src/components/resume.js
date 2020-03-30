import React, { Component } from 'react';
import '../App.css';
import crg from 'country-reverse-geocoding'
import getData from './data'
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
      this.setState({ current: { latitude, longitude, country } });
    });
    const data = await getData()
    console.log(data)
    // const [tmp, res] = await Promise.all([
    //   fetch("https://covid2019-api.herokuapp.com/v2/current", { mode: "cors" }),
    //   fetch("https://coronavirus-tracker-api.herokuapp.com/v2/locations?timelines=1", { mode: 'cors' })
    // ])
    // const [reco, { locations: countries }] = await Promise.all([tmp.json(), res.json()])

    // const initialState = { confirmed: 0, deaths: 0, recovered: 0 }
    // const recovered = {}
    // reco.data.forEach(l => recovered[l.location] = l.recovered)
    // for (const country of countries) {
    //   if (this.state.current.country) {
    //     const current = this.state.locations.filter(location => location.country === this.state.current.country)
    //     this.setState({ current: { ...current.shift(), ...this.state.current } })
    //   }
    //   initialState.confirmed += country.latest.confirmed
    //   initialState.deaths += country.latest.deaths
    //   initialState.recovered += recovered[country.country] || 0
    // }
    // countries.map(l => {
    //   const { latest } = l
    //   latest.recovered = recovered[l.country]
    //   return l
    // })
    // this.setState({
    //   locations: countries.sort((a, b) => b.latest[this.state.sort] - a.latest[this.state.sort]),
    //   confirmed: initialState.confirmed,
    //   deaths: initialState.deaths,
    //   recovered: initialState.recovered
    // })
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
    // const filtered = this.state.locations.filter(location => this.checkInput(location))
    // const current = this.state.locations.filter(location => location.country === this.state.current.country).shift()
    // const data = !this.state.query ? [current, ...filtered] : filtered
    return (
      <>
        <div>
          <p>bruh</p>
        </div>
        {/* <div className="App-header">
          <div className="text-center">
            <div className="container-xl">
              <br />
              <input
                type="text" placeholder="Search a country..."
                onChange={this.queryOnChange.bind(this)}>
              </input>
              <br />
              <div className="container" >
                <div className="row list">
                <div className="col-6">
                  {
                    this.state.locations.length ?
                      data.map((location, key) => location ?
                        <Card
                          size={filtered.length}
                          key={key}
                          flag={location.country_code}
                          bg={location.country !== (current ? current.country : "") ? "bg-dark" : "bg-light"}
                          text={location.country !== (current ? current.country : "") ? "white" : "black"}
                          country={location.country}
                          province={location.province}
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
            </div>
          </div>
        </div>*/}
      </>
    );
  }
}

export default Resume;
