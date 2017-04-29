import clone from 'lodash/clone';

const DEFAULT_STATE = [];

const addLineItem = (state, action) => {
  const newState = clone(state);
  const order = newState.find((elem) => elem.id === action.lineItem.order_id);
  order.line_items.push(action.lineItem);
  return newState;
};

const STATUS_TO_NUMBER = {
  open: 0,
  finalized: 1,
  ordered: 2,
  delivered: 3
};
const sortCmp = (l, r) => (
  l.status === r.status ? r.id - l.id
                        : STATUS_TO_NUMBER[l.status] - STATUS_TO_NUMBER[r.status]
);
const changeOrderStatus = (state, action) => {
  const newState = clone(state);
  const order = newState.find((elem) => elem.id === action.order.id);
  order.status = action.order.status;
  newState.sort(sortCmp);
  return newState;
};

const orders = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'CREATED_ORDER':
      return [action.order].concat(state);
    case 'CREATED_LINE_ITEM':
      return addLineItem(state, action);
    case 'CHANGED_ORDER_STATUS':
      return changeOrderStatus(state, action);
    default:
      return state;
  }
};

export default orders;
