import React from 'react';
import {Button} from 'antd';
import {FilterPopup} from 'components/filter-popup';

export const FilterMenuItem = ({
    filterTypes,
    onPopupVisibleChange,
    buttonItemOnClick,
    caption,
    isActive
}) => (
    <div className="filter-menu__item">
        <FilterPopup filterTypes={filterTypes} onVisibleChange={onPopupVisibleChange}>
            <Button {...{
                name: Array.isArray(filterTypes) ? filterTypes.join() : filterTypes,
                onClick: buttonItemOnClick,
                ...(isActive ? {type: 'primary'} : null)
            }}
            >
                {caption}
            </Button>
        </FilterPopup>
    </div>
);
