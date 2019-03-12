import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SuggestedParkList from "../../components/SuggestedParkList";

Enzyme.configure({adapter: new Adapter()});

describe('<SuggestedParkList>', () => {
  it('Should be empty when no suggested park has been given', () => {
    const list = shallow(<SuggestedParkList/>);
    expect(list).toMatchSnapshot();
  });

  it('Should show park lots when given', () => {
    const stubParks = [
      {
        id: 1,
        occupancy: 0.12,
        distance: 100,
        parkNumber: 6,
        streetType: 'primary',
        haveMes: false,
        start: {lat: 1, lng: 1},
        end: {lat: 2, lng: 2},
        label: 1
      }, {
        id: 2,
        occupancy: 0.22,
        distance: 105,
        parkNumber: 14,
        streetType: 'secondary',
        haveMes: true,
        start: {lat: 10, lng: 10},
        end: {lat: 20, lng: 20},
        label: 2
      }
    ];
    const list = shallow(<SuggestedParkList parks={stubParks}/>);
    expect(list).toMatchSnapshot();
  });
});