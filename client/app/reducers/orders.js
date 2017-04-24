import cloneDeep from 'lodash/cloneDeep';
const defaultState = [];
const orders = (state = defaultState, action) => {
  switch (action.type) {
    case 'CREATED_ORDER':
      return [action.order].concat(state)
    case 'CREATED_LINE_ITEM':
      let newState = cloneDeep(state);
      let order = newState.find((elem) => +elem.id === +action.lineItem.attributes['order-id'])
      order.relationships['line-items'].data.push(action.lineItem);
      return newState;
    default:
      return state
  }
}

export default orders;
