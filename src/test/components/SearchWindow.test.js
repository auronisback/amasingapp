import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SearchWindow } from "../../components/SearchWindow";

Enzyme.configure({adapter: new Adapter()});

describe('<SearchWindow>', () => {
  const stubTime = {h: 15, m: 55};

  it('Renders without crashing', () => {
    const searchWindow = shallow(<SearchWindow
        time={stubTime}
    />);
    expect(searchWindow).toMatchSnapshot();
  });

  it('Calls the update handler for changing dow', () => {
    const changeFn = jest.fn((dow) => {});
    const searchWindow = shallow(<SearchWindow
        time={stubTime}
        onDowChanged={changeFn}
    />);
    const dowSelect = searchWindow.find('select');
    expect(dowSelect).toHaveLength(1);
    dowSelect.simulate('change', {target: {value: 2}});
    expect(changeFn).toBeCalledWith(2);
  });

  it('Calls the update handler for changing time', () => {
    const changeFn = jest.fn((time) => {});
    const searchWindow = shallow(<SearchWindow
        time={stubTime}
        onTimeChanged={changeFn}
    />);
    const timeInput = searchWindow.find('input.TimeInput');
    expect(timeInput).toHaveLength(1);
    timeInput.simulate('change', {target: {value: '21:21' }});
    expect(changeFn).toBeCalledWith({h: 21, m: 21});
  });

  it('Calls the update handler for changing distance', () => {
    const changeFn = jest.fn((distance) => {});
    const searchWindow = shallow(<SearchWindow
        time={stubTime}
        onDistanceChanged={changeFn}
    />);
    const distanceInput = searchWindow.find('input.DistanceInput');
    expect(distanceInput).toHaveLength(1);
    distanceInput.simulate('change', {target: {value: 1000}});
    expect(changeFn).toBeCalledWith(1000);
  });

  it('Calls the update handler for changing walking weight', () => {
    const changeFn = jest.fn((walkWeight) => {});
    const searchWindow = shallow(<SearchWindow
        time={stubTime}
        onWalkWeightChanged={changeFn}
    />);
    const walkWeightSlider = searchWindow.find('.Slider');
    expect(walkWeightSlider).toHaveLength(1);
    walkWeightSlider.simulate('change', 70);
    expect(changeFn).toBeCalledWith(70);
  });

  it('Calls the submit handler function', () => {
    const submitFn = jest.fn(() => {});
    const searchWindow = shallow(<SearchWindow
        onSubmit={submitFn}
        time={stubTime}
    />);
    searchWindow.simulate('submit', {nativeEvent: {preventDefault: () => {}}});
    expect(submitFn).toBeCalled();
  });
});