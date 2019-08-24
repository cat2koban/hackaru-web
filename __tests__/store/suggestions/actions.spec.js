import { actions } from '@/store/suggestions';

describe('Actions', () => {
  describe('when dispatch fetch', () => {
    const commit = jest.fn();
    const dispatch = jest.fn(() => ({ data: {} }));

    beforeEach(() => {
      actions.fetch({ commit, dispatch }, 'query');
    });

    it('dispatch auth-api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/suggestions',
          params: {
            q: 'query',
            limit: 6
          }
        },
        { root: true }
      );
    });

    it('commit SET_SUGGESTIONS', () => {
      expect(commit).toHaveBeenCalledWith('SET_SUGGESTIONS', {});
    });
  });
});