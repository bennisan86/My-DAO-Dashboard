import { Avatar, Col, Row, Tooltip } from 'antd';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TetherContext } from '../../contexts/tether.context';

export const AppHeader: React.FC = () => {
  const tether = useContext(TetherContext);
  return (
    <div style={{ color: '#fff' }}>
      <Row>
        <Col span={12}>
          <Link to="/">My DAO Dashboard</Link>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Link to={'/settings'}>Settings</Link>&nbsp;&nbsp;&nbsp;&nbsp;
          <Tooltip title={tether.account} placement="left">
            <Avatar shape="square" style={{ color: '#000' }} size="large">
              {tether.account.substring(0, 5)}
            </Avatar>
          </Tooltip>
        </Col>
      </Row>
    </div>
  );
};
