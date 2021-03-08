import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class SubmitLiquid extends Component {
  render() {
    return (
      <button to={this.props.action} className={'btn-fluid btn-submit-fluid ' + this.props.className} disabled={this.props.disabled}>
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
      </button>
    );
  }
}

export default SubmitLiquid;

