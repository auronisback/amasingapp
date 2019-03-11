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
});