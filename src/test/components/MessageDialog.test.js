import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MessageDialog } from "../../components/MessageDialog";

Enzyme.configure({adapter: new Adapter()});

describe('<MessageDialog>', () => {
  it('Should render a message', () => {
    const message = 'Test message';
    const dialog = shallow(<MessageDialog
        message={message}
        type={MessageDialog.TYPE_MESSAGE}
    />);
    expect(dialog).toMatchSnapshot();
  });

  it('Should render a warning', () => {
    const message = 'Test warning';
    const dialog = shallow(<MessageDialog
        message={message}
        type={MessageDialog.TYPE_WARNING}
    />);
    expect(dialog).toMatchSnapshot();
  });

  it('Should render an error', () => {
    const message = 'Test error';
    const dialog = shallow(<MessageDialog
        message={message}
        type={MessageDialog.TYPE_ERROR}
    />);
    expect(dialog).toMatchSnapshot();
  });

  it('Should call the close handler function when clicked', () => {
    const message = 'Test closing';
    const closeFn = jest.fn(() => {});
    const dialog = shallow(<MessageDialog
        message={message}
        type={MessageDialog.TYPE_ERROR}
        onClose={closeFn}
    />);
    dialog.simulate('click');
    expect(closeFn).toBeCalled();
  });
});