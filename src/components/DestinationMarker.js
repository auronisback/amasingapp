import React, {Component} from 'react';
import {SearchWindow} from './SearchWindow';
import {Marker, InfoWindow, Circle} from "react-google-maps";

/**
 * Default max distance for searches.
 * */
const DEFAULT_MAX_DISTANCE = 100;

/**
 * Component defining the marker for the destination.
 * */
export class DestinationMarker extends Component {

  /**
   * Distance circle appearance.
   * */
  static CIRCLE_FILL_COLOR = '#F00';
  static CIRCLE_STROKE_WEIGHT = 0;

  /**
   * React Component's state.
   * */
  state = {
    distance: DEFAULT_MAX_DISTANCE,
    dow: new Date().getDay(),
    time: {
      h: new Date().getHours(),
      m: new Date().getMinutes()
    },
    walkWeight: 50
  };

  /**
   *  Rendering method for React Components
   *  @return Component The react component
   * */
  render() {
    // If no destination has been set, nothing will be rendered
    if(!this.props.destination)
      return null;
    // Conditionally rendering the search window
    const overlay = (this.props.searchVisible ?
            <InfoWindow
                position={this.props.destination}
                onCloseClick={this.props.onSearchClosed}
            >
              <SearchWindow
                  onSubmit={this.onSubmit}
                  className={'SearchOpened'}
                  isLoading={this.props.isLoading}
                  dow={this.state.dow}
                  distance={this.state.distance}
                  time={this.state.time}
                  walkWeight={this.state.walkWeight}
                  onDowChanged={this.onDowUpdate}
                  onTimeChanged={this.onTimeUpdate}
                  onDistanceChanged={this.onDistanceUpdate}
                  onWalkWeightChanged={this.onWalkWeightUpdate}
              />
            </InfoWindow> : null
    );
    return (
        <Marker
            position={this.props.destination}
            onClick={this.props.onMarkerClick}
        >
          {overlay}
          <Circle
              center={this.props.destination}
              radius={this.state.distance}
              options={{
                fillColor: DestinationMarker.CIRCLE_FILL_COLOR,
                strokeWeight: DestinationMarker.CIRCLE_STROKE_WEIGHT
              }}
          />
        </Marker>
    );
  }

  /**
   * Handler method when dow is changed into search window.
   * @param {int} dow Selected day of the week
   * */
  onDowUpdate = (dow) => {
    this.setState({dow: dow});
  };

  /**
   * Handler method when time is changed.
   * @param {Object} time Time in the search window
   * */
  onTimeUpdate = (time) => {
    this.setState({time: time});
  };

  /**
   * Handler method for changing in the max distance.
   * @param {string} distance Max distance for parks
   * */
  onDistanceUpdate = (distance) => {
    this.setState({distance: +distance > 0 ? +distance : 0});
  };

  /**
   * Handler method for updating the walking weight.
   * @param {number} walkWeight Weight given to walk
   * */
  onWalkWeightUpdate = (walkWeight) => {
    this.setState({walkWeight: walkWeight});
  };

  /**
   * Handles the submitting of search parameters.
   * */
  onSubmit = () => {
    if(this.props.onSearch)
      this.props.onSearch(this.state);
  };


}