import React, {useContext} from 'react';
import {Tag, Button} from 'antd';
import {ContextApp} from '../../reducer';

import './applied-filters.less';

const NONE = '- none -';

export const AppliedFilters = () => {
    const {state: {appliedFilters}, dispatch} = useContext(ContextApp);
    const appliedFilterTypes = Object.keys(appliedFilters);
    const isaAppliedFilterTypes = appliedFilterTypes.length > 0;

    const removeFilterItem = ({filterType, filter}) => {
        const newFiltersByFilterType = appliedFilters[filterType].filter(item => item !== filter);
        const newAppliedFilters = {...appliedFilters};
        if (newFiltersByFilterType.length === 0) {
            delete newAppliedFilters[filterType];
        } else {
            newAppliedFilters[filterType] = newFiltersByFilterType;
        }

        dispatch({appliedFilters: newAppliedFilters});
    };

    const clearAppliedFilters = () => {
        dispatch({appliedFilters: {}})
    };

    const getAllFilters = () => (
        appliedFilterTypes.map(filterType => (
            appliedFilters[filterType].map(filter => {
                const onClose = () => removeFilterItem({filterType, filter});
                return (
                    <Tag
                        key={filter}
                        closable
                        className="applied-filters__item"
                        onClose={onClose}
                    >
                        {filter}
                    </Tag>
                )
            })
        ))
    );

    return (
        <div className="applied-filters">
            <h2>Applied Filters:</h2>
            <div className="applied-filters__items">
                {isaAppliedFilterTypes ? getAllFilters() : NONE}
                {isaAppliedFilterTypes && (
                    <Button
                        className="applied-filters__clear"
                        onClick={clearAppliedFilters}
                    >
                        Clear All
                    </Button>
                )}
            </div>
        </div>
    )
};
