import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AvailableParkList from "../../components/AvailableParkList";

Enzyme.configure({adapter: new Adapter()});

describe('<AvailabelParkList>', () => {
  it('Should be empty when no park has been given', () => {
    const list = shallow(<AvailableParkList/>);
    expect(list).toMatchSnapshot();
  });

  it('Should show park lots when given', () => {
    const parks = [
      {
        id: 1,
        start: {lat: 1, lng: 10},
        end: {lat: 100, lng: 1000}
      },
      {
        id: 2,
        start: {lat: 2, lng: 20},
        end: {lat: 200, lng: 2000}
      }
    ];
    const list = shallow(<AvailableParkList parks={parks} />);
    expect(list).toMatchSnapshot();
  });
});