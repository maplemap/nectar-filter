import {getCapitalized} from 'utils';
import {getCountCaption, getCountFiltersByType} from '../utils';

jest.mock('utils', () => ({
    getCapitalized: jest.fn()
}));

describe('getCountCaption util', () => {
    const name = 'Name';

    beforeAll(() => {
        getCapitalized.mockReturnValue(name);
    });

    describe('when `count` parameter more then `0`', () => {
        it('should return string with `count` parameter', () => {
            const count = 1;

            expect(getCountCaption({name, count})).toBe(`${name} (${count})`);
        });
    });
    describe('when `count` parameter equal to `0`', () => {
        it('should return only `name` parameter', () => {
            expect(getCountCaption({name, count: 0})).toBe(`${name}`);
        });
    });
});


describe('getCountFiltersByType util', () => {
    describe('when `appliedFilters` parameter has key from `filterType` parameter', () => {
        describe('when `appliedFilters` with `filterType` key has length more then `0`', () => {
            it('should return length of `filterType` key', () => {
                const filterType = 'filterType';
                const filterTypeValue = [{}];
                const appliedFilters = {[filterType]: filterTypeValue};

                expect(getCountFiltersByType({appliedFilters, filterType})).toBe(filterTypeValue.length);
            });
        });
        describe('when `appliedFilters` with `filterType` key has length which is equal to `0`', () => {
            it('should return `0`', () => {
                expect(getCountFiltersByType({appliedFilters: {}})).toBe(0);
            });
        });
    });
});
