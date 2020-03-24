import React from 'react';
import {isMobile} from 'react-device-detect';
import filtersData from 'data';

export const ContextApp = React.createContext({});

export const initialState = {
    filtersData,
    isMobile,
    appliedFilters: {}
};

export const reducer = (state, data) => ({...state, ...data});
