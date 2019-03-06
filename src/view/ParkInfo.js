import React, {Component} from 'react';

export default class ParkInfo extends Component {
  /**
   * Renderizes the element.
   * */
  render() {
    return (
        <div className={'ParkInfoWindow container'}>
          <div className={'row'}>Occupancy Rate: {(this.props.occRate * 100).toFixed(0)}%</div>
          <div className={'row'}>Distance: {ParkInfo._distanceToString(this.props.distance)}</div>
          <div className={'row'}>Park Number: {this.props.parkNumber}</div>
          <div className={'row'}>Type: {this.props.streetType}</div>
          <div className={'row'}>Had measure: {this.props.haveMes ? 'Yes' : 'No'}</div>
        </div>
    );
  }

  /**
   * Converts a distance in a pretty printable form.
   * @param[in] distance The distance from the destination
   * @return string The string representing distance
   * */
  static _distanceToString(distance) {
    let d = (+distance).toFixed(0);
    if(d < 1000) // Short distance, returning it in meters
      return d + 'm';
    else
      return (d / 1000).toFixed(1) + 'km';
  };
}