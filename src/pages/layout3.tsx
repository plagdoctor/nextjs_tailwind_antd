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
import { URLSearchParams } from 'url';
import { useRouter } from 'next/router';
import useSWR from "swr";

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
  getItem('잠실점수수료조회', '1', <PieChartOutlined />),
  getItem('신점포모형 조회', '2', <DesktopOutlined />),
  getItem('마일리지 정산', 'sub1', <UserOutlined />, [
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
    // console.log('메뉴가 클릭됐네 근데 무슨 메뉼');
  };
  
  // const [dateState, setDateState] = useState('warning');

  // const onDateChange = (error:any) => {
  //   console.log('error =', error);
  //   setDateState("");
  // }

  const setSelectedMenuItem = (key: string, keyPath: string[]) => {
    // console.log('메뉴 타이틀이 선택됐네 근데 무슨 타이틀이지');
    // console.log('key=', key);
    // console.log('keyPath=', keyPath);
    setOnSelectedKeys(key);
  };
  const records = results['retData'][1];

  const resultArray = [];
  console.log("results['retData'].length = ", results['retData'].length);

  for (var i = 0; i < results['retData'].length; i++) {
    console.log(results['retData'][i]);
    results['retData'][i]['KB_SALEAMT'] = results['retData'][i]['KB_SALEAMT'].toLocaleString('ko-KR');
    results['retData'][i]['HT_SALEAMT'] = results['retData'][i]['HT_SALEAMT'].toLocaleString('ko-KR');
    results['retData'][i]['TOT_SALEAMT'] = results['retData'][i]['TOT_SALEAMT'].toLocaleString('ko-KR');
    resultArray.push(results['retData'][i]);
  }
  
  console.log(resultArray);
  
  const router = useRouter();
  
  
  const onActionClick = () => {
    if (!data) return ;
    // boundMutate( (prev) => prev && {...prev, isLiked: !prev?.isLiked }, false);
    // // mutate("/api/users/me", (prev:any) => ({ok:!prev.ok}), false);
    // toggleFav({});
  };  

  //결과 가져오기
  const data: Item[] = resultArray;

  const columns: ColumnsType<Item> = [
    {
      title: '매출일자',
      dataIndex: 'SALEDATE',
      key: 'SALEDATE'
    },
    {
      title: '점포명',
      dataIndex: 'STORECD',
      key: 'STORECD',
      render: text => <a>{text}</a>
    },
    {
      title: '매출구분',
      dataIndex: 'PLUGB',
      key: 'PLUGB'
    },    
    {
      title: '롯데입력금권',
      dataIndex: 'TENDERTYPE2',
      key: 'TENDERTYPE2',
      render: (tendertype2) => (<Tag color='blue' key='TENDERTYPE2'> {tendertype2.toUpperCase()}  </Tag>),
    },
    {
      title: '교보문고포스매출',
      dataIndex: 'KB_SALEAMT',
      key: 'KB_SALEAMT'
    },    
    {
      title: '핫트랙스포스매출',
      dataIndex: 'HT_SALEAMT',
      key: 'HT_SALEAMT'
    },

    {
      title: '합계 매출',
      dataIndex: 'TOT_SALEAMT',
      key: 'TOT_SALEAMT'
    }
  ];
  const componentsSwtich = (key: string) => {
    switch (key) {
      case '1':
        return (
          <div>
            <Space className="flex space-x-4 mb-8">
              <RangePicker
                onChange={(e) => console.log(e)}
                placeholder={["시작일", "종료일"]}
              />              
              <Button size="middle" type="primary" onClick={onActionClick} >
                조회
              </Button>
            </Space>
            <Space className="flex space-x-4 mb-8">
              <Table columns={columns} dataSource={data} />
              
              <Table columns={columns} dataSource={data} />
            </Space>
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
            <Breadcrumb.Item>잠실점</Breadcrumb.Item>
            <Breadcrumb.Item>금권별매출</Breadcrumb.Item>
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

  //오늘 날짜 데이터 가져오기
  const date = new Date().toISOString().substring(0,10).replace(/-/g,'');
    
  const params2 = new URLSearchParams(`saleDate=${date}&storeCd=029`);
  console.log(process.env.AIRTABLE_KEY);
  // const results = await fetch(
  //   `https://api.airtable.com/v0/applxcBeSTAUNuag5/Table%201`,
  //   {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${process.env.AIRTABLE_KEY}`
  //     }
  //   }
  // )
  const results = await fetch(
    `http://localhost:7070/kflowapi/postcommissionsaledata`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params2
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

  // console.log('result를 보여줘 =', results);

  return {
    props: {
      results
    }
  };
};

export default App2;
