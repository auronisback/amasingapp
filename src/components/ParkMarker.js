import React, {Component} from 'react';
import {InfoWindow, Marker} from "react-google-maps";

import ParkInfo from './ParkInfo';
import ParkStroke from "./ParkStroke";


/**
 * Component used to manage parking lots markers.
 * */
export class ParkMarker extends Component {

  /**
   * Component's state.
   * */
  state = {
    infoWindowShown: false
  };

  /**
   * Strokes appearance.
   * */
  static STROKE_COLOR = '#F00';
  static STROKE_OPACITY = 1;

  /**
   * Renders the component.
   * */
  render() {
    return (
        <Marker
            position={this.getPosition()}
            onClick={this.toggleOpen}
            label={'' + this.props.label}
        >
          {
            this.state.infoWindowShown && (<InfoWindow
                onCloseClick={this.handleClose}
            >
              <ParkInfo
                  occRate={this.props.parking.occupancy}
                  distance={this.props.parking.distance}
                  parkNumber={this.props.parking.number}
                  streetType={this.props.parking.streetType}
                  haveMes={this.props.parking.haveMes}
              />
            </InfoWindow>)
          }
          <ParkStroke
              start={this.props.parking.start}
              end={this.props.parking.end}
              color={ParkMarker.STROKE_COLOR}
              opacity={ParkMarker.STROKE_OPACITY}
          />
        </Marker>
    );
  };

  /**
   * Handler for the click on the marker, used to show
   * the info window.
   * */
  toggleOpen = () => {
    this.setState({infoWindowShown: !this.state.infoWindowShown})
  };

  /**
   * Handler for closing the info window.
   * */
  handleClose = () => {
    this.setState({infoWindowShown: false})
  };

  /**
   * Gets the position of the marker.
   * @return {Object} An object with coordinates for the marker
   * */
  getPosition = () => {
    return {
      lat: (this.props.parking.start.lat + this.props.parking.end.lat) / 2,
      lng: (this.props.parking.start.lng + this.props.parking.end.lng) / 2
    };
  };
}