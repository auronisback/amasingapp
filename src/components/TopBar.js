import React, {Component} from 'react';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faUndo} from "@fortawesome/free-solid-svg-icons";


export class TopBar extends Component {

  /**
   * Component's state.
   * */
  state = {
    streetName: ''
  };

  constructor(props) {
    super(props);
    // Initializing font-awesome icons
    library.add(faSearch, faUndo);
  }

  render() {
    return (
        <header className={'container fluid TopBar'}>
          <div className={'row'}>
            <div className={'col-6'}>
              <h1>aMasIngApp</h1>
            </div>
            <div className={'col-6'}>
              <ul>
                <li>
                  <button className={'btn btn-primary ResetButton'}
                          onClick={this.props.onReset}>
                    <FontAwesomeIcon icon={'undo'} />
                  </button>
                </li>
                <li>
                  <div className={'input-group'}>
                    <input type={'text'} className={'form-control'} placeholder={'Search by street'}
                           onChange={this.onSearchInputChanged}
                           value={this.state.streetName}
                           onKeyPress={this.onInputKeyPressed}
                    />
                    <button className={'input-group-append btn btn-primary SearchButton'}
                            onClick={this.onSearch}
                    >
                      <FontAwesomeIcon icon={"search"}/>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </header>
    );
  }

  /**
   * Action to be performed when the search button is pressed. The action
   * will be performed if the input has at least two characters.
   * */
  onSearch = () => {
    if (this.props.onSearch && this.state.streetName.length > 2)
      this.props.onSearch(this.state.streetName); // Taken from component's state
  };

  /**
   * Handler for changing the street name input.
   * @param {Event} evt The generated event
   * */
  onSearchInputChanged = (evt) => {
    this.setState({streetName: evt.target.value});
  };

  /**
   * Handler for the pressure of a key in the input. If the pressed key
   * is ENTER, then it will fire the search.
   * @param {Event} evt The generated event
   * */
  onInputKeyPressed = (evt) => {
    if(evt.key === 'Enter')
      this.onSearch();
  };
}