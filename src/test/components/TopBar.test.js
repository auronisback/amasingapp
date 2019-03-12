import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {shallow} from 'enzyme';
import {TopBar} from '../../components/TopBar.js';

// Configuring adapter
Enzyme.configure({adapter: new Adapter()});

/**
 * Top bar testings.
 * */
describe('<TopBar>', () => {
  it('Should call the search handler when searching a street', () => {
    // Mock search function
    const searchFn = jest.fn((streetname) => { });
    // Creating the top bar component
    const topBar = shallow(<TopBar
        onSearch={searchFn}
    />);
    expect(topBar).toMatchSnapshot();
    // Writing something in the input
    const streetInput = topBar.find('input');
    expect(streetInput).toHaveLength(1);
    streetInput.simulate('change', {target: {value: '1st st'}});
    // Clicking the button
    const searchButton = topBar.find('button.SearchButton');
    expect(searchButton).toHaveLength(1);
    searchButton.simulate('click');
    expect(searchFn).toBeCalledWith('1st st');
  });

  it('Should call the handler when reset button clicked', () => {
    // Mock reset function
    const resetFn = jest.fn(() => { });
    // Creating the component
    const topBar = shallow(<TopBar onReset={resetFn}/>);
    expect(topBar).toMatchSnapshot();
    // Clicking the reset button
    const resetButton = topBar.find('button.ResetButton');
    expect(resetButton).toHaveLength(1);
    resetButton.simulate('click');
    expect(resetFn).toBeCalled();
  });
});
