import React, {Component} from 'react';
import Geocode from 'react-geocode';
import axios from 'axios';

import './view/custom.scss';
import {TopBar} from './view/TopBar';
import {MapPanel} from './view/MapPanel';
import {DestinationMarker} from './view/DestinationMarker';
import {MessageDialog} from './view/MessageDialog';
import AvailableParkList from "./view/AvailableParkList";
import SuggestedParkList from "./view/SuggestedParkList";

/**
 * App class
 * ControllerView for the app. Manages the creation of views
 * and it is the top component to which view components send
 * user actions and owns the application centralized state.
 * */
class App extends Component {

  /**
   * Message shown when no parks are found.
   * */
  static parksNotFoundMessage = 'No parking lots found with given criteria.';

  /**
   * Application configuration.
   * */
  static configuration = {
    gMapsApiKey: 'AIzaSyCra5AQ9_m4TUQRk-iVIBRKoIQvNyRsc2E',
    defaultMapCenter: { // San Francisco city center
      lat: 37.773972,
      lng: -122.431297
    },
    mapZoom: 13,
    measurementsEndpoint: 'http://18.184.94.248:9090/measurements',
    allParksEndpoint: 'http://18.184.94.248:9090/getParks'
  };

  /**
   * Application state.
   * */
  state = {
    destination: null, // User destination
    parks: [], // Parking lots found
    availableParks: [], // All parking lots
    searchVisible: true, // Initially the search window is visible
    searching: false // Flag indicating the search is still in progress
  };

  /**
   * Creates the application object.
   * @param[in] props React Component's properties
   * */
  constructor(props) {
    super(props);
    // Initializing the Geocoder
    Geocode.setApiKey(App.configuration.gMapsApiKey);
    // Loading all parking in order to show them on the map
    this._loadAllParks();
  }

  /**
   * Renders the application.
   *
   * @output The React component for the application
   * */
  render() {
    // Building the error dialog if needed
    let dialog = null;
    if(this.state.error)
      dialog = (
          <MessageDialog
              message={this.state.error.message}
              type={this.state.error.type}
              onClose={this.onDialogClosed}
          />
      );
    return (
        <div className={'App'}>
          <TopBar
              onReset={this.reset}
              onSearch={this.searchStreetByName}
          />
          <MapPanel
              gMapsApiKey={App.configuration.gMapsApiKey}
              center={this.state.destination ? this.state.destination : App.configuration.defaultMapCenter}
              zoom={App.configuration.mapZoom}
              onDestinationSelection={this.setDestination}
          >
            <AvailableParkList parks={this.state.availableParks} />
            <DestinationMarker
                destination={this.state.destination}
                searchVisible={this.state.searchVisible}
                onSearch={this.searchParks}
                isLoading={this.state.searching}
            />
            <SuggestedParkList parks={this.state.parks} />
          </MapPanel>
          {dialog}
        </div>
    );
  }

  /**
   * Sets the destination, if none has been set already.
   *
   * @param[in] lat The destination latitude
   * @param[in] lng The destination longitude
   * */
  setDestination = (lat, lng) => {
    if(this.state.destination == null)
      this.setState({
        destination: {
          lat: lat,
          lng: lng
        }
      });
  };

  /**
   * Resets the destination and found parks.
   * */
  reset = () => {
    this.setState({
      destination: null,
      parks: [],
      searchVisible: true
    });
  };

  /**
   * Search a street by name.
   * */
  searchStreetByName = (streetName) => {
    // Geocoding (adding the city name)
    Geocode.fromAddress(streetName + ' San Francisco').then((response) => {
      // Getting the first element and setting destination
      const {lat, lng} = response.results[0].geometry.location;
      this.setState({
        destination: {
          lat: lat,
          lng: lng
        }
      });
    }, (error) => {
      this._showMessageDialog(error.message, MessageDialog.TYPE_ERROR)
    });
  };

  /**
   * Handler method for closing error window.
   * */
  onDialogClosed = () => {
    // Just setting the error to null
    this.setState({error: null});
  };

  /**
   * Sends the search request for parks. It will
   * asynchronously call the parse response method
   * when data is ready.
   *
   * @param[in] params The search parameters
   * */
  searchParks = (params) => {
    this.setState({searching: true});
    // Adds the destination to the params
    params.destination = this.state.destination;
    this._sendRequest(params);
  };

  /**
   * Sends a request to the endpoint in order to obtain park lots.
   * @param[in] params The search parameters
   * */
  _sendRequest(params) {
    axios.post(App.configuration.measurementsEndpoint, {
      lat: this.state.destination.lat,
      lon: this.state.destination.lng,
      maxDistance: params.distance,
      dow: params.dow,
      hour: params.time.h,
      minute: params.time.m,
      walkWeight: 1 - params.walkWeight / 100
    }).then((response) => {
          this._parseMeasurementResponse(response.data);
        }, (error) => {
          this._showMessageDialog(error.message, MessageDialog.TYPE_ERROR);
        }
    ).finally(() => {
      // In any case, the search is over
      this.setState({searching: false});
    })
  };

  /**
   * Gets the data for a park.
   * @param[in] data The data for the parking sent by the server
   * @return Object The object with parking information
   * */
  _getParkData(elem) {
    return {
      id: elem.parkAgent.id,
      start: {
        lat: elem.parkAgent.line.coordinates[0][1],
        lng: elem.parkAgent.line.coordinates[0][0]
      },
      end: {
        lat: elem.parkAgent.line.coordinates[1][1],
        lng: elem.parkAgent.line.coordinates[1][0]
      },
      streetType: elem.parkAgent.highway,
      number: elem.parkAgent.parkingSpaceNumber,
      haveMes: elem.parkAgent.haveMes,
      distance: elem.distance,
      occupancy: elem.meanOccRate,
    };
  };

  /**
   * Sends a request to load all parking lots.
   * */
  _loadAllParks = () => {
    axios.get(App.configuration.allParksEndpoint)
        .then((response) => {
              this._parseAvailableParkResponse(response.data);
            },
            (error) => {
              // Error in the request: showing an error message
              this._showMessageDialog(error.message, MessageDialog.TYPE_ERROR);
            });
  };

  /**
   * Parse the available park data response.
   * @param[in] data Available park data
   * */
  _parseAvailableParkResponse = (data) => {
    let parks = [];
    data.forEach((elem) => {
      parks.push({
        id: elem.id,
        start: {
          lat: elem.line.coordinates[0][1],
          lng: elem.line.coordinates[0][0]
        },
        end: {
          lat: elem.line.coordinates[1][1],
          lng: elem.line.coordinates[1][0]
        }
      });
    });
    this.setState({availableParks: parks});
  };

  /**
   * Parses the measurements endpoint response.
   * @param[in] data The response's data
   * */
  _parseMeasurementResponse = (data) => {
    let parks = [];
    data.forEach((elem) => {
      parks.push(this._getParkData(elem));
    });
    if(parks.length === 0) {
      // No parks found: showing an error message
      this._showMessageDialog(App.parksNotFoundMessage, MessageDialog.TYPE_MESSAGE);
    } else {
      // Updating parks
      this.setState({
        parks: parks,
        searchVisible: false
      });
    }
  };

  /**
   * Shows a dialog window in the UI.
   * @param[in] message The message that has to be displayed
   * @param[in] type Type of the dialog
   * */
  _showMessageDialog = (message, type = MessageDialog.TYPE_ERROR) => {
    this.setState({
      error: {
        message: message,
        type: type
      }
    });
  };

}

export default App;
