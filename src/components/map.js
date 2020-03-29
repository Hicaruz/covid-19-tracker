import React, { Component } from 'react'
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { colors } from './colors'
class Map extends Component {

    constructor() {
        super()
        this.state = {
            geoUrl: "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json",
            locations: [],
            format: [],
            colorBy: "mortality"
        }
    }

    getWidth() {
        const { width, height } = window.screen
        return width > height ? width * 0.75 : width * 2.3
    }
    handleClick(event) {
        console.log(event)
    }
    handleChange(event) {
        this.setState({ colorBy: event.target.value });
    }
    render() {
        return (
            this.props.locations.length ?
                <>
                    <ComposableMap width={this.getWidth() - 100}>
                        {/* <ZoomableGroup scale={1}> */}
                        <Geographies geography={this.state.geoUrl} >
                            {({ geographies }) =>
                                geographies.map(geo => {
                                    const repair = {
                                        US: "United States of America",
                                        "united Kingdom": "united Kingdom"
                                    }
                                    const { NAME: country } = geo.properties
                                    const current = this.props.locations.filter(l => (repair[l.country] ? repair[l.country] : l.country) === country)
                                    const latest = current.length ? current.shift()["latest"] : { confirmed: 0, deaths: 0, recovered: 0 }
                                    const sortData = {
                                        infectivity: (latest.confirmed / (country.population ? country.population : 1)) * 100,
                                        mortality: (latest.deaths / latest.confirmed) * 1500,
                                        recovered: (latest.recovered / latest.confirmed) * 1000
                                    }
                                    const percent = sortData[this.props.colorBy]
                                    const hex = (isNaN(percent) ? 0 : percent).toFixed()
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={colors[hex] || "#ff0202"} stroke={colors[hex] || "#ff0202"}
                                        />)
                                })
                            }
                        </Geographies>
                        {/* </ZoomableGroup> */}
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
