import React, {useContext} from 'react';
import {Tag, Button} from 'antd';
import {ContextApp} from 'reducer';

import './applied-filters.less';

export const NONE = '- none -';

export const AppliedFilters = () => {
    const {state: {appliedFilters}, dispatch} = useContext(ContextApp);
    const appliedFilterTypes = Object.keys(appliedFilters);
    const isaAppliedFilterTypes = appliedFilterTypes.length > 0;

    const removeFilterItem = ({filterType, filter}) => {
        dispatch({
            appliedFilters: {
                ...appliedFilters,
                [filterType]: appliedFilters[filterType].filter(item => item !== filter)
            }
        });
    };

    const clearAllFilters = () => {
        dispatch({appliedFilters: {}})
    };

    const getFilterItem = filterType => (
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
    );

    return (
        <div className="applied-filters">
            <h2>Applied Filters:</h2>
            <div className="applied-filters__items">
                {isaAppliedFilterTypes ? appliedFilterTypes.map(getFilterItem) : NONE}
                {isaAppliedFilterTypes && (
                    <Button onClick={clearAllFilters}>Clear All</Button>
                )}
            </div>
        </div>
    )
};
