import React from 'react';
import {Layout} from 'antd';
import {FilterMenu} from '../components/filter-menu';
import filtersData from '../data';

import logo from '../logo.png';
import './app.less';

export const App = () => {
    const {Header, Content} = Layout;
    const filters = Object.keys(filtersData);

    return (
        <Layout className="nectar-app">
            <Header className="nectar-app__header">
                <div className="nectar-app__logo">
                    <img src={logo} alt="nectar-filter-logo"/>
                </div>
            </Header>
            <Header className="nectar-app__sub-header">
                <FilterMenu filters={filters}/>
            </Header>
            <Content className="nectar-app__content-box">
                <div className="nectar-app__content">Content</div>
            </Content>
        </Layout>
    )
};
