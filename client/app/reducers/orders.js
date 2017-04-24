const defaultState = [];
const orders = (state = defaultState, action) => {
  switch (action.type) {
    case 'CREATED_ORDER':
      return [action.order].concat(state)
    default:
      return state
  }
}

export default orders;
