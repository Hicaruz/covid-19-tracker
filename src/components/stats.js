import React, { Component } from 'react'
import Map from './map'
import crg from 'country-reverse-geocoding'
import { flags } from './flags'
import { TimeLine, Stack } from './charts'

class Stats extends Component {
    constructor() {
        super();
        this.state = {
            option: "Italy",
            width: window.screen.width,
            current: [],
            data: [],
            worlddata: [],
            sort: "deaths",
            colorBy: "mortality",
            population: []

        }
    }
    handleChange(event) {
        this.setState({ option: event.target.value });
    }
    handleColorChange(event) {
        this.setState({ colorBy: event.target.value });
    }
    getWidth() {
        const screen = window.screen.width
        return screen > 600 ? screen * 0.50 : screen
    }
    async componentDidMount() {
        // console.log(this.props.location.search)
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const { latitude, longitude } = coords;
            const { name: country } = crg.country_reverse_geocoding().get_country(latitude, longitude);
            this.setState({ option: country });
        });
        const [tmp, res] = await Promise.all([
            fetch("https://covid2019-api.herokuapp.com/timeseries/recovered", { mode: "cors" }),
            fetch("https://coronavirus-tracker-api.herokuapp.com/v2/locations?timelines=1", { mode: 'cors' })
        ])
        const [{ recovered }, { locations: countries }] = await Promise.all([tmp.json(), res.json()])
        const worldstats = []
        recovered.map(location => {
            delete location.Lat
            delete location.Long
            delete location["Province/State"]
            return location
        })
        countries
            .sort((a, b) => b.latest[this.state.sort] - a.latest[this.state.sort])
            .forEach(location => {
                const recoFiltered = recovered.filter(v => v["Country/Region"] === location.country).shift()
                recoFiltered && delete recoFiltered["Country/Region"]
                const recoFormarted = {}
                for (const date in recoFiltered) {
                    recoFormarted[new Date(date).toJSON().slice(0, 11) + "00:00:00Z"] = recoFiltered[date]
                }
                if (location.timelines) {
                    const deaths = location.timelines["deaths"].timeline
                    const recovered = recoFormarted || {}
                    const confirmed = location.timelines["confirmed"].timeline
                    const dates = [...Object.keys(deaths), ...Object.keys(recovered), ...Object.keys(confirmed)]
                    for (const date of dates) {
                        worldstats.push({
                            date: new Date(date).toJSON().slice(0, 10).split("-").reverse().join("/"),
                            country: location.country,
                            population: location.country_population,
                            country_code: location.country_code,
                            latest: location.latest,
                            deaths: deaths[date] !== undefined ? deaths[date] : 0,
                            recovered: recoFormarted[date] !== undefined ? recoFormarted[date] : 0,
                            infected: confirmed[date] !== undefined ? confirmed[date] : 0
                        })
                    }
                }
            })
        this.setState({ worlddata: worldstats })
    }
    render() {
        const current = this.state.worlddata.filter(l => l.country === this.state.option)
        const format = current.filter(({ infected }) => infected > 0)
        const types = ["deaths", "recovered", "infected"]
        const totals = []
        for (const type of types) {
            let value = [...format].pop()
            totals.push({
                name: type,
                value: value ? value[type] : 0
            })
        }
        return (
            <div>
                <div className="d-flex justify-content-center stats">
                    {
                        this.state.worlddata.length ?
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col">
                                        <div className="principal">
                                            <img src={`https://www.countryflags.io/${flags[this.state.option]}/flat/64.png`} alt="" />
                                            <select
                                                value={this.state.option}
                                                onChange={this.handleChange.bind(this)}
                                                className="btn btn-light dropdown-toggle w-auto"
                                               >
                                                {
                                                    //[...new Set(this.state.data.map(l => `${l.country}${l.province ? `, ${l.province}` : ""} `))]
                                                    [...new Set(this.state.worlddata.map(l => l.country))]
                                                        .sort()
                                                        .map((country, key) => {
                                                            return (country !== "China" ?
                                                                <option value={country} key={key}>{country}</option> :
                                                                null
                                                            )
                                                        })
                                                }
                                            </select>
                                        </div>
                                        <h3 className="title-chart">Time Line</h3>
                                        <TimeLine format={format} width={this.getWidth()} />
                                    </div>
                                    <div className="col" style={{ width: `${this.getWidth() - 100}px`, marginTop:"20px" }}>
                                        <div className="principal">
                                            <h3>World Map, colored by {this.props.colorBy}</h3>
                                            <select
                                                value={this.state.colorBy}
                                                onChange={this.handleColorChange.bind(this)}
                                                className="btn btn-light dropdown-toggle w-auto">
                                                <option value="mortality">mortality</option>
                                                {/* <option value="infectivity">infectivity</option>
                            <option value="recovered">recovered</option> */}

                                            </select>
                                        </div>
                                        <Map locations={this.state.worlddata} colorBy={this.state.colorBy} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <h3 className="title-chart">{this.state.option}'s Percent</h3>
                                        <Stack format={format} width={this.getWidth()} />
                                    </div>
                                    <div>
                                        {/* <Stack format={format} width={this.getWidth()} /> */}
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                    }
                </div>
            </div>

        )
    }

}
export default Stats