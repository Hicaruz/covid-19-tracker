import React, { Component } from 'react'
import Header from './header'

class Map extends Component {

    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <iframe src="https://www.healthmap.org/covid-19/" title="map" width="100%" height="700px" style={{border: "#000"}}/>
                </div>
            </div>
        )
    }

}
export default Map