import React, {useContext, useState, useCallback, useEffect} from 'react';
import {Popover, Button} from 'antd';
import {ContextApp} from '../../reducer';

import './filter-popup.less';

const PRIMARY = 'primary';

export const FilterPopup = ({children, filterType, ...props}) => {
    const [checkedFiltersIds, setCheckedFiltersIds] = useState([]);
    const {state: {filtersData, appliedFilters}, dispatch} = useContext(ContextApp);

    useEffect(() => {
        if (!appliedFilters[filterType]) {
            setCheckedFiltersIds([]);
        }
    }, [appliedFilters]);

    const itemOnClick = useCallback(e => {
        const {name} = e.target;
        const newCheckedFilters = (
            checkedFiltersIds.includes(name) ?
                checkedFiltersIds.filter(filter => filter !== name) :
                [...checkedFiltersIds, name]
        );

        setCheckedFiltersIds(newCheckedFilters);
    });

    const setAppliedFilters = useCallback(() => {
        if (checkedFiltersIds.length > 0) {
            dispatch({
                appliedFilters: {
                    ...appliedFilters,
                    [filterType]: checkedFiltersIds
                }
            });
        }
    });

    const resetCheckedFilters = useCallback(() => {
        const newAppliedFilters = {...appliedFilters};
        delete newAppliedFilters[filterType];

        dispatch({appliedFilters: newAppliedFilters});
        setCheckedFiltersIds([]);
    });

    const onVisibleChange = shown => {
        if (!shown) {
            setCheckedFiltersIds(appliedFilters[filterType] || []);
        }

        props.onVisibleChange(shown);
    };

    const getContent = () => (
        <>
            <div>
                {filtersData[filterType].map(({id, title}) => (
                    <Button key={id} {...{
                        name: id,
                        className: 'filter-popup__content-item',
                        onClick: itemOnClick,
                        ...(checkedFiltersIds.includes(id) ? {type: PRIMARY} : null)
                    }}
                    >
                        {title}
                    </Button>
                ))}
            </div>
            <div className="filter-popup__action-buttons">
                {
                    checkedFiltersIds.length > 0 &&
                    <Button onClick={resetCheckedFilters}>Cancel</Button>
                }
                <Button type="primary" onClick={setAppliedFilters}>
                    Apply
                </Button>
            </div>
        </>
    );

    return (
        <Popover
            placement="bottom"
            trigger="click"
            content={getContent()}
            onVisibleChange={onVisibleChange}
            overlayStyle={{width: '20rem', padding: 0}}
        >
            {children}
        </Popover>
    );
};
