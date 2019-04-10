import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {shallow} from 'enzyme';
import App from '../App';

// Configuring adapter
Enzyme.configure({adapter: new Adapter()});

describe('<App>', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Should show the marker if a destination is clicked', () => {
    const app = shallow(<App />).instance();
    app.onDestinationClick();
    expect(app).toMatchSnapshot();
  });

  it('Should close the search window', () => {
    const app = shallow(<App />).instance();
    app.onSearchWindowClosed();
    expect(app).toMatchSnapshot();
  });

  it('Should set or unset the destination', () => {
    const app = shallow(<App />).instance();
    app.setDestination({lat: 12, lng: 13});
    expect(app).toMatchSnapshot();
    app.setDestination(null);
    expect(app).toMatchSnapshot();
  });
});
