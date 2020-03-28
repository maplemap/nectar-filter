import React from 'react';
import {shallow} from 'enzyme';
import {Tag, Button} from 'antd';
import {AppliedFilters, NONE} from '../applied-filters';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: jest.fn().mockImplementation(() => ({state: {filtersData: {}, appliedFilters: {}}})),
}));

const getComponent = props => (
    <AppliedFilters {...{
        ...props
    }}
    />
);
const getShallow = props => shallow(getComponent(props));

describe('AppliedFilters', () => {
    let getContextData;
    let dispatch;

    beforeAll(() => {
        dispatch = jest.fn();
        getContextData = ({filtersData = {}, appliedFilters = {}, isMobile = false}) => ({
            state: {filtersData, appliedFilters, isMobile},
            dispatch
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('when `appliedFilters` is provided', () => {
        let appliedFilters;
        let wrapper;

        beforeAll(() => {
            appliedFilters = {size: ['1x1', '2x2'], color: ['blue']};
            React.useContext.mockReturnValueOnce(getContextData({appliedFilters}));
            wrapper = getShallow();
        });

        it('should render `Tag` component according the count of keys of `appliedFilters`', () => {
            expect(wrapper.find(Tag).length).toBe(Object.values(appliedFilters).flat(1).length)
        });

        describe('when `removeFilterItem` method was invoked', () => {
            it('should call `dispatch` with updated `appliedFilters`', () => {
                wrapper.find(Tag).at(0).props().onClose();

                expect(dispatch.mock.calls[0][0]).toMatchSnapshot();
            });
        });


        describe('when `clearAllFilters` method was invoked', () => {
            it('should call `dispatch` with updated `appliedFilters`', () => {
                wrapper.find(Button).props().onClick();

                expect(dispatch).toHaveBeenCalledWith({appliedFilters: {}});
            });
        });
    });

    describe('when `appliedFilters` is not provided', () => {
        it('should render `NONE` caption', () => {
            expect(getShallow().find('.applied-filters__items').props().children[0]).toBe(NONE);
        });
    });
});
