import React, {useState, useContext, useCallback} from 'react';
import {FilterMenuItem} from './filter-menu-item';
import {getCapitalized} from '../../utils';
import {ContextApp} from '../../reducer';

import './filter-menu.less';

const getCountCaption = ({name, count}) => {
    const appliedCount = count > 0 ? ` (${count})` : '';
    return `${getCapitalized(name)}${appliedCount}`
};

export const FilterMenu = () => {
    const [activeItem, setActiveItem] = useState('');
    const {state: {filtersData, appliedFilters, isMobile}} = useContext(ContextApp);

    const getCountFiltersByType = filterType => (
        appliedFilters[filterType] && appliedFilters[filterType].length > 0 ?
            appliedFilters[filterType].length : 0
    );

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
        const count = getCountFiltersByType(filterType);
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
        const buttonsTypes = Object.keys(filtersData).slice(0, 2);
        const moreFilterTypes = Object.keys(filtersData).slice(2);
        const count = (
            moreFilterTypes.reduce((acc, filterType) => (
                acc + getCountFiltersByType(filterType)
            ), 0)
        );
        return (
            <>
                {buttonsTypes.map(getSingleFilterItem)}
                <FilterMenuItem{...{
                    onPopupVisibleChange,
                    buttonItemOnClick,
                    filterTypes: moreFilterTypes,
                    caption: getCountCaption({count, name: 'More Filters'}),
                    isActive: activeItem === moreFilterTypes.join() || count > 0
                }}
                />
            </>
        )
    };

    return (
        <div className="filter-menu">
            {!isMobile ?
                Object.keys(filtersData).map(getSingleFilterItem) :
                getMobileMenu()}
        </div>
    )
};
