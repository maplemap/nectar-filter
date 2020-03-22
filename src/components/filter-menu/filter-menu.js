import React, {useState, useContext, useCallback} from 'react';
import {Button} from 'antd';
import {FilterPopup} from '../filter-popup';
import {getCapitalized} from '../../utils';
import {ContextApp} from '../../reducer';

import './filter-menu.less';

const PRIMARY = 'primary';

export const FilterMenu = () => {
    const [activeFilter, setActiveFilter] = useState('');
    const {state: {filtersData, appliedFilters}} = useContext(ContextApp);

    const getCountFiltersByType = filterType => (
        appliedFilters[filterType] && appliedFilters[filterType].length > 0 ?
            appliedFilters[filterType].length : 0
    );

    const buttonItemOnClick = useCallback(e => {
        setActiveFilter(e.target.name);
    });

    const getButtonCaption = filterType => {
        const count = getCountFiltersByType(filterType);
        const appliedCount = count > 0 ? ` (${count})` : '';
        return `${getCapitalized(filterType)}${appliedCount}`
    };

    const onPopupVisibleChange = shown => {
        if (!shown) {
            setActiveFilter('');
        }
    };

    return (
        <div className="filter-menu">
            {Object.keys(filtersData).map(filterType => {
                const activeStatus = (
                    activeFilter === filterType || getCountFiltersByType(filterType) > 0
                );
                return (
                    <div key={filterType} className="filter-menu__item">
                        <FilterPopup
                            filterType={filterType}
                            onVisibleChange={onPopupVisibleChange}
                        >
                            <Button {...{
                                name: filterType,
                                onClick: buttonItemOnClick,
                                ...(activeStatus ? {type: PRIMARY} : null)
                            }}
                            >
                                {getButtonCaption(filterType)}
                            </Button>
                        </FilterPopup>
                    </div>
                )
            })}
        </div>
    )
};
