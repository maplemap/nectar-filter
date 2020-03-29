## Nectar Filter App

Demo: https://maplemap.github.io/nectar-filter

Small application for displaying groups of filters.
In the project were used:
- `React.js` - main library for view layer
- `Ant Design` - library of components
- `less` -  dynamic preprocessor for styles
- `react-device-detect` -  package for detect device
- `jest, enzyme, jasmine,` -  packages for testing of components


### Project structure description

#### `src/app`
Core of project, main page with its styles and styles of project.

#### `src/components`
Layer of components.

##### `src/components/filter-menu`
Menu with filters items. It renders two kinds of menu: for desktop and mobile devices.

##### `src/components/filter-menu-item`
Component that is used in `filter-menu`. It renders button which wrapped `src/components/filter-popup` component.

##### `src/components/filter-popup`
Component which renders content of popover with help of `src/components/filter-popup-content` component.
Has the ability to accept `filterTypes` property with value as `string` and `array`. Depending on this has be able to 
renders two different types of `filter-popup` accordingly: popup with single type of filters and popup with multiply types
of filters (for example for mobile devices).
Interacts with with store.

##### `src/components/filter-popup-content`
It renders filters items and buttons 'Cancel' and 'Apply';

##### `src/components/applied-filters`
It renders filters items which were applied in `src/components/filter-popup-content` through button 'Apply';
Also it displays 'Clear All' button which has be able clear all applied filters types.
Interacts with with store.

#### `src/data`
Initial data of project.

#### `src/reducer`
Layer of data, store of project, single source of truth. Based on initial data from `src/data`.

#### `src/utils`
Common helpers, utils of project.
