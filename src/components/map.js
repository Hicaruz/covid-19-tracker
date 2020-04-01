import React, { Component } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { colors } from './colors'
class Map extends Component {

    constructor(props) {
        super(props)
        this.state = {
            geoUrl: "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json",
            colorBy: "mortality"
        }
    }
    onClick(ev){
        console.log(ev)
    }
    render() {
        return (
            <>
                <ComposableMap width={window.screen.width / 2}>
                    <Geographies geography={this.state.geoUrl} >
                        {({ geographies }) =>
                            geographies.map(geo => {
                                const { ISO_A2: code } = geo.properties
                                const current = [...this.props.worldData].filter(({ country_code }) => country_code === code).shift()

                                if (!current) {
                                    return <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill="#373738" stroke="#373738"
                                    />
                                }

                                const latest = Object.keys(current || {}).length ? current.latest : { confirmed: 0, deaths: 0, recovered: 0 }
                                const sortData = {
                                    infectivity: (latest.confirmed / (current.population ? current.population : 1)) * 100,
                                    mortality: (latest.deaths / latest.confirmed) * 100,
                                    recovered: (latest.recovered / latest.confirmed) * 100
                                }
                                const percent = (latest.deaths / latest.confirmed) * 2000
                                const hex = (isNaN(percent) ? 0 : percent).toFixed()
                                !colors && console.log(hex > 100)
                                return (
                                    <g onClick={() => this.onClick(current)}>
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={colors[hex > 100 ? 100 : hex] || "#0F0"} stroke={"#000"} strokeWidth={.5}
                                        />
                                    </g>)
                            })
                        }
                    </Geographies>
                    {
                        this.props.current ?
                            <Marker coordinates={[this.props.current.longitude, this.props.current.latitude]}>
                                <g
                                    fill="none"
                                    stroke="#FF5533"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    transform="translate(-12, -24)"
                                >
                                    <circle r={5} fill="#F00" stroke="#fff" strokeWidth={2} />
                                </g>
                            </Marker> : null

                    }
                </ComposableMap>
            </>
        )
    }
}




export default Map
