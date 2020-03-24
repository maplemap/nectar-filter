import React, {useReducer} from 'react';
import {Layout} from 'antd';
import {FilterMenu} from 'components/filter-menu';
import {AppliedFilters} from 'components/applied-filters';
import {ContextApp, initialState, reducer} from '../reducer';

import logo from '../logo.png';
import './app.less';

export const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {Header, Content} = Layout;

    return (
        <ContextApp.Provider value={{dispatch, state}}>
            <Layout className="nectar-app">
                <Header className="nectar-app__header">
                    <div className="nectar-app__logo">
                        <img src={logo} alt="nectar-filter-logo"/>
                    </div>
                </Header>
                <Header className="nectar-app__sub-header">
                    <FilterMenu/>
                </Header>
                <Content className="nectar-app__content">
                    <AppliedFilters/>
                </Content>
            </Layout>
        </ContextApp.Provider>
    )
};
