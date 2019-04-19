import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {MapPanel} from "../../components/MapPanel";

Enzyme.configure({adapter: new Adapter()});

describe('<MapPanel>', () => {
  it('Should render without crashing', () => {
    const panel = shallow(<MapPanel/>);
    expect(panel).toMatchSnapshot();
  });

  it('Shouldn\'t do anithing if no callback is set', () => {
    const panel = shallow(<MapPanel />).instance();
    const evt = {latLng: {lat: () => 100, lng: () => 100}};
    panel.onMapClick(evt);
  });

  it('Should call back the destination function when clicked', () => {
    const mockFn = jest.fn((lat, lng) => {});
    const panel = shallow(<MapPanel onDestinationSelection={mockFn}/>).instance();
    const evt = {latLng: {lat: () => 100, lng: () => 100}};
    panel.onMapClick(evt);
    expect(mockFn).toBeCalledWith(evt.latLng.lat(), evt.latLng.lng());
  });
});