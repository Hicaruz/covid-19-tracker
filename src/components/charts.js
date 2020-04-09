import { XAxis, YAxis, Tooltip, Line, Legend, ComposedChart, Area, AreaChart, ResponsiveContainer, CartesianGrid, Treemap } from 'recharts'
import React from 'react'

const Stack = props => {
    const getPercent = (value, total) => {
        const ratio = total > 0 ? value / total : 0;
        return toPercent(ratio, 2);
    };
    const toPercent = (decimal, fixed = 0) => {
        return `${(decimal * 100).toFixed(fixed)}%`;
    };
    const renderTooltipContent = (o) => {
        const { payload } = o;
        const total = payload.reduce((result, entry) => (result + entry.value), 0);

        return (
            <div className="customized-tooltip-content container">
                {
                    payload.map((entry, index) => (
                        <p key={`item-${index}`} style={{ color: entry.color }}>
                            {`${entry.name}: ${getPercent(entry.value, total)}`}
                        </p>
                    ))
                }
            </div>
        );
    };
    return (
        <ResponsiveContainer
            width="100%"
            height={200}
            className="ResponsiveContainer"
        >
            <AreaChart
                syncId="chart"
                data={props.data
                    .sort((a, b) => {
                        const [aday, amonth, ayear] = a.date.split("/")
                        const [bday, bmonth, byear] = b.date.split("/")
                        const da = new Date(ayear, amonth, aday)
                        const db = new Date(byear, bmonth, bday)
                        return da > db ? 1 : -1
                    })}
                stackOffset="expand"
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>

                >
            <XAxis dataKey="date" stroke="transparent" />
                <YAxis tickFormatter={toPercent} stroke="#000" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip content={renderTooltipContent} labelStyle={{ color: "#000", fontSize: "20px" }} />
                <Area type="monotone" dataKey="infected" stackId="1" stroke="#ffc107" fill="#ffc107" fillOpacity={1} />
                <Area type="monotone" dataKey="recovered" stackId="1" stroke="" fill="#28a745" fillOpacity={1} />
                <Area type="monotone" dataKey="deaths" stackId="1" stroke="#dc3545" fill="#dc3545" fillOpacity={1} />
            </AreaChart>
        </ResponsiveContainer>
    )
}
const TimeLine = ({ data }) => {
    return (
        <ResponsiveContainer
            width="100%"
            height={200}
            className="ResponsiveContainer"
        >
            <ComposedChart
                syncId="chart"
                data={data}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>

                <YAxis stroke="#000" />
                <XAxis dataKey="date" stroke="transparent" />
                <Tooltip />
                <Legend />
                {/* <ReferenceLine y={data.reduce(({ infected: a }, { infected: b }) => a > b ? a : b, { infected: 0 })} stroke="red" style={{ color: "#FFF" }} /> */}
                <Line type="monotone" dataKey="infected" stroke="#ffc107" fillOpacity={1} fill="#ffc107" />
                <Line type="monotone" dataKey="recovered" className="justify-content-center" stroke="#28a745" fillOpacity={1} fill="#28a745" />
                <Line type="monotone" dataKey="deaths" stroke="#dc3545" fillOpacity={1} fill="#dc3545" />
                <CartesianGrid strokeDasharray="3 3" />

            </ComposedChart>
        </ResponsiveContainer>
    )
}

const TreemapGrahp = ({ data }) => {
    return (
        <ResponsiveContainer
            width="100%"
            height={200}
            className="ResponsiveContainer"
        >
            <Treemap
                data={data}
                dataKey="size"
                ratio={4 / 3}
                stroke="#fff"
                fill="#8884d8"
            />
        </ResponsiveContainer>

    )
}
export { TimeLine, Stack, TreemapGrahp }