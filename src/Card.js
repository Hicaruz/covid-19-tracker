import React, { Component } from 'react'

class Card extends Component{

    render(){
        return(
            <div className="card text-white bg-dark mb-3" >
            <div className="card-body">
              <h5 className="card-title">{this.country}</h5>
              <p className="card-text"><span className="badge badge-warning">Cconfirmed</span>  : {this.props.confirmed}</p>
              <p className="card-text"><span className="badge badge-danger">Deaths</span> : {this.props.deaths}</p>
              <p className="card-text"><span className="badge badge-success">Recovered</span> : {this.props.recovered}</p>
            </div>
            <div className="card-footer">
              <small style={{ fontSize: "20px" }}>last update : {(new Date(this.props.date)).toString().slice(0, 15)}</small>
            </div>
          </div>
        )
    }
}

export default Card;