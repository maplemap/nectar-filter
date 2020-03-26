import React from 'react';
import {shallow, mount} from 'enzyme';
import {FilterPopupContent} from '../filter-popup-content';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn()
}));

const filtersByType = [{id: 'id', title: 'title'}];

const getComponent = props => (
    <FilterPopupContent {...{
        filtersByType,
        ...props
    }}
    />
);
const getShallow = props => shallow(getComponent(props));
const getMounted = props => mount(getComponent(props));

describe('FilterPopupContent', () => {
    let setCheckedFiltersIds;

    beforeAll(() => {
        setCheckedFiltersIds = jest.fn();
        React.useState.mockReturnValue([[], setCheckedFiltersIds]);
    });

    it('should render filter items with count according to the `filtersByType` length', () => {
        expect(getShallow().find('.filter-popup__content-item').length).toBe(filtersByType.length);
    });

    describe('when `checkedFiltersIds` state has length more then `0`', () => {
        let cancelButton;
        let filterType;
        let onReset;

        beforeAll(() => {
            filterType = 'filterType';
            onReset = jest.fn();
            React.useState.mockReturnValue([[{}], setCheckedFiltersIds]);

            // eslint-disable-next-line prefer-destructuring
            cancelButton = getShallow({filterType, onReset}).find('.filter-popup__action-buttons').props().children[0];
        });

        it('should render `Button` component with `Cancel`', () => {
            expect(cancelButton.props.children).toBe('Cancel');
        });

        describe('when `resetCheckedFilters` method was invoked', () => {
            beforeAll(() => {
                cancelButton.props.onClick();
            });

            it('should call `setCheckedFiltersIds` with empty array', () => {
                expect(setCheckedFiltersIds).toHaveBeenCalledWith([]);
            });

            it('should call `onReset` property with `filterType` property', () => {
                expect(onReset).toHaveBeenCalledWith(filterType);
            })
        });
    });

    describe('given the `popoverShown` was updated', () => {
        describe('given the `popoverShown` is equal to `false`', () => {
            it('should call `setCheckedFiltersIds` with `appliedFiltersByType` property', () => {
                const appliedFiltersByType = {size: {}};
                const wrapper = getMounted({appliedFiltersByType});
                wrapper.setProps({popoverShown: false});

                expect(setCheckedFiltersIds).toHaveBeenCalledWith(appliedFiltersByType);
            });
        })
    });

    describe('when `setAppliedFilters` method was invoked', () => {
        it('should call `onApply` property', () => {
            const checkedFiltersIds = [{size: []}];
            const filterType = 'filterType';
            const onApply = jest.fn();
            React.useState.mockReturnValue([checkedFiltersIds]);
            const applyButton = (
                getShallow({filterType, onApply}).find('.filter-popup__action-buttons').props().children[1]
            );
            applyButton.props.onClick();

            expect(onApply).toHaveBeenCalledWith({checkedFiltersIds, filterType});
        });
    });

    describe('when `itemOnClick` method was invoked', () => {
        const checkedFiltersIds = ['size'];
        const color = 'color';

        describe('when `name` parameter includes into `checkedFiltersIds`', () => {
            it('should call `setCheckedFiltersIds` with data without `name` parameter', () => {
                React.useState.mockReturnValue([[...checkedFiltersIds, color], setCheckedFiltersIds]);
                getShallow().find('.filter-popup__content-item').props().onClick({target: {name: color}});

                expect(setCheckedFiltersIds).toHaveBeenCalledWith(checkedFiltersIds);
            });
        });

        describe('when `name` parameter not includes into `checkedFiltersIds`', () => {
            it('should call `setCheckedFiltersIds` with data with `name` parameter', () => {
                React.useState.mockReturnValue([[...checkedFiltersIds], setCheckedFiltersIds]);
                getShallow().find('.filter-popup__content-item').props().onClick({target: {name: color}});

                expect(setCheckedFiltersIds).toHaveBeenCalledWith([...checkedFiltersIds, color]);
            });
        });
    });
});
