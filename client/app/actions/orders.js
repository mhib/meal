export const createOrder = (order) => {
  return {
    type: 'CREATED_ORDER',
    order: order
  }
}

export const createLineItem = (lineItem) => {
  return {
    type: 'CREATED_LINE_ITEM',
    lineItem: lineItem
  }
}
