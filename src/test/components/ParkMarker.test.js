import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ParkMarker } from "../../components/ParkMarker";

Enzyme.configure({adapter: new Adapter()});

describe('<ParkMarker>', () => {
  it('Should not render if no park has been given', () => {
    const marker = shallow(<ParkMarker />);
    expect(marker).toMatchSnapshot();
  });

  it('Should render correctly if park has been passed', () => {
    const stubPark = {
      occupancy: 0.12,
      distance: 100,
      parkNumber: 6,
      streetType: 'tertiary',
      haveMes: false,
      start: {lat: 1, lng: 1},
      end: {lat: 2, lng: 2},
      label: 1
    };
    const marker = shallow(<ParkMarker park={stubPark} />);
    expect(marker).toMatchSnapshot();
  });
});