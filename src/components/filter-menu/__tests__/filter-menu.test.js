import React from 'react';
import {shallow} from 'enzyme';
import {FilterMenu} from '../filter-menu';
import {FilterMenuItem} from '../filter-menu-item';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: jest.fn(),
    useState: jest.fn()
}));

const getComponent = props => (
    <FilterMenu {...{
        ...props
    }}
    />
);
const getShallow = props => shallow(getComponent(props));

describe('FilterMenu', () => {
    const getContextData = ({filtersData = {}, appliedFilters = {}, isMobile = false}) => ({
        state: {filtersData, appliedFilters, isMobile}
    });

    describe('when device is not mobile', () => {
        describe('when `filtersData` has keys less then `3`', () => {
            const size = 'size';
            const filtersData = {[size]: {}};
            let filterMenuItems;
            let setActiveItem;

            beforeEach(() => {
                setActiveItem = jest.fn();
                React.useContext.mockReturnValue(getContextData({filtersData}));
                React.useState.mockImplementation(activeItem => [activeItem, setActiveItem]);
                filterMenuItems = getShallow().find(FilterMenuItem);
            });

            it('should render count of `FilterMenuItem` components according to the count of `filtersData` keys',
                () => {
                    expect(filterMenuItems.length).toBe(Object.keys(filtersData).length);
                });

            it('should render `FilterMenuItem` components according to the `filtersData` keys', () => {
                expect(filterMenuItems.at(0).props().filterTypes).toBe(size);
            });

            describe('when `onPopupVisibleChange` method was invoked', () => {
                describe('when `shown` parameter is equal to `false`', () => {
                    it('should call `setActiveItem` with empty string', () => {
                        filterMenuItems.at(0).props().onPopupVisibleChange(false);

                        expect(setActiveItem).toHaveBeenCalledWith('');
                    });
                })
            });

            describe('when `buttonItemOnClick` method was invoked', () => {
                it('should call `setActiveItem` with current `name` of item', () => {
                    const event = {target: {name: 'name'}};
                    filterMenuItems.at(0).props().buttonItemOnClick(event);

                    expect(setActiveItem).toHaveBeenCalledWith(event.target.name);
                });
            });
        });
    });

    describe('when device is mobile', () => {
        describe('when `filtersData` has keys more then `3`', () => {
            const filtersData = {size: {}, color: {}, room: {}, price: {}};
            let wrapper;
            let filterMenuItems;

            beforeEach(() => {
                React.useContext.mockReturnValue(getContextData({filtersData, isMobile: true}));
                wrapper = getShallow();
                filterMenuItems = wrapper.find(FilterMenuItem);
            });

            it('should render two `FilterMenuItem` components with single value in `filterTypes` property', () => {
                expect(wrapper.find(FilterMenuItem).slice(0, 2)).toMatchSnapshot();
            });

            it('should render one `FilterMenuItem` component with multiple value in `filterTypes` property', () => {
                expect(filterMenuItems.at(2).props().filterTypes).toEqual(Object.keys(filtersData).slice(2));
            });
        });
    })
});
