import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {shallow, mount} from 'enzyme';
import App from '../App';
import {MessageDialog} from '../components/MessageDialog';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Configuring adapter
Enzyme.configure({adapter: new Adapter()});

describe('<App>', () => {

  it('Should show the marker if a destination is clicked', () => {
    const app = shallow(<App/>).instance();
    app.onDestinationClick();
    expect(app).toMatchSnapshot();
  });

  it('Should reset marker and destination on demand', () => {
    const app = shallow(<App/>).instance();
    app.reset();
    expect(app).toMatchSnapshot();
  });

  it('Should close the search window', () => {
    const app = shallow(<App/>).instance();
    app.onSearchWindowClosed();
    expect(app).toMatchSnapshot();
  });

  it('Should set or unset the destination', () => {
    const app = shallow(<App/>).instance();
    app.setDestination({lat: 12, lng: 13});
    expect(app).toMatchSnapshot();
    app.setDestination(null);
    expect(app).toMatchSnapshot();
  });

  it('Should show a message dialog', () => {
    const app = shallow(<App/>).instance();
    app._showMessageDialog('Test Message', MessageDialog.TYPE_MESSAGE);
    expect(app).toMatchSnapshot();
    app.onDialogClosed();
    expect(app).toMatchSnapshot();
    app._showMessageDialog('Test Error Message');
    expect(app).toMatchSnapshot();
  });

  it('Should search by street name', () => {
    const app = shallow(<App/>).instance();
    app.searchStreetByName('1st Street');
    expect(app).toMatchSnapshot();
  });

  it('Should show available parkings', () => {
    const app = shallow(<App />).instance();
    const response = [
      {
        "line": {
          "type": "LineString",
          "coordinates": [
            [
              -122.4319472943,
              37.7798782941
            ],
            [
              -122.4320478777,
              37.7803731644
            ]
          ]
        },
        "haveMes": 0,
        "highway": "residential",
        "parkingSpaceNumber": 8,
        "id": 415112
      },
      {
        "line": {
          "type": "LineString",
          "coordinates": [
            [
              -122.4322279219,
              37.7805954536
            ],
            [
              -122.432372762,
              37.7813095957
            ]
          ]
        },
        "haveMes": 0,
        "highway": "residential",
        "parkingSpaceNumber": 13,
        "id": 415121
      },
      {
        "line": {
          "type": "LineString",
          "coordinates": [
            [
              -122.4324572521,
              37.7817290284
            ],
            [
              -122.4325779521,
              37.7823224703
            ]
          ]
        },
        "haveMes": 0,
        "highway": "residential",
        "parkingSpaceNumber": 10,
        "id": 415131
      },
      {
        "line": {
          "type": "LineString",
          "coordinates": [
            [
              -122.4323254878,
              37.7817471334
            ],
            [
              -122.432427077,
              37.7822510561
            ]
          ]
        },
        "haveMes": 0,
        "highway": "residential",
        "parkingSpaceNumber": 6,
        "id": 415132
      },
      {
        "line": {
          "type": "LineString",
          "coordinates": [
            [
              -122.4330436532,
              37.785290686
            ],
            [
              -122.4331291491,
              37.7857151479
            ]
          ]
        },
        "haveMes": 0,
        "highway": "tertiary",
        "parkingSpaceNumber": 7,
        "id": 415172
      },
      {
        "line": {
          "type": "LineString",
          "coordinates": [
            [
              -122.4332428083,
              37.7862804265
            ],
            [
              -122.433371555,
              37.786919131
            ]
          ]
        },
        "haveMes": 0,
        "highway": "tertiary",
        "parkingSpaceNumber": 11,
        "id": 415182
      },
      {
        "line": {
          "type": "LineString",
          "coordinates": [
            [
              -122.4337376785,
              37.7880617582
            ],
            [
              -122.4338774894,
              37.7887557835
            ]
          ]
        },
        "haveMes": 0,
        "highway": "tertiary",
        "parkingSpaceNumber": 10,
        "id": 415201
      },
      {
        "line": {
          "type": "LineString",
          "coordinates": [
            [
              -122.4342939046,
              37.7908237779
            ],
            [
              -122.4344166164,
              37.7914313015
            ]
          ]
        },
        "haveMes": 0,
        "highway": "tertiary",
        "parkingSpaceNumber": 7,
        "id": 415231
      },
      {
        "line": {
          "type": "LineString",
          "coordinates": [
            [
              -122.4358227721,
              37.7990716154
            ],
            [
              -122.4358801046,
              37.7993562663
            ]
          ]
        },
        "haveMes": 0,
        "highway": "tertiary",
        "parkingSpaceNumber": 5,
        "id": 415322
      },
      {
        "line": {
          "type": "LineString",
          "coordinates": [
            [
              -122.3968769033,
              37.7855286539
            ],
            [
              -122.3978123114,
              37.7847887749
            ]
          ]
        },
        "haveMes": 0,
        "highway": "primary",
        "parkingSpaceNumber": 10,
        "id": 418062
      }
    ];
    app._parseAvailableParkResponse(response);
    expect(app).toMatchSnapshot();
  });

  it('Should display parkings when searched', () => {
    const app = shallow(<App/>).instance();
    const parkResponse = [
      {
        "parkAgent": {
          "line": {
            "type": "LineString",
            "coordinates": [
              [
                -122.3968769033,
                37.7855286539
              ],
              [
                -122.3978123114,
                37.7847887749
              ]
            ]
          },
          "haveMes": 0,
          "highway": "primary",
          "parkingSpaceNumber": 10,
          "id": 418062
        },
        "distance": 172.11040982285127,
        "meanOccRate": 0.5441332389978301
      },
      {
        "parkAgent": {
          "line": {
            "type": "LineString",
            "coordinates": [
              [
                -122.400417421,
                37.7872912895
              ],
              [
                -122.3991661637,
                37.7862874673
              ]
            ]
          },
          "haveMes": 1,
          "highway": "secondary",
          "parkingSpaceNumber": 9,
          "id": 582012
        },
        "distance": 164.2239301886187,
        "meanOccRate": 0.6283333333333334
      },
      {
        "parkAgent": {
          "line": {
            "type": "LineString",
            "coordinates": [
              [
                -122.3988905653,
                37.7836310601
              ],
              [
                -122.3976191913,
                37.7826131563
              ]
            ]
          },
          "haveMes": 1,
          "highway": "primary",
          "parkingSpaceNumber": 24,
          "id": 203032
        },
        "distance": 159.01291189194936,
        "meanOccRate": 0.6691666666666667
      }
    ];
    app._parseMeasurementResponse(parkResponse);
    expect(app).toMatchSnapshot();
  });

  it('Should show a message if no suggested parking has been found', () => {
    const app = shallow(<App />).instance();
    app._parseMeasurementResponse([]);
    expect(app).toMatchSnapshot();
  });
});
