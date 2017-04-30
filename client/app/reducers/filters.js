import clone from 'lodash/clone';
const DEFAULT_STATE = new Map(['open', 'finalized', 'ordered', 'delivered'].map((o) => (
  [o, true]
)));

const filters = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'TOGGLED_FILTER':
      return clone(state).set(action.filterName, !state.get(action.filterName));
    default:
      return state;
  }
};

export default filters;

