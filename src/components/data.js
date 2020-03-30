
function mergeTimeLine(location, timeline = {}, type = "recovered") {
    const { timelines, latest } = location
    const last = Object.values(timeline).pop()
    const new_location = {
        ...location,
        latest: {
            ...latest,
            [type]: last
        },
        timelines: {
            ...timelines,
            [type]: {
                latest: last,
                timeline: timeline
            }
        }
    }
    return new_location

}
async function setup() {
    const mode = { mode: "cors" }
    const [_timeline, _recovered] = await Promise.all([
        fetch("https://coronavirus-tracker-api.herokuapp.com/v2/locations?timelines=1", mode),
        fetch('https://covid2019-api.herokuapp.com/timeseries/recovered', mode)
    ])

    const [timeline, { recovered }] = await Promise.all([_timeline.json(), _recovered.json()])
    const { locations } = timeline
    const recoveredTimeLine = {}
    recovered.forEach(location => {
        const _location = {}
        //const province = location["Province/State"]
        const country = location["Country/Region"]
        delete location.Lat
        delete location.Long
        delete location["Province/State"]
        delete location["Country/Region"]
        for (const date in location) {
            _location[new Date(date).toJSON().slice(0, 11) + "00:00:00Z"] = parseInt(location[date])
        }
        recoveredTimeLine[country] = _location
    });
    const world = locations.map(l => mergeTimeLine(l, recoveredTimeLine[l.country] || recoveredTimeLine[l.country.replace(/ /g, "_")], "recovered"))
    const summary = Object.values(world).reduce(({ confirmed, deaths, recovered }, { latest }) => {
        return {
            confirmed: confirmed += latest.confirmed,
            deaths: deaths += latest.deaths,
            recovered: recovered += latest.recovered,
        }
    }, { confirmed: 0, deaths: 0, recovered: 0, active: 0 })
    return { world, summary }
}
export default setup