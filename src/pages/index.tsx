import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  SyncOutlined,
  LogoutOutlined
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
  Button,
  Alert, 
  message,
  Spin,
  Typography,
  Popconfirm
} from 'antd';

import React, { useEffect, useState } from 'react';
import type {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
  NextPage,
  InferGetStaticPropsType
} from 'next';

import { URLSearchParams } from 'url';
import useSWR, { useSWRConfig } from "swr";

import {HashLoader} from 'react-spinners';
import useUser from '@libs/client/useUser';
  
import kyoboLogo from '@public/img/logo_kyobo.png'
import Image from 'next/image';
import useMutation from '@libs/client/useMutation';
import { useRouter } from 'next/router';
import Jamsil from '@components/jamsil/jamsil';
import Mileage from '@components/mileage/mileage';

const { RangePicker } = DatePicker;
const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;



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
  getItem('신점포모형 조회', 'sub1', <DesktopOutlined />, [
    getItem('해운대점', '2'),
    getItem('청량리점', '3'),
    getItem('평촌점', '4')
  ]),
  getItem('마일리지 정산', '5', <UserOutlined />),
  getItem('Team', 'sub2', <TeamOutlined />, [
    getItem('Team 1', '6'),
    getItem('Team 2', '7')
  ])
];

interface MutationResult {
  ok: boolean;
}


const App2: NextPage = ({
  results,
  results2,

}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  
  const {user, isLoading} = useUser();
  console.log(user);
  const [logout, {data:logOutData,loading:logOutLoading , error}] = useMutation<MutationResult>("/api/users/logout");
  
  const { mutate } = useSWRConfig();
  const [collapsed, setCollapsed] = useState(false);
  const [onSelectedKeys, setOnSelectedKeys] = useState('1'); //키
  const [onData, setOndata] = useState('data');
  
  const router  = useRouter();    

  const onMenuSelected = () => {
    // console.log('메뉴가 클릭됐네 근데 무슨 메뉼');
  };
  const onLogoutClick = () => {
    // 로그아웃 처리
    console.log("로그아웃 하자!");
    logout(user);
    
    console.log("api 다녀옴");
    if(!logOutLoading){
      if(logOutData?.ok ==true ){
        console.log("로그아웃 성공");
        router.push("/login");
      }
    }
  };
  useEffect(() => {
    if (logOutData?.ok == true){
        console.log("일로오지?")
        message.success('Logout success!');  
        router.push("/login");
    }
    if (logOutData?.ok == false){
        console.log("일로오지? 2")
        message.warn('Logout 실패하였습니다!');  
        // router.push("/");
    }        
  }, [logOutData]);


  const setSelectedMenuItem = (key: string, keyPath: string[]) => {
    // console.log('메뉴 타이틀이 선택됐네 근데 무슨 타이틀이지');
    // console.log('key=', key);
    // console.log('keyPath=', keyPath);
    setOnSelectedKeys(key);
  };
  //  results['retData'][1] 안에 데이터들 존재, 


  console.log("======================================================");
  //console.log("results = ", results);
  console.log("======================================================");

  //console.log("results['retData'].length = ", results['retData'].length);

  // Item[] 에 넣기 전에 000,000 처리



  const componentsSwtich = (key: string) => {
    switch (key) {
      case '1':
        return (
          <div className=' -ml-6'>
            <Jamsil results={results} results2={results2}></Jamsil>
          </div>
        );
      case '2':
        return <h1>item2</h1>;
      case '3':
        return <h1>item3</h1>;
      case '5':
        return (
          <div className=' -ml-6'>
            <Mileage></Mileage>
          </div>          
        );       
      case '6':
        return <h1>Team 1</h1>;        
      default:
        return <h1>etc</h1>;     
    }
  };
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
      >
        <div className="logo mt-5 ml-10 ">
          <Image src={kyoboLogo} alt="logo" />
          </div> 
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          // mode="inline"
          mode="vertical"
          onSelect={onMenuSelected}
          onClick={e => setSelectedMenuItem(e.key, e.keyPath)}
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} >
        
        <Popconfirm title="로그아웃 하시겠어요？" okText="Yes" cancelText="No" okType='danger' onConfirm={onLogoutClick} >
        <div className=' mt-4 mr-4 flex justify-end'><LogoutOutlined style={{ fontSize: '32px', color: '#ffffff' }}/></div>  
        </Popconfirm>
        
        {/* <div className=' bg-white'> <LogoutOutlined /> </div>   */}
        
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {componentsSwtich(onSelectedKeys)}
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>
          Ant Design ©Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

    const date = new Date().toISOString().substring(0,10).replace(/-/g,'');
      
    const params2 = new URLSearchParams(`saleDate=${date}&storeCd=029`);
    // console.log(process.env.AIRTABLE_KEY);
    // // const results = await fetch(
    // //   `https://api.airtable.com/v0/applxcBeSTAUNuag5/Table%201`,
    // //   {
    // //     method: 'GET',
    // //     headers: {
    // //       'Content-Type': 'application/json',
    // //       Authorization: `Bearer ${process.env.AIRTABLE_KEY}`
    // //     }
    // //   }
    // // )
    const results = await fetch(
      `http://172.29.41.133:7070/kflowapi/postcommissionsaledata`,
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
  
      const results2 = await fetch(
        `http://172.29.41.133:7070/kflowapi/postcommissionsaledatabyprod`,
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
    console.log('result를 보여줘 =', results);
  return {
    props: {
      results,
      results2
    },
    // revalidate: 10, // seconds
  };
};

export default App2;

