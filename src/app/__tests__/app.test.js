import React from 'react';
import {shallow} from 'enzyme';
import {App} from 'app';
import {FilterMenu} from 'components/filter-menu';
import {AppliedFilters} from 'components/applied-filters';
import logo from 'logo.png';

const getComponent = props => <App {...props}/>;
const getShallow = props => shallow(getComponent(props));

describe('App', () => {
    let wrapper;

    beforeAll(() => {
        wrapper = getShallow();
    });

    it('should render logo', () => {
        expect(wrapper.find('.nectar-app__logo').props().children.props.src).toEqual(logo);
    });

    it('should render `FilterMenu` component', () => {
        expect(wrapper.find(FilterMenu).length).toBe(1);
    });

    it('should render `AppliedFilters` component', () => {
        expect(wrapper.find(AppliedFilters).length).toBe(1);
    });
});
