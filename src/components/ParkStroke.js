import React, {Component} from 'react';
import {Polyline} from "react-google-maps";

/**
 * Component used to manage park strokes.
 * */
export default class ParkStroke extends Component {

  /**
   * Renders the component.
   * @return The React Component rendered
   * */
  render() {
    return (
        <Polyline
            path={[this.props.start, this.props.end]}
            options={{
              strokeColor: this.props.color,
              strokeOpacity: this.props.opacity
            }}
        />
    );
  }
}