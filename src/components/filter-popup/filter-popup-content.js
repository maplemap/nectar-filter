import React, {useState, useCallback, useEffect} from 'react';
import {Button} from 'antd';

export const FilterPopupContent = ({
    filterType,
    filtersByType,
    appliedFiltersByType,
    popoverShown,
    onApply,
    onReset
}) => {
    const [checkedFiltersIds, setCheckedFiltersIds] = useState([]);

    useEffect(() => {
        if (!popoverShown) {
            setCheckedFiltersIds(appliedFiltersByType || []);
        }
    }, [popoverShown, appliedFiltersByType]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const itemOnClick = useCallback(e => {
        const {name} = e.target;
        const newCheckedFilters = (
            checkedFiltersIds.includes(name) ?
                checkedFiltersIds.filter(filter => filter !== name) :
                [...checkedFiltersIds, name]
        );

        setCheckedFiltersIds(newCheckedFilters);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setAppliedFilters = useCallback(() => {
        onApply({checkedFiltersIds, filterType});
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const resetCheckedFilters = useCallback(() => {
        setCheckedFiltersIds([]);
        onReset(filterType);
    });

    return (
        <>
            <div>
                {filtersByType.map(({id, title}) => (
                    <Button key={id} {...{
                        name: id,
                        className: 'filter-popup__content-item',
                        onClick: itemOnClick,
                        ...(checkedFiltersIds.includes(id) ? {type: 'primary'} : null)
                    }}
                    >
                        {title}
                    </Button>
                ))}
            </div>
            <div className="filter-popup__action-buttons">
                {checkedFiltersIds.length > 0 &&
                    <Button onClick={resetCheckedFilters}>Cancel</Button>}
                <Button type="primary" onClick={setAppliedFilters}>Apply</Button>
            </div>
        </>
    );
};
