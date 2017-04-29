export const createOrder = (order) => (
  {
    type: 'CREATED_ORDER',
    order
  }
);

export const changeOrderStatus = (order) => (
  {
    type: 'CHANGED_ORDER_STATUS',
    order
  }
);

export const createLineItem = (lineItem) => (
  {
    type: 'CREATED_LINE_ITEM',
    lineItem
  }
);
