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

  it('Should show the marker if the position has been set', () => {
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
    const marker = shallow(<ParkMarker parking={stubPark} />);
    expect(marker).toMatchSnapshot();
  });

  it('Should toggle the info window appearance', () => {
    const wrapper = shallow(<ParkMarker/>);
    const marker = wrapper.instance();
    marker.toggleOpen();
    expect(wrapper).toMatchSnapshot();
  });

  it('Should close the window', () => {
    const wrapper = shallow(<ParkMarker/>);
    const marker = wrapper.instance();
    marker.handleClose();
    expect(wrapper).toMatchSnapshot();
  });
});