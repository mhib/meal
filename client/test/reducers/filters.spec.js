import filters from 'app/reducers/filters';
import { DEFAULT_STATE } from 'app/reducers/filters';
import { expect } from 'chai';

describe('filters', () => {
  describe('TOGGLED_FILTER', () => {
    const initialState = DEFAULT_STATE;
    it('toggles filter', () => {
      const res = filters(initialState, { type: 'TOGGLED_FILTER', filterName: 'open' });
      expect(res.get('open')).to.eq(false);
      const res2 = filters(res, { type: 'TOGGLED_FILTER', filterName: 'open' });
      expect(res2.get('open')).to.eq(true);
    });
  });
});
