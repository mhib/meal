import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { createLineItem } from '../actions/api';
import bindAll from 'lodash/bindAll';
const INITIAL_STATE = {
  name: '',
  cost: 0.00
};
export default class LineItemForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    bindAll(this, ['handleNameChange', 'handleSubmit', 'handleCostChange']);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value.trim() });
  }

  handleCostChange(e) {
    this.setState({ cost: e.target.value });
  }


  handleSubmit(e) {
    e.preventDefault();
    createLineItem(this.state, this.props.order.id);
    this.setState(INITIAL_STATE);
    ReactDOM.findDOMNode(this.refs.nameInput).value = '';
  }

  render() {
    return(
      <div>
        <h2>Create new order</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <FormControl
            type="text"
            name="name"
            required="true"
            maxLength="255"
            onChange={this.handleNameChange}
            placeholder="name"
            ref="nameInput" />
          </FormGroup>
          <FormGroup>
            <FormControl
            type="number"
            name="cost"
            required="true"
            min="0"
            step="any"
            value={this.state.cost}
            onChange={this.handleCostChange}
            placeholder="Cost"
            ref="costInput" />
          </FormGroup>
          <Button bsStyle="primary" type="submit" disabled={!(this.state.name && this.state.cost)}>
            Create order
          </Button>
        </form>
      </div>
    )
  }
}
