export const createOrder = (order) => {
  return {
    type: 'CREATED_ORDER',
    order: order
  }
}
