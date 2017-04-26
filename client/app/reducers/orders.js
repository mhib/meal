import cloneDeep from 'lodash/cloneDeep';

const defaultState = [];

const addLineItem = (state, action) => {
  const newState = cloneDeep(state);
  const order = newState.find((elem) => +elem.id === +action.lineItem.order_id);
  order.attributes['line-items'].push(action.lineItem);
  return newState;
};

const orders = (state = defaultState, action) => {
  switch (action.type) {
    case 'CREATED_ORDER':
      return [action.order].concat(state);
    case 'CREATED_LINE_ITEM':
      return addLineItem(state, action);
    default:
      return state;
  }
};

export default orders;
