import { XAxis, YAxis, Tooltip, Line, ReferenceLine, Legend, ComposedChart, Area, Bar, AreaChart, CartesianGrid, ResponsiveContainer } from 'recharts'
import React from 'react'

const Stack = ({ format, width }) => {
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
            <div className="customized-tooltip-content container" style={{ backgroundColor: "#FFF", borderRadius: "15px", padding: "10px" }}>
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
        <AreaChart
            syncId="chart"
            width={width}
            height={400}
            data={format
                .sort((a, b) => {
                    const [aday, amonth, ayear] = a.date.split("/")
                    const [bday, bmonth, byear] = b.date.split("/")
                    const da = new Date(ayear, amonth, aday)
                    const db = new Date(byear, bmonth, bday)
                    return da > db ? 1 : -1
                })}
            stackOffset="expand"
            margin={{ top: 60, right: 30, left: 30, bottom: 0 }}>

            >
            <XAxis dataKey="date" stroke="#FFF" />
            <YAxis tickFormatter={toPercent} stroke="#FFF" />
            <YAxis stroke="#FFF" orientation="right" yAxisId="right" />
            <CartesianGrid />
            <Tooltip content={renderTooltipContent} />
            <Area type="monotone" dataKey="deaths" stackId="1" stroke="#dc3545" fill="#dc3545" fillOpacity={1} />
            <Area type="monotone" dataKey="infected" stackId="1" stroke="#ffc107" fill="#ffc107" fillOpacity={1} />
            <Area type="monotone" dataKey="recovered" stackId="1" stroke="" fill="#28a745" fillOpacity={1} />
        </AreaChart>
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
                data={
                    data
                        .sort((a, b) => {
                            const [aday, amonth, ayear] = a.date.split("/")
                            const [bday, bmonth, byear] = b.date.split("/")
                            const da = new Date(ayear, amonth, aday)
                            const db = new Date(byear, bmonth, bday)
                            return da > db ? 1 : -1
                        })
                }
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>

                <YAxis stroke="#000" />
                <YAxis stroke="#000" orientation="right" yAxisId="right" />
                <XAxis dataKey="date" stroke="transparent" />
                <Tooltip labelStyle={{ color: "#000", fontSize: "15px" }} />
                <Legend />
                <ReferenceLine x="deaths" stroke="red" />
                <ReferenceLine y={data.reduce(({ infected: a }, { infected: b }) => a > b ? a : b, { infected: 0 })} stroke="red" style={{ color: "#FFF" }} />
                <Line type="monotone" dataKey="infected" stroke="#ffc107" fillOpacity={1} fill="#ffc107" />
                <Area type="monotone" dataKey="recovered" className="justify-content-center" stroke="#28a745" fillOpacity={1} fill="#28a745" />
                <Bar type="monotone" dataKey="deaths" stroke="#dc3545" fillOpacity={1} fill="#dc3545" />

            </ComposedChart>
        </ResponsiveContainer>
    )
}

export { TimeLine, Stack }