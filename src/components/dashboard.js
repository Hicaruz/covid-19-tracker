import React, { Component } from 'react'
import crg from 'country-reverse-geocoding'
import getData from './data'

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            summary: {},
            world: []
        }
    }

    async componentDidMount() {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const { latitude, longitude } = coords;
            const { name: country } = crg.country_reverse_geocoding().get_country(latitude, longitude);
            this.setState({ current: { latitude, longitude, country } });
        });
        const { summary, world } = await getData()
        this.setState({ summary, world})
    }
    render() {
        return (
            <div>
                Bruh
            </div>
        )
    }
}
export default Dashboard