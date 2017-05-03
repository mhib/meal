import clone from 'lodash/clone';

export const STATUSES = ['open', 'finalized', 'ordered', 'delivered'];
export const DEFAULT_STATE = new Map(STATUSES.map((status) => (
  [status, true]
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

