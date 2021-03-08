import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class BtnLiquid extends Component {
  render() {
    return (
      <Link to={this.props.action} className={'btn-fluid ' + this.props.className}>
        <span className="d-flex align-items-center">
          {this.props.text}
        </span>
        {this.props.svg}
        <div className="back"></div>

        <svg width="0" height="0" className="d-none"> 
          <filter id="filter">
            <feTurbulence type="fractalNoise" baseFrequency=".01" numOctaves="6" />
            <feDisplacementMap in="SourceGraphic" scale="100" />
          </filter>
        </svg>
      </Link>
    );
  }
}

export default BtnLiquid;

