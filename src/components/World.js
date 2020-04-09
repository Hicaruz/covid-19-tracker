
import React from 'react';
import { Card, ProgressBar, Badge, Container, Col, Row, Image } from 'react-bootstrap';
import { TimeLine, Stack } from './charts';

export const World = ({ world, summary }) => {
    const latest = summary.reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
    const timeline = {
        confirmed: world.map(({ timelines }) => timelines.confirmed.timeline),
        deaths: world.map(({ timelines }) => timelines.deaths.timeline),
        recovered: world.map(({ timelines }) => timelines.recovered.timeline)
    }
    const { confirmed, deaths, recovered } = timeline;

    const all_timelines = [...confirmed, ...deaths, ...recovered]
    const dates = [...all_timelines].reduce((_dates, current) => ([..._dates, Object.keys(current)]), []).flat()
    const data = []
    for (const date of [...new Set(dates)]) {
        const infected = timeline.confirmed.filter(t => t[date]).map(v => v[date]).reduce((t, c) => t + c, 0)
        const deaths = timeline.deaths.filter(t => t[date]).map(v => v[date]).reduce((t, c) => t + c, 0)
        const recovered = timeline.recovered.filter(t => t[date]).map(v => v[date]).reduce((t, c) => t + c, 0)
        data.push({
            date: date.slice(0, 10).split("-").reverse().join("/"),
            infected,
            deaths,
            recovered
        })
    }

    data
        .sort((a, b) => {
            const [aday, amonth, ayear] = a.date.split("/");
            const [bday, bmonth, byear] = b.date.split("/");
            const da = new Date(ayear, amonth, aday);
            const db = new Date(byear, bmonth, bday);
            return da > db ? 1 : -1;
        })

    const total = Object.values(latest).reduce((acc, cur) => acc + cur, 0)
    return (
        <div style={{ height: (window.screen.height * 0.90), overflowY: "auto" }}>
            <Card>
                <Container>
                    <Card.Body>
                        <Card.Text>
                            <div>
                                <Badge variant="dark">Data</Badge>
                                <h3>World</h3>
                            </div>
                            <ProgressBar >
                                <ProgressBar
                                    className="bar"
                                    variant="success"
                                    now={((latest.recovered / total) * 100).toFixed()}
                                    key={1} />
                                <ProgressBar
                                    className="bar"
                                    style={{ color: "#000" }}
                                    variant="warning"
                                    now={((latest.confirmed / total) * 100).toFixed()}
                                    key={2} />
                                <ProgressBar
                                    className="bar"
                                    variant="danger"
                                    now={((latest.deaths / total) * 100).toFixed()}
                                    key={3} />
                            </ProgressBar>
                            <Row className="c-header">
                                <Col md={7}>
                                    <Image src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fglossarissimo.files.wordpress.com%2F2017%2F05%2Fflags-of-the-world.jpg&f=1&nofb=1" fluid />
                                </Col>
                                <Col md={5} className="data-header">
                                    <div>
                                        <Badge variant="warning">confirmed</Badge>
                                        {'\t'}<span>{latest.confirmed}</span>
                                    </div>
                                    <div>
                                        <Badge variant="success">recovered</Badge>
                                        {'\t'}<span>{latest.recovered}</span>
                                    </div>
                                    <div>
                                        <Badge variant="danger">deaths</Badge>
                                        {'\t'}<span>{latest.deaths}</span>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Text>
                        <Col className="card-header">
                            <TimeLine data={data} />
                        </Col>
                        <Col className="card-header">
                            <Stack data={data} />
                        </Col>
                        {/* <Col className="card-header">
                            <TreemapGrahp data={world.map(location => ({
                                name: location.country,
                                size: location.latest.confirmed 
                            }))} />
                        </Col> */}
                        <small>Last update {[...world].shift().last_updated.slice(0, 10).split("-").reverse().join("/")}</small>
                    </Card.Body>
                </Container>

            </Card>
        </div>);
};
