import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DestinationMarker } from "../../components/DestinationMarker";

Enzyme.configure({adapter: new Adapter()});

describe('<DestinationMarker>', () => {
  it('Should show a marker if a destination is set', () => {
    const stubDestination = {lat: 0, lng: 0};
    const stubTime = {h: 15, m: 55};
    const stubDow = 1;
    const destinationMarker = shallow(<DestinationMarker />);
    destinationMarker.setState({time: stubTime, dow: stubDow});
    expect(destinationMarker).toMatchSnapshot();
    expect(destinationMarker.find('Marker')).toHaveLength(0);
    destinationMarker.setProps({destination: stubDestination});
    expect(destinationMarker.find('Marker')).toHaveLength(1);
  });

  it('Should show the search window if it is visible', () => {
    const stubDestination = {lat: 0, lng: 0};
    const stubTime = {h: 15, m: 55};
    const stubDow = 1;
    const destinationMarker = shallow(<DestinationMarker destination={stubDestination} />);
    // Setting a stub time
    destinationMarker.setState({time: stubTime, dow: stubDow});
    expect(destinationMarker).toMatchSnapshot();
    // Setting the search window as visible
    destinationMarker.setProps({searchVisible: true});
    expect(destinationMarker).toMatchSnapshot();
  });

  it('Should update its state when changes occurs in search criteria', () => {
    const wrapper = shallow(<DestinationMarker/>);
    const marker = wrapper.instance();
    const dow = 3;
    const time = {h: 0, m: 0};
    const distance = 100;
    const noDistance = -10;
    const walkWeight = 50;
    marker.onDowUpdate(dow);
    expect(wrapper.state().dow).toEqual(dow);
    marker.onTimeUpdate(time);
    expect(wrapper.state().time).toEqual(time);
    marker.onDistanceUpdate(distance);
    expect(wrapper.state().distance).toEqual(distance);
    marker.onDistanceUpdate(noDistance);
    expect(wrapper.state().distance).toEqual(0);
    marker.onWalkWeightUpdate(walkWeight);
    expect(wrapper.state().walkWeight).toEqual(walkWeight);
  });

  it('Should submit data', () => {
    const mockFn = jest.fn((state) => { });
    const marker = shallow(<DestinationMarker onSearch={mockFn}/>);
    marker.instance().onSubmit();
    expect(mockFn).toBeCalled();
  });

  it('Should not submit data if no handler given', () => {
    const marker = shallow(<DestinationMarker/>).instance();
    const watched = jest.spyOn(marker, 'onSubmit');
    marker.onSubmit();
    expect(watched).toBeCalled();
  });

});