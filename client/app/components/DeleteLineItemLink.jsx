import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import { deleteLineItem } from '../actions/api';
import { LineItemShape } from './shapes';
import './DeleteLineItemLink.scss';

export default class DeleteLineItemLink extends React.Component {
  static propTypes = {
    lineItem: LineItemShape.isRequired
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    deleteLineItem(this.props.lineItem);
  }

  render() {
    return (
      <a className="delete-line-item-link"
         onClick={this.handleClick}
         href="#">
        <Glyphicon glyph="remove" />
      </a>
    );
  }
}
