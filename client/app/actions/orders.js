export const createOrder = (order) => (
  {
    type: 'CREATED_ORDER',
    order
  }
);

export const createLineItem = (lineItem) => (
  {
    type: 'CREATED_LINE_ITEM',
    lineItem
  }
);
