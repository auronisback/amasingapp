import React, {Component} from 'react';
import ParkStroke from "./ParkStroke";

/**
 * Component managing the set of available parking lots.
 * */
export default class AvailableParkList extends Component {

  /**
   * Strokes appearance.
   * */
  static STROKE_COLOR = '#777';
  static STROKE_OPACITY = 0.5;

  /**
   * Renders the component.
   * @return The react component
   * */
  render() {
    return (
        <div>
          {this._buildAvailableParks()}
        </div>
    );
  }

  /**
   * Creates elements for the available parking lots.
   * */
  _buildAvailableParks = () => {
    let availableParks = [];
    if(this.props.parks)
      this.props.parks.forEach((elem) => {
        availableParks.push(
            <ParkStroke
                key={elem.id}
                start={elem.start}
                end={elem.end}
                color={AvailableParkList.STROKE_COLOR}
                opacity={AvailableParkList.STROKE_OPACITY}
            />);
      });
    return availableParks;
  }
}