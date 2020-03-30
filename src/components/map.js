import React, { Component } from 'react'
import { ComposableMap, Geographies, Geography, Annotation } from "react-simple-maps";
import { colors } from './colors'
class Map extends Component {

    constructor(props) {
        super(props)
        this.state = {
            geoUrl: "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json",
            locations: [],
            format: [],
            current: {},
            colorBy: "mortality"
        }
    }
    componentDidMount() {

    }
    render() {
        return (
            <>
                <ComposableMap width={window.screen.width / 2}>
                    <Geographies geography={this.state.geoUrl} >
                        {({ geographies }) => {
                            const coordinates = [...geographies].reduce((_coor, geo) => _coor[geo.properties.NAME] = [...geo.geometry.coordinates].pop(), {})
                            console.log(coordinates)
                            return (geographies.map(geo => {
                                const { NAME: country } = geo.properties
                                const current = this.props.worldData.filter(l => l.country === country)
                                const latest = current.length ? current.shift()["latest"] : { confirmed: 0, deaths: 0, recovered: 0 }
                                const sortData = {
                                    infectivity: (latest.confirmed / (country.population ? country.population : 1)) * 100,
                                    mortality: (latest.deaths / latest.confirmed) * 1500,
                                    recovered: (latest.recovered / latest.confirmed) * 1000
                                }
                                const percent = (latest.deaths / latest.confirmed) * 1500
                                const hex = (isNaN(percent) ? 0 : percent).toFixed()
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={colors[hex] || "#0F0"} stroke={colors[hex] || "#0F0"}
                                    />)
                            }))
                        }

                        }
                    </Geographies>
                    {
                        this.props.current ?
                            <Annotation
                                subject={[this.props.current.longitude, this.props.current.latitude]}
                                dx={-90}
                                dy={-30}
                                curve={1}
                                connectorProps={{
                                    stroke: "#FF5533",
                                    strokeWidth: 3,
                                    strokeLinecap: "round"
                                }}
                            >
                                <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="#F53" >
                                    {this.props.current.country}
                                </text>
                            </Annotation> : null
                    }
                </ComposableMap>
            </>
        )
    }
}




export default Map
