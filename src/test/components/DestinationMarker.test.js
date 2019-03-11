import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DestinationMarker } from "../../components/DestinationMarker";

Enzyme.configure({adapter: new Adapter()});

describe('<DestinationMarker>', () => {
  it('Should show a marker if a destination is set', () => {
    const stubDestination = {lat: 0, lng: 0};
    const stubTime = {h: 15, m: 55};
    const destinationMarker = shallow(<DestinationMarker />);
    destinationMarker.setState({time: stubTime});
    expect(destinationMarker).toMatchSnapshot();
    expect(destinationMarker.find('Marker')).toHaveLength(0);
    destinationMarker.setProps({destination: stubDestination});
    expect(destinationMarker.find('Marker')).toHaveLength(1);
  });

  it('Should show the search window if it is visible', () => {
    const stubDestination = {lat: 0, lng: 0};
    const stubTime = {h: 15, m: 55};
    const destinationMarker = shallow(<DestinationMarker destination={stubDestination} />);
    // Setting a stub time
    destinationMarker.setState({time: stubTime});
    expect(destinationMarker).toMatchSnapshot();
    // Setting the search window as visible
    destinationMarker.setProps({searchVisible: true});
    expect(destinationMarker).toMatchSnapshot();
  });
});