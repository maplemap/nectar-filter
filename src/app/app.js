import React from 'react';
import {Layout} from 'antd';
import logo from '../logo.png';

import './app.less';

export const App = () => {
    const {Header, Content} = Layout;

    return (
        <Layout className="nectar-app">
            <Header className="nectar-app__header">
                <div className="nectar-app__logo">
                    <img src={logo} alt="nectar-filter-logo"/>
                </div>
            </Header>
            <Header/>
            <Content className="nectar-app__content-box">
                <div className="nectar-app__content">Content</div>
            </Content>
        </Layout>
    )
};
