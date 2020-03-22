import React from 'react';
import filtersData from '../data';

export const ContextApp = React.createContext({});

export const initialState = {
    filtersData,
    appliedFilters: {}
};

export const reducer = (state, data) => ({...state, ...data});
