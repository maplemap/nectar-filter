import {getCapitalized} from 'utils';

export const getCountCaption = ({name, count}) => {
    const appliedCount = count > 0 ? ` (${count})` : '';
    return `${getCapitalized(name)}${appliedCount}`
};

export const getCountFiltersByType = ({appliedFilters, filterType}) => (
    appliedFilters[filterType] && appliedFilters[filterType].length > 0 ?
        appliedFilters[filterType].length : 0
);
