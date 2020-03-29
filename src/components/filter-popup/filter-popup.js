import React, {useContext, useState, useCallback} from 'react';
import {Popover, Collapse} from 'antd';
import {ContextApp} from 'reducer';
import {SET_APPLIED_FILTERS, REMOVE_APPLIED_FILTER_TYPE} from 'reducer/constants';
import {getCapitalized} from 'utils';
import {FilterPopupContent} from './filter-popup-content';

import './filter-popup.less';

export const FilterPopup = ({children, filterTypes, ...props}) => {
    const {Panel} = Collapse;
    const [popoverShown, setPopoverShown] = useState(false);
    const {state: {filtersData, appliedFilters, isMobile}, dispatch} = useContext(ContextApp);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setAppliedFilters = useCallback(({checkedFiltersIds, filterType}) => {
        if (checkedFiltersIds.length > 0) {
            dispatch({
                type: SET_APPLIED_FILTERS,
                payload: {checkedFiltersIds, filterType}
            });
        }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const resetCheckedFilters = useCallback(filterType => {
        dispatch({
            type: REMOVE_APPLIED_FILTER_TYPE,
            payload: {filterType}
        });
    });

    const onVisibleChange = shown => {
        setPopoverShown(shown);
        props.onVisibleChange(shown);
    };

    const getContent = () => {
        const isFilterTypesArray = Array.isArray(filterTypes);
        const getFiltersPopupContent = type => (
            <FilterPopupContent {...{
                popoverShown,
                filterType: type,
                filtersByType: filtersData[type],
                appliedFiltersByType: appliedFilters[type],
                onApply: setAppliedFilters,
                onReset: resetCheckedFilters
            }}
            />
        );
        return (
            !isFilterTypesArray ?
                getFiltersPopupContent(filterTypes) :
                <Collapse>
                    {filterTypes.map(type => (
                        <Panel key={type} header={getCapitalized(type)}>
                            {getFiltersPopupContent(type)}
                        </Panel>
                    ))}
                </Collapse>
        );
    };

    return (
        <Popover
            arrowPointAtCenter
            placement="bottom"
            trigger="click"
            content={getContent()}
            onVisibleChange={onVisibleChange}
            overlayStyle={{
                width: isMobile ? '100%' : '20rem',
                height: isMobile ? '200px' : 'auto'
            }}
        >
            {children}
        </Popover>
    );
};
