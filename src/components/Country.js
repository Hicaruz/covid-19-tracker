import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import { TimeLine, Stack } from './charts';
export const Country = ({ current }) => {
    const { confirmed, deaths, recovered } = current.timelines;
    const data = [];
    const dates = [...new Set(Object.keys(confirmed.timeline), Object.keys(deaths.timeline), Object.keys(recovered.timeline))];
    dates
        .reverse()
        .forEach(date => date !== "latest" && data.push({
            date: date,
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
    console.log(current);
    return (<div style={{ height: (window.screen.height / 1.45), overflow: "auto" }}>
        <Card>
            <Card.Body>
                <Card.Text>
                    Latest report
                    <ProgressBar>
                        <ProgressBar variant="success" now={35} key={1} />
                        <ProgressBar variant="warning" now={20} key={2} />
                        <ProgressBar variant="danger" now={10} key={3} />
                    </ProgressBar>
                </Card.Text>
                <TimeLine data={data.filter(({ infected }) => infected > 0)} />
                <Stack data={data.filter(({ infected }) => infected > 0)} />
            </Card.Body>
        </Card>

    </div>);
};
