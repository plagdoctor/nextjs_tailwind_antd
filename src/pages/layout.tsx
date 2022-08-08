import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined
} from '@ant-design/icons';

import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, DatePicker, Space } from 'antd';
import React from 'react';

const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
  key,
  label: `nav ${key}`
}));

const { RangePicker } = DatePicker;

const items2: MenuProps['items'] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`
      };
    })
  };
});

const App: React.FC = () => (
  <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={items1}
      />
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
            items={items2}
          />
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <Space direction="vertical" size={12}>
            <RangePicker />
          </Space>
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}></Footer>
  </Layout>
);

export default App;
