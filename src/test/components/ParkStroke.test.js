import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ParkStroke from "../../components/ParkStroke";

Enzyme.configure({adapter: new Adapter()});

describe('<ParkStroke>', () => {
  it('Should render without crashing', () => {
    const stubPath = [{lat: 1, lng: 1}, {lat: 2, lng: 2}];
    const stubColor = '#FFF';
    const stubOpacity = 0.5;
    const stroke = shallow(<ParkStroke
        path={stubPath}
        color={stubColor}
        opacity={stubOpacity}
    />);
    expect(stroke).toMatchSnapshot();
  });
});