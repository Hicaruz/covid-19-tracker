import React, { Component } from 'react'
import { XAxis, YAxis, Tooltip, Line, ReferenceLine, Legend, ComposedChart, Area, Bar, PieChart, Pie, Cell } from 'recharts'
import crg from 'country-reverse-geocoding'
import Header from './header'

class Timeline extends Component {
    constructor() {
        super();
        this.state = {
            option: "Italy",
            current: [],
            data: [],
            locations: [],
            sort: "deaths"
        }
    }
    handleChange(event) {

        this.setState({ option: event.target.value });

    }
    async componentDidMount() {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const { latitude, longitude } = coords;
            const { name: country } = crg.country_reverse_geocoding().get_country(latitude, longitude);
            this.setState({ option: country });
        });
        const res = await fetch("https://coronavirus-tracker-api.herokuapp.com/v2/locations?timelines=1", { mode: 'cors' })
        const format = await res.json()
        const countries = format.locations
        const data = []
        countries
            .sort((a, b) => b.latest[this.state.sort] - a.latest[this.state.sort])
            .map(location => {
                if (location.timelines) {
                    const deaths = location.timelines["deaths"].timeline
                    const recovered = location.timelines["recovered"].timeline
                    const confirmed = location.timelines["confirmed"].timeline
                    const dates = [...Object.keys(deaths), ...Object.keys(recovered), ...Object.keys(confirmed)]

                    for (const date of dates) {
                        data.push({
                            date: new Date(date).toJSON().slice(5, 10).split("-").reverse().join("/"),
                            country: location.country,
                            deaths: deaths[date] !== undefined ? deaths[date] : 0,
                            recovered: recovered[date] !== undefined ? recovered[date] : 0,
                            confirmed: confirmed[date] !== undefined ? confirmed[date] : 0
                        })
                    }
                }
                return {}
            })
        this.setState({ data })
    }
    render() {
        const current = this.state.data.filter(l => l.country === this.state.option)
        const format = current.filter(({ confirmed, deaths, recovered }) => confirmed + deaths + recovered > 0)
        const keys = ["deaths", "recovered", "confirmed"]
        const totals = []
        for (const key of keys) {
            let value = [...format].pop()
            totals.push({
                name: key, 
                value: value ? value[key] :  0
            })
        }
        console.log(totals)
        const COLORS = ['#dc3545', '#28a745', '#ffc107'];
        const RADIAN = Math.PI / 180;
        const renderCustomizedLabel = ({
            cx, cy, midAngle, innerRadius, outerRadius, percent, index,
        }) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            );
        };
        return (
            <div className="container">
                <div className="d-flex justify-content-center App-header">
                    <Header />
                    <select value={this.state.option} onChange={this.handleChange.bind(this)} className="btn btn-light dropdown-toggle" style={{ width: "200px" }}>
                        {
                            //[...new Set(this.state.data.map(l => `${l.country}${l.province ? `, ${l.province}` : ""} `))]
                            [...new Set(this.state.data.map(l => l.country))]
                                .sort()
                                .map((country, key) => {
                                    return (
                                        <option value={country} key={key}>{country}</option>
                                    )
                                })
                        }
                    </select>
                    <br /><br />
                    <div style={{ fontSize: "18px", backgroundColor: "#0282c34" }}>
                        {
                            this.state.data.length ?
                                <div>
                                    <ComposedChart
                                        width={window.screen.width}
                                        height={300}
                                        data={format.slice(0, format.length / 2)}
                                        margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                                        <YAxis stroke="#FFF" />
                                        <YAxis stroke="#FFF" orientation="right" yAxisId="right" />
                                        <XAxis dataKey="date" stroke="#FFF" />
                                        <Tooltip labelStyle={{ color: "#000" }} />
                                        <Legend />
                                        <ReferenceLine x="deaths" stroke="red" />
                                        <ReferenceLine y={format.reduce((p, c) => p.confirmed > c.confirmed ? p.confirmed : c.confirmed, { confirmed: 0 })} stroke="red" style={{ color: "#FFF" }} />
                                        <Line type="monotone" dataKey="confirmed" stroke="#ffc107" fillOpacity={1} fill="#ffc107" />
                                        <Bar type="monotone" dataKey="deaths" stroke="#dc3545" fillOpacity={1} fill="#dc3545" />
                                        <Area type="monotone" dataKey="recovered" className="justify-content-center" stroke="#28a745" fillOpacity={1} fill="url(#colorUv)" />
                                    </ComposedChart>
                                    <PieChart width={window.screen.width} height={250}>
                                        <Pie
                                            data={totals}
                                            paddingAngle={5}
                                            cx={window.screen.width / 2.4}
                                            cy={100}
                                            label={renderCustomizedLabel}

                                            innerRadius={60}
                                            outerRadius={80}
                                            stroke="#282c34"
                                            dataKey="value"
                                        >
                                            {
                                                totals.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)

                                            }
                                        </Pie>
                                    </PieChart>

                                </div>
                                :
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
    }

}
export default Timeline