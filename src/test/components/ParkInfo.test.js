import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ParkInfo from "../../components/ParkInfo";

Enzyme.configure({adapter: new Adapter()});

describe('<ParkInfo>', () => {
  it('Should render without crashing', () => {
    const parkInfo = shallow(<ParkInfo
        occRate={0.12}
        distance={321}
        parkNumber={6}
        streetType={"residential"}
        haveMes={true}
    />);
    expect(parkInfo).toMatchSnapshot();
  });
});