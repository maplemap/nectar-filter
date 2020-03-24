import React, {useState, useContext, useCallback} from 'react';
import {ContextApp} from 'reducer';
import {FilterMenuItem} from './filter-menu-item';
import {getCountCaption, getCountFiltersByType} from './utils'

import './filter-menu.less';

export const FilterMenu = () => {
    const [activeItem, setActiveItem] = useState('');
    const {state: {filtersData, appliedFilters, isMobile}} = useContext(ContextApp);
    const filtersDataKeys = Object.keys(filtersData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const buttonItemOnClick = useCallback(e => {
        setActiveItem(e.target.name);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onPopupVisibleChange = useCallback(shown => {
        if (!shown) {
            setActiveItem('');
        }
    });

    const getSingleFilterItem = filterType => {
        const count = getCountFiltersByType({appliedFilters, filterType});
        return (
            <FilterMenuItem key={filterType} {...{
                onPopupVisibleChange,
                buttonItemOnClick,
                filterTypes: filterType,
                caption: getCountCaption({count, name: filterType}),
                isActive: activeItem === filterType || count > 0
            }}
            />
        )
    };

    const getMobileMenu = () => {
        const buttonsKeys = filtersDataKeys.slice(0, 2);
        const moreFilterKeys = filtersDataKeys.slice(2);
        const count = (
            moreFilterKeys.reduce((acc, filterType) => (
                acc + getCountFiltersByType({appliedFilters, filterType})
            ), 0)
        );
        return (
            <>
                {buttonsKeys.map(getSingleFilterItem)}
                <FilterMenuItem{...{
                    onPopupVisibleChange,
                    buttonItemOnClick,
                    filterTypes: moreFilterKeys,
                    caption: getCountCaption({count, name: 'More Filters'}),
                    isActive: activeItem === moreFilterKeys.join() || count > 0
                }}
                />
            </>
        )
    };

    return (
        <div className="filter-menu">
            {isMobile && filtersDataKeys.length > 3 ?
                getMobileMenu() :
                Object.keys(filtersData).map(getSingleFilterItem)}
        </div>
    )
};
