import React from 'react';
import { Card, ProgressBar, Badge, Container, Col, Row, Image } from 'react-bootstrap';
import { TimeLine, Stack } from './charts';

export const Country = ({ current, isAccordion }) => {
    const { confirmed, deaths, recovered } = current.timelines;
    const data = [];
    const dates = [...new Set(Object.keys(confirmed.timeline), Object.keys(deaths.timeline), Object.keys(recovered.timeline))];
    dates
        .reverse()
        .forEach(date => date !== "latest" && data.push({
            date: date.slice(0, 10).split("-").reverse().join("/"),
            infected: confirmed.timeline[date] || 0,
            deaths: deaths.timeline[date] || 0,
            recovered: recovered.timeline[date] || 0
        }));
    data
        .sort((a, b) => {
            const [aday, amonth, ayear] = a.date.split("/");
            const [bday, bmonth, byear] = b.date.split("/");
            const da = new Date(ayear, amonth, aday);
            const db = new Date(byear, bmonth, bday);
            return da > db ? 1 : -1;
        });
    const { latest } = current
    const total = Object.values(latest).reduce((acc, cur) => acc + cur, 0)
    console.log(current)
    return (
        <div style={{ height: (window.screen.height * 0.90), overflowY: "auto" }}>
            <Card>
                <Container>
                    <Card.Body>
                        <Card.Text>
                            {
                                !isAccordion ?
                                    <div>
                                        <Badge variant="dark">Data</Badge>
                                        <h3>{current.country}</h3>
                                    </div>
                                    : null
                            }

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
                                    {
                                        !isAccordion ?
                                            <Image src={`https://flagpedia.net/data/flags/normal/${current.country_code.toLowerCase()}.png`} fluid />
                                            : null
                                    }
                                </Col>
                                <Col md={5} className="data-header">
                                    {
                                        [
                                            ["warning", "confirmed"],
                                            ["success", "recovered"],
                                            ["danger", "deaths"]
                                        ].map(([variant, value], key) =>
                                            <div key={key}>
                                                <Badge variant={variant}>{value}</Badge>
                                                {'\t'}
                                                <span>
                                                    {latest[value].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                </span>
                                            </div>
                                        )
                                    }
                                </Col>
                            </Row>
                        </Card.Text>
                        <Col className="card-header">
                            <TimeLine data={data.filter(({ infected }) => infected > 0)} />
                        </Col>
                        <Col className="card-header">
                            <Stack data={data.filter(({ infected }) => infected > 0)} />
                        </Col>
                        <small>Last update {current.last_updated.slice(0, 10).split("-").reverse().join("/")}</small>
                    </Card.Body>
                </Container>

            </Card>
        </div>);
};
