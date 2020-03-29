import React from 'react';
import {shallow} from 'enzyme';
import {Popover} from 'antd';
import {SET_APPLIED_FILTERS, REMOVE_APPLIED_FILTER_TYPE} from 'reducer/constants';
import {FilterPopup} from '../filter-popup';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: jest.fn().mockImplementation(() => ({state: {filtersData: {}, appliedFilters: {}}})),
    useState: jest.fn()
}));

const getComponent = props => (
    <FilterPopup {...{
        ...props
    }}
    />
);
const getShallow = props => shallow(getComponent(props));

describe('FilterPopup', () => {
    let getContextData;
    let setPopoverShown;
    let dispatch;

    beforeAll(() => {
        dispatch = jest.fn();
        setPopoverShown = jest.fn();
        getContextData = ({filtersData = {}, appliedFilters = {}, isMobile = false}) => ({
            state: {filtersData, appliedFilters, isMobile},
            dispatch
        });

        React.useContext.mockReturnValue(getContextData({}));
        React.useState.mockImplementation(popoverShown => [popoverShown, setPopoverShown]);
    });

    it('should render `Popover` component', () => {
        expect(getShallow().find(Popover).length).toBe(1);
    });

    describe('given the `filterTypes` is Array', () => {
        it('should render `Collapse` component as content of `Popover`', () => {
            expect(getShallow({filterTypes: ['type']}).find(Popover).props().content).toMatchSnapshot();
        });
    });

    describe('given the `filterTypes` is not Array', () => {
        it('should render `FilterPopupContent` component as content of `Popover`', () => {
            expect(getShallow({filterTypes: 'type'}).find(Popover).props().content).toMatchSnapshot();
        });
    });

    describe('when `onVisibleChange` method was invoked', () => {
        let onVisibleChange;
        let wrapper;
        const shown = true;

        beforeAll(() => {
            onVisibleChange = jest.fn();
            wrapper = getShallow({onVisibleChange});
            wrapper.find(Popover).props().onVisibleChange(shown);
        });

        it('should call `setPopoverShown` with `shown` parameter', () => {
            expect(setPopoverShown).toHaveBeenCalledWith(shown);
        });
        it('should call `onVisibleChange` property with `shown` parameter', () => {
            expect(onVisibleChange).toHaveBeenCalledWith(shown);
        });
    });

    describe('when `resetCheckedFilters` method was invoked', () => {
        it('should call `dispatch` with new `REMOVE_APPLIED_FILTER_TYPE` type', () => {
            const filterType = 'size';
            getShallow().find(Popover).props().content.props.onReset(filterType);

            expect(dispatch).toHaveBeenCalledWith({
                type: REMOVE_APPLIED_FILTER_TYPE,
                payload: {filterType}
            });
        });
    });

    describe('when `setAppliedFilters` method was invoked', () => {
        describe('when `checkedFiltersIds` parameter has length more then `0`', () => {
            it('should call `dispatch` with new `SET_APPLIED_FILTERS` type', () => {
                const filterType = 'size';
                const checkedFiltersIds = ['1x1'];
                const popoverContent = getShallow().find(Popover).props().content;
                popoverContent.props.onApply({checkedFiltersIds, filterType});

                expect(dispatch).toHaveBeenCalledWith({
                    type: SET_APPLIED_FILTERS,
                    payload: {checkedFiltersIds, filterType}
                });
            })
        });
    });
});
