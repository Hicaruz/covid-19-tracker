import React, { Component } from 'react'
import { XAxis, YAxis, Tooltip, Line, ReferenceLine, Legend, ComposedChart, Area, Bar, PieChart, Pie, Cell } from 'recharts'
import Map from './map'
import crg from 'country-reverse-geocoding'
import Header from './header'
import { flags } from './flags'

const Percent = ({ totals }) => {
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
        <PieChart
            width={window.screen.width}
            height={250}>
            <Pie
                data={totals}
                paddingAngle={5}
                cx={window.screen.width / 2}
                cy={100}
                label={renderCustomizedLabel}
                innerRadius={60}
                outerRadius={80}
                stroke="#282c34"
                dataKey="value"
            >
                {totals.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
        </PieChart>
    )
}
const TimeLine = ({ format, width }) => {
    return (
        <ComposedChart
            width={width}
            height={400}
            data={
                format
                    .slice(0, format.length / 2)
                    .sort((a, b) => {
                        const [aday, amonth, ayear] = a.date.split("/")
                        const [bday, bmonth, byear] = b.date.split("/")
                        const da = new Date(ayear, amonth, aday)
                        const db = new Date(byear, bmonth, bday)
                        return da > db ? 1 : -1
                    })
            }
            margin={{ top: 30, right: 30, left: 30, bottom: 0 }}>
            <YAxis stroke="#FFF" />
            <YAxis stroke="#FFF" orientation="right" yAxisId="right" />
            <XAxis dataKey="date" stroke="#FFF" />
            <Tooltip labelStyle={{ color: "#000" }} />
            <Legend />
            <ReferenceLine x="deaths" stroke="red" />
            <ReferenceLine y={format.reduce(({ infected: a }, { infected: b }) => a > b ? a : b, { infected: 0 })} stroke="red" style={{ color: "#FFF" }} />
            <Line type="monotone" dataKey="infected" stroke="#ffc107" fillOpacity={1} fill="#ffc107" />
            <Bar type="monotone" dataKey="deaths" stroke="#dc3545" fillOpacity={1} fill="#dc3545" />
            <Area type="monotone" dataKey="recovered" className="justify-content-center" stroke="#28a745" fillOpacity={1} fill="url(#colorUv)" />

        </ComposedChart>
    )
}

class Timeline extends Component {
    constructor() {
        super();
        this.state = {
            option: "Italy",
            width: window.screen.width,
            current: [],
            data: [],
            worlddata: [],
            sort: "deaths",
            colorBy: "mortality"

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
        const data = []
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
                if (location.timelines) {
                    const deaths = location.timelines["deaths"].timeline
                    const recovered = recoFiltered || {}
                    const confirmed = location.timelines["confirmed"].timeline
                    const dates = [...Object.keys(deaths), ...Object.keys(recovered), ...Object.keys(confirmed)]

                    for (const date of dates) {
                        const d = new Date(date).toJSON()
                        data.push({
                            date: d.slice(0, 10).split("-").reverse().join("/"),
                            country: location.country,
                            country_code: location.country_code,
                            deaths: deaths[date] !== undefined ? deaths[date] : 0,
                            recovered: recovered[date] !== undefined ? recovered[date] : 0,
                            infected: confirmed[date] !== undefined ? confirmed[date] : 0
                        })
                    }
                }
            })
        this.setState({ data: data, worlddata: countries })
    }
    render() {
        const current = this.state.data.filter(l => l.country === this.state.option)
        const format = current.filter(({ infected, deaths, recovered }) => infected > 0)
        const keys = ["deaths", "recovered", "infected"]
        const totals = []
        for (const key of keys) {
            let value = [...format].pop()
            totals.push({
                name: key,
                value: value ? value[key] : 0
            })
        }
        return (
            <div>
                <div className="justify-content-center App-header">
                    <Header />
                </div>
                <div className="row">
                    <div className="principal col-6">
                        <img src={`https://www.countryflags.io/${flags[this.state.option]}/flat/64.png`} alt="" />
                        <select
                            value={this.state.option}
                            onChange={this.handleChange.bind(this)}
                            className="btn btn-light dropdown-toggle"
                            style={{ width: "250px" }}>
                            {
                                //[...new Set(this.state.data.map(l => `${l.country}${l.province ? `, ${l.province}` : ""} `))]
                                [...new Set(this.state.data.map(l => l.country))]
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
                    <div className="principal col-6">
                        <h3>World</h3>
                        <select
                            value={this.state.colorBy}
                            onChange={this.handleColorChange.bind(this)}
                            className="btn btn-light dropdown-toggle"
                            style={{ width: "250px" }}>
                            <option value="mortality">mortality</option>
                            <option value="infectivity">infectivity</option>
                            <option value="recovered">recovered</option>

                        </select>
                    </div>
                </div>
                <div style={{ fontSize: "18px", backgroundColor: "#0282c34" }} className="d-flex  justify-content-center">
                    {
                        this.state.data.length ?
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col">
                                        <h3>Time Line</h3>
                                        <TimeLine format={format} width={this.getWidth()} />
                                    </div>
                                    <div className="col" style={{ width: `${this.getWidth() - 100}px` }}>
                                        <Map locations={this.state.worlddata} colorBy={this.state.colorBy}/>
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
export default Timeline