import React from 'react';
import {isMobile} from 'react-device-detect';
import filtersData from 'data';
import {
    REMOVE_APPLIED_FILTER_ITEM,
    SET_APPLIED_FILTERS,
    CLEAR_APPLIED_FILTERS, REMOVE_APPLIED_FILTER_TYPE
} from './constants';

export const ContextApp = React.createContext({});

export const initialState = {
    filtersData,
    isMobile,
    appliedFilters: {}
};

export const reducer = (state = {}, action = {}) => {
    const {type, payload} = action;

    // eslint-disable-next-line default-case
    switch (type) {
        case SET_APPLIED_FILTERS: {
            const {checkedFiltersIds, filterType} = payload;

            return {
                ...state,
                appliedFilters: {
                    ...state.appliedFilters,
                    [filterType]: checkedFiltersIds
                }
            }
        }

        case REMOVE_APPLIED_FILTER_TYPE: {
            const {filterType} = payload;
            const newAppliedFilters = {...state.appliedFilters};
            delete newAppliedFilters[filterType];

            return {
                ...state,
                appliedFilters: newAppliedFilters
            }
        }

        case REMOVE_APPLIED_FILTER_ITEM: {
            const {filterType, filter} = payload;
            const {appliedFilters} = state;
            const newFiltersByFilterType = appliedFilters[filterType].filter(item => item !== filter);
            const newAppliedFilters = {...appliedFilters};
            if (newFiltersByFilterType.length === 0) {
                delete newAppliedFilters[filterType];
            } else {
                newAppliedFilters[filterType] = newFiltersByFilterType;
            }

            return {
                ...state,
                appliedFilters: newAppliedFilters
            }
        }

        case CLEAR_APPLIED_FILTERS: {
            return {
                ...state,
                appliedFilters: {}
            }
        }
    }

    return state;
};
