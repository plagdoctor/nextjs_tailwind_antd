import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import {
  MenuProps,
  Breadcrumb,
  Layout,
  Menu,
  DatePicker,
  Space,
  Table,
  Tag,
  Button
} from 'antd';
import React, { useState } from 'react';
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage
} from 'next';
import type { ColumnsType } from 'antd/es/table';

const { RangePicker } = DatePicker;
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('수수료매출점포', 'sub1', <UserOutlined />, [
    getItem('잠실점', '3'),
    getItem('해운대점', '4'),
    getItem('청량리점', '5'),
    getItem('센텀시티점', '5')
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [
    getItem('Team 1', '6'),
    getItem('Team 2', '8')
  ])
];

interface Item {
  ht_saleamt: string;
  storecd: string;
  tendertype2: string;
  tot_saleamt: string;
  plugb: string;
  kb_saleamt: string;
  saledate: string;
}

const App2: NextPage = ({
  results
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [collapsed, setCollapsed] = useState(false);
  const [onSelectedKeys, setOnSelectedKeys] = useState('1'); //키
  const onMenuSelected = () => {
    // console.log('메뉴가 클릭됐네 근데 무슨 메뉼까;;');
  };

  const setSelectedMenuItem = (key: string, keyPath: string[]) => {
    // console.log('메뉴 타이틀이 선택됐네 근데 무슨 타이틀이지;;');
    // console.log('key=', key);
    // console.log('keyPath=', keyPath);
    setOnSelectedKeys(key);
  };

  const records = results['records'][1]['fields'];

  const resultArray = [];
  console.log("results['records'].length = ", results['records'].length);
  for (var i = 0; i < results['records'].length; i++) {
    console.log(results['records'][i]['fields']);
    resultArray.push(results['records'][i]['fields']);
  }
  console.log(resultArray);

  const data: Item[] = resultArray;

  const columns: ColumnsType<Item> = [
    {
      title: 'saledate',
      dataIndex: 'saledate',
      key: 'saledate'
    },
    {
      title: 'storecd',
      dataIndex: 'storecd',
      key: 'storecd',
      render: text => <a>{text}</a>
    },
    {
      title: 'tendertype2',
      dataIndex: 'tendertype2',
      key: 'tendertype2'
    },
    {
      title: 'tot_saleamt',
      dataIndex: 'tot_saleamt',
      key: 'tot_saleamt'
    },
    {
      title: 'plugb',
      dataIndex: 'plugb',
      key: 'plugb'
    },
    {
      title: 'kb_saleamt',
      dataIndex: 'kb_saleamt',
      key: 'kb_saleamt'
    }
  ];
  const componentsSwtich = (key: string) => {
    switch (key) {
      case '1':
        return (
          <div>
            <Space className=" flex space-x-6">
              <RangePicker />
              <Button size="middle" type="primary">
                조회
              </Button>
            </Space>
            <Table columns={columns} dataSource={data} />
          </div>
        );
      case '2':
        return <h1>item2</h1>;
      case '3':
        return <h1>item3</h1>;
      default:
        break;
    }
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          onSelect={onMenuSelected}
          onClick={e => setSelectedMenuItem(e.key, e.keyPath)}
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {componentsSwtich(onSelectedKeys)}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  console.log(process.env.AIRTABLE_KEY);
  const results = await fetch(
    `https://api.airtable.com/v0/applxcBeSTAUNuag5/Table%201`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AIRTABLE_KEY}`
      }
    }
  )
    .then(res => {
      //   console.log(res);
      return res.json();
    })
    .then(json => {
      //   console.log(json);
      return json;
    });

  console.log('여기까지 오는건 맞나?');
  console.log('result를 보여줘 =', results);

  return {
    props: {
      results
    }
  };
};

export default App2;
