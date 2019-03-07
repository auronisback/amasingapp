import React, {Component} from 'react';

const NO_RESULTS = 'Server returned status code ZERO_RESULTS';

export class MessageDialog extends Component {

  /**
   * Constants for error types.
   * */
  static TYPE_MESSAGE = 'info';
  static TYPE_WARNING = 'warning';
  static TYPE_ERROR = 'danger';

  /**
   * Renderizes the component.
   * @return The React Component
   * */
  render() {
    let message = this.getMessage();
    const typeClass = 'alert-' + this.props.type;
    return (
        <div className={'alert ' + typeClass + ' ErrorDialog'}
             onClick={this.props.onClose}
        >
          <h4 className={'alert-heading'}>Warning!</h4>
          <p>{message}</p>
          <span className={'CloseError'}>Click to close</span>
        </div>
    );
  }

  /**
   * Gets the error message from component's properties.
   * @return string The error message in human readable form
   * */
  getMessage = () => {
    switch(this.props.message) {
      case NO_RESULTS:
        return 'The search produced no results.';
      default:
        return this.props.message;
    }
  };

}