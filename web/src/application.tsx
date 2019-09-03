import { Icon, Layout } from 'antd';
import React from 'react';
import { Redirect, Route } from 'react-router';
import './assets/styles/app.css';
import DaoListLoader from './components/DaoListComponent/DaoListLoader';
import { AppHeader } from './components/Layout/AppHeader';
import ProposalLoader from './components/ProposalLoader';
import Settings from './components/Settings0/Settings';
import DAO from './pages/DAO';
import Dashboard from './pages/Dashboard';
import { MainContainer } from './components/main.container';

const { Header, Content, Footer } = Layout;

const Application: React.FC = () => {
  return (
    <MainContainer>
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <AppHeader />
        </Header>
        <Content className="container">
          <div className="content">
            <Route exact path="/settings" component={Settings} />
            <DaoListLoader>
              <ProposalLoader>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/dao/:address" component={DAO} />
                <Route exact path="/settings" component={Settings} />
                <Redirect to="/" />
              </ProposalLoader>
            </DaoListLoader>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <a
            href="https://github.com/wslyvh/My-DAO-Dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted"
          >
            <Icon type="github" />
          </a>{' '}
          &nbsp; ETHBerlin Zwei
        </Footer>
      </Layout>
    </MainContainer>
  );
};

export default Application;
