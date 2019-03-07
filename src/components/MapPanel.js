import React, {Component} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap} from 'react-google-maps';

/**
 * Wrapper for the Google Map.
 * */
const MapWrapper = withScriptjs(withGoogleMap((props) => (
    <GoogleMap
        center={props.center}
        defaultZoom={props.zoom}
        onClick={props.onMapClick}
    >
      {props.children}
    </GoogleMap>
)));

/**
 * MapPanel Component
 * Manages the rendering of the panel which shows the
 * Google Maps map.
 * */
export class MapPanel extends Component {

  /**
   * Rendering method, displays the component.
   *
   * @returns The rendered component
   * */
  render() {
    const {center, zoom, gMapsApiKey} = this.props;
    return (<div>
      <MapWrapper
          googleMapURL={'https://maps.googleapis.com/maps/api/js?key=' + gMapsApiKey + '&v=3.exp&libraries=geometry,drawing,places'}
          loadingElement={<div style={{height: '100px'}}/>}
          containerElement={<div className={'MapPanel'}/>}
          mapElement={<div style={{height: '100%'}}/>}
          center={center}
          zoom={zoom}
          onMapClick={this.onMapClick}
      >
        {this.props.children}
      </MapWrapper>
    </div>);
  }

  /**
   * Handler for click on the map. Calls the destination setter of
   * with the handler specified in props.
   * @param {Event} evt The generated map event
   * */
  onMapClick = (evt) => {

    if(this.props.onDestinationSelection)
      this.props.onDestinationSelection(evt.latLng.lat(), evt.latLng.lng());
  };

}