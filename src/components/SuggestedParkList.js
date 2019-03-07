import React, {Component} from 'react';
import {ParkMarker} from "./ParkMarker";

/**
 * Component which manages the list of suggested parks.
 * */
export default class SuggestedParkList extends Component {
  /**
   * Renders the suggested park list.
   * */
  render() {
    return (
        <div>{this._buildSuggestedParks()}</div>
    );
  };

  /**
   * Builds the park lot markers.
   * @return ParkMarker[] The created park markers
   * */
  _buildSuggestedParks = () => {
    let markers = [];
    this.props.parks.forEach((elem, index) => {
      markers.push(
          <ParkMarker
              key={elem.id}
              parking={elem}
              label={index + 1}
          />
      );
    });
    return markers;
  };
}