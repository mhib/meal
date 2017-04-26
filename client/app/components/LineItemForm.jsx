import React from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import bindAll from 'lodash/bindAll';
import PropTypes from 'prop-types';
import { createLineItem } from '../actions/api';

const INITIAL_STATE = {
  name: '',
  cost: 0.00
};

export default class LineItemForm extends React.Component {
  static propTypes = {
    order: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    bindAll(this, ['handleNameChange', 'handleSubmit', 'handleCostChange']);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value.trim() });
  }

  handleCostChange(e) {
    this.setState({ cost: (+e.target.value).toFixed(2) });
  }


  handleSubmit(e) {
    e.preventDefault();
    createLineItem(this.state, this.props.order.id);
    this.form.reset();
    this.setState(INITIAL_STATE);
  }

  render() {
    return (
      <div>
        <h2>Create new order</h2>
        <form onSubmit={this.handleSubmit} ref={(node) => this.form = node}>
          <FormGroup>
            <FormControl
            type="text"
            name="name"
            required="true"
            maxLength="255"
            onChange={this.handleNameChange}
            placeholder="name" />
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
            placeholder="Cost" />
          </FormGroup>
          <Button bsStyle="primary" type="submit" disabled={!(this.state.name && this.state.cost)}>
            Create order
          </Button>
        </form>
      </div>
    );
  }
}
