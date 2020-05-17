import React, {Component} from 'react';
import Geocode from 'react-geocode';
import axios from 'axios';

import './components/custom.scss';
import {TopBar} from './components/TopBar';
import {MapPanel} from './components/MapPanel';
import {DestinationMarker} from './components/DestinationMarker';
import {MessageDialog} from './components/MessageDialog';
import AvailableParkList from "./components/AvailableParkList";
import SuggestedParkList from "./components/SuggestedParkList";

/**
 * Constant for the San Francisco City center.
 * */
const SF_CENTER = {
  lat: 37.773972,
  lng: -122.431297
};

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
    gMapsApiPrefix: 'T4m_9QA5arCySazIA',
    defaultMapCenter: SF_CENTER,
    mapZoom: 13,
    measurementsEndpoint: 'http://18.184.94.248:9090/measurements',
    allParksEndpoint: 'http://18.184.94.248:9090/getParks',
    gMapsApiSuffix: 'E2csRyNvQIoKRBIVi-kRQU',
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
   * @param {Object} props React Component's properties
   * */
  constructor(props) {
    super(props);
    // Initializing the AjaxWrapper

    // Initializing the Geocoder
    Geocode.setApiKey(App.getAPIKey());
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
              gMapsApiKey={App.getAPIKey()}
              center={this.state.destination ? this.state.destination : App.configuration.defaultMapCenter}
              zoom={this.state.destination ? App.configuration.destinationMapZoom : App.configuration.mapZoom}
              onDestinationSelection={this.setDestination}
          >
            <AvailableParkList parks={this.state.availableParks}/>
            <DestinationMarker
                destination={this.state.destination}
                searchVisible={this.state.searchVisible}
                onSearch={this.searchParks}
                onSearchClosed={this.onSearchWindowClosed}
                onMarkerClick={this.onDestinationClick}
                isLoading={this.state.searching}
            />
            <SuggestedParkList parks={this.state.parks}/>
          </MapPanel>
          {dialog}
        </div>
    );
  }

  /**
   * Handles the click on the destination marker.
   * */
  onDestinationClick = () => {
    this.setState({searchVisible: true});
  };

  /**
   * Handles the closing of the search window.
   * */
  onSearchWindowClosed = () => {
    this.setState({searchVisible: false});
  };

  /**
   * Sets the destination, if none has been set already.
   *
   * @param {number} lat The destination latitude
   * @param {number} lng The destination longitude
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
   * @param {number} params The search parameters
   * @return Promise The promise that has to be fulfilled
   * */
  searchParks = (params) => {
    this.setState({parks: [], searching: true});
    return this._sendRequest(params);
  };

  /**
   * Sends a request to the endpoint in order to obtain park lots.
   * @param {object} params The search parameters
   * @return Promise The async function
   * */
  _sendRequest(params) {
    console.log("Ehy, I changed something");
    return axios.post(App.configuration.measurementsEndpoint, {
      lat: this.state.destination.lat,
      lon: this.state.destination.lng,
      maxDistance: params.distance,
      dow: params.dow,
      hour: params.time.h,
      minute: params.time.m,
      walkWeight: 1 - params.walkWeight / 100
    }).then((response) => {
      this._parseMeasurementResponse(response.data);
      this.setState({searching: false});
    }).catch((error) => {
      this._showMessageDialog(error.message, MessageDialog.TYPE_ERROR);
      this.setState({searching: false});
    });
  };

  /**
   * Gets the data for a park.
   * @param {number} elem The data for the parking sent by the server
   * @return Object The object with parking information
   * */
  static _getParkData(elem) {
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
   * @param {Object} data Available park data
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
   * @param {Object} data The response's data
   * */
  _parseMeasurementResponse = (data) => {
    let parks = [];
    data.forEach((elem) => {
      parks.push(App._getParkData(elem));
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
   * @param {string} message The message that has to be displayed
   * @param {int} type Type of the dialog
   * */
  _showMessageDialog = (message, type = MessageDialog.TYPE_ERROR) => {
    this.setState({
      error: {
        message: message,
        type: type
      }
    });
  };

  /**
   * Gets the API key.
   * @returns {string} The Google Maps API key.
   * */
  static getAPIKey() {
    return App.configuration.gMapsApiPrefix.split('').reverse().join('') +
        App.configuration.gMapsApiSuffix.split('').reverse().join('');
  };

}

export default App;
