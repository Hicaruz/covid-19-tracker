import React, { Component } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { colors } from './colors'
class Map extends Component {

    constructor() {
        super()
        this.state = {
            geoUrl: "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json",
            locations: [],
            format: [],
            population: [],
            colorBy: "mortality"
        }
    }
    async componentDidMount() {
        const request = await fetch("https://restcountries.eu/rest/v2/all", { mode: "cors" })
        const population = await request.json()
        this.setState({ population })
    }
    getWidth() {
        const screen = window.screen.width
        return screen > 600 ? screen * 0.75 : screen
    }

    handleChange(event) {
        this.setState({ colorBy: event.target.value });
    }
    render() {
        return (
            this.props.locations.length ?
                <>

                    <h3>World Map, colored by {this.props.colorBy}</h3>

                    <ComposableMap width={this.getWidth() - 100}>
                    <ZoomableGroup scale={1}>
                        <Geographies geography={this.state.geoUrl}>
                            {({ geographies }) =>
                                geographies.map(geo => {
                                    const { NAME: country } = geo.properties
                                    const current = this.props.locations.filter(l => {
                                        const c = l.country === "US" ? "United States of America" : l.country 
                                        return c === country
                                    })
                                    const country_population = this.state.population.filter(l => {
                                        const c = l.country === "US" ? "United States of America" : l.country 
                                        return c === country
                                    })
                                    !country_population.length && console.log(country)
                                    const latest = current.length ? current.shift()["latest"] : { confirmed: 0, deaths: 0, recovered: 0 }
                                        const sortData = {
                                        infectivity: (latest.confirmed / (country_population.length ? country_population.shift()["population"] : 1)) * 100,
                                        mortality: (latest.deaths / latest.confirmed) * 1000,
                                        recovered: (latest.recovered / latest.confirmed) * 1000
                                    }
                                    const percent = sortData[this.props.colorBy]
                                    const hex = (isNaN(percent) ? 0 : percent).toFixed()
                                    return (<Geography key={geo.rsmKey} geography={geo} fill={colors[hex] || "#ff0202"} stroke={colors[hex] || "#ff0202"} />)
                                })
                            }
                        </Geographies>
                        </ZoomableGroup>
                    </ComposableMap>
                </> :
                <div className="justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
        )
    }
}



export default Map
