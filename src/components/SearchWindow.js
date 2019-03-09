import React, {Component} from 'react';
import Slider from 'rc-slider';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWalking, faBlind, faSpinner} from "@fortawesome/free-solid-svg-icons";
import 'rc-slider/assets/index.css';

export class SearchWindow extends Component {

  /**
   * Creates the object, initializing icons.
   * @param {Object} props React component's properties
   * */
  constructor(props) {
    super(props);
    library.add(faWalking, faBlind, faSpinner);
  }

  /**
   * Renders the object.
   * @return Component The React component
   * */
  render() {
    // Rendering component
    return (
        <form onSubmit={this.onFormSubmitted}>
          <div className={'SearchPanel form-group'}>
            <select className={'form-control'}
                    value={this.props.dow}
                    onChange={this.onDowChanged}
            >
              <option value={0}>Sunday</option>
              <option value={1}>Monday</option>
              <option value={2}>Tuesday</option>
              <option value={3}>Wednesday</option>
              <option value={4}>Thursday</option>
              <option value={5}>Friday</option>
              <option value={6}>Saturday</option>
            </select>
            <input type={'time'} className={'form-control'}
                   value={this.props.time.h + ':' +
                   ('' + this.props.time.m).padStart(2, '0')}
                   onChange={this.onTimeChanged}
            />
            <input type={'number'} placeholder={'distance (m)'} className={'form-control'}
                   value={this.props.distance === 0 ? '' : this.props.distance}
                   onChange={this.onDistanceChanged}
                   min={0}
                   step={50}
            />
            <div className={'WalkingSlider'}>
              <div className={'IconWrapper'}>
                <FontAwesomeIcon icon={"blind"}/>
              </div>
              <Slider className={'Slider'}
                      onChange={this.onSliderChanged}
                      value={this.props.walkWeight}
              />
              <div className={'IconWrapper'}>
                <FontAwesomeIcon icon={"walking"}/>
              </div>
            </div>
            <button className={'btn btn-primary btn-sm'}
                    disabled={this.props.isLoading}
            >
              {this.props.isLoading ? (<FontAwesomeIcon icon={'spinner'} pulse/>) : 'Search'}
            </button>
          </div>
        </form>
    );
  }

  /**
   * Handler method for the change on dow.
   *
   * @param {Event} evt The generated event
   * */
  onDowChanged = (evt) => {
    this.setState({dow: evt.target.value});
  };

  /**
   * Handler method for the change on time.
   *
   * @param {Event} evt The generated event
   * */
  onTimeChanged = (evt) => {
    const time = SearchWindow.getTimeFromString(evt.target.value);
    // Calling the handler function
    this.props.onTimeChanged({
        h: time.getHours(),
        m: time.getMinutes()
    });
  };

  /**
   * Handler function for changing in the distance input.
   *
   * @param {Event} evt The generated event
   * */
  onDistanceChanged = (evt) => {
    this.props.onDistanceChanged(evt.target.value);
  };

  /**
   * Handler for slider changing.
   *
   * @param {number} value Slider value
   * */
  onSliderChanged = (value) => {
    this.props.onWalkWeightChanged(value);
  };

  /**
   * Handler function for submitting the form.
   *
   * @param {Event} evt The generated event
   * */
  onFormSubmitted = (evt) => {
    evt.nativeEvent.preventDefault(); // Do not actually submit
    if(this.props.onSubmit)
      this.props.onSubmit()
  };

  /**
   * Static utility function to retrieve Date object from
   * time inputs.
   *
   * @param {Object} time The time input as a string with format 'HH:mm'
   * */
  static getTimeFromString(time) {
    let pieces = time.split(':');
    time = new Date();
    time.setHours(pieces[0]);
    time.setMinutes(pieces[1]);
    return time;
  };

}