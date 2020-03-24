import React, { Component } from 'react'
const Main = ({ country, confirmed, deaths, recovered, date }) => {
  return (
    <div className="card mb-3 main">
      <div className="row no-gutters">
        <div className="col-12">
          <div className="card-body">
            <h5 className="card-title">{country}</h5>
            <p className="card-text"><span className="badge badge-warning">Cconfirmed</span>  : {confirmed || 0}</p>
            <p className="card-text"><span className="badge badge-danger">Deaths</span> : {deaths || 0}</p>
            <p className="card-text"><span className="badge badge-success">Recovered</span> : {recovered || 0}</p>
          </div>
          <div className="card-footer">
            <small>last update: {(new Date(date)).toString().slice(0, 15)}</small>
          </div>
        </div>
      </div>
    </div>
  )
}
class Card extends Component {

  render() {
    return (
      <div className=" col-lg-4 col-sm-12 col-xs-12">
        <div className="card text-white bg-dark" >
          <div className="card-body">
            <h5 className="card-title">{this.props.country}</h5>
            <p className="card-text"><span className="badge badge-warning">Confirmed</span>  : {this.props.confirmed}</p>
            <p className="card-text"><span className="badge badge-danger">Deaths</span> : {this.props.deaths}</p>
            <p className="card-text"><span className="badge badge-success">Recovered</span> : {this.props.recovered}</p>
          </div>
          <div className="card-footer">
            <small style={{ fontSize: "17px" }}>last update: {(new Date(this.props.date)).toString().slice(0, 15)}</small>
          </div>
        </div>
      </div>
    )
  }
}

export { Card, Main };