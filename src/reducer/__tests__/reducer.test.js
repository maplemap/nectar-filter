import {
    SET_APPLIED_FILTERS,
    REMOVE_APPLIED_FILTER_TYPE,
    REMOVE_APPLIED_FILTER_ITEM,
    CLEAR_APPLIED_FILTERS
} from '../constants';
import {reducer} from '../reducer';

describe('reducer', () => {
    it('should return `state`', () => {
        const state = {};

        expect(reducer(state)).toEqual(state);
    });

    describe('when action `type` is equal to `SET_APPLIED_FILTERS`', () => {
        it('should set `appliedFilters` by `filterType`', () => {
            const checkedFiltersIds = ['filter'];
            const filterType = 'filterType';
            const action = {
                type: SET_APPLIED_FILTERS,
                payload: {checkedFiltersIds, filterType}
            };

            expect(reducer({}, action)).toEqual({
                appliedFilters: {[filterType]: checkedFiltersIds}
            });
        });
    });

    describe('when action `type` is equal to `REMOVE_APPLIED_FILTER_TYPE`', () => {
        it('should remove key by `filterType` in `appliedFilters`', () => {
            const filterType = 'filterType';
            const state = {
                appliedFilters: {
                    [filterType]: ['filter'],
                    filterType2: ['filter2']
                }
            };
            const action = {
                type: REMOVE_APPLIED_FILTER_TYPE,
                payload: {filterType}
            };
            reducer(state, action);

            expect(reducer(state, action)).toMatchSnapshot();
        });
    });

    describe('when action `type` is equal to `REMOVE_APPLIED_FILTER_ITEM`', () => {
        it('should return `appliedFilters` without removed items in `filterType`', () => {
            const filterType = 'filterType';
            const filter = 'filter1';
            const state = {
                appliedFilters: {
                    [filterType]: [filter, 'filter2']
                }
            };
            const action = {
                type: REMOVE_APPLIED_FILTER_ITEM,
                payload: {filterType, filter}
            };

            expect(reducer(state, action)).toMatchSnapshot();
        });
    });

    describe('when action `type` is equal to `CLEAR_APPLIED_FILTERS`', () => {
        it('should return `appliedFilters` like a empty object', () => {
            const state = {
                appliedFilters: {
                    filterType: ['filter1', 'filter2']
                }
            };
            const action = {
                type: CLEAR_APPLIED_FILTERS
            };

            expect(reducer(state, action)).toEqual({appliedFilters: {}});
        });
    });
});
