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
import type { ColumnsType } from 'antd/es/table';
import { URLSearchParams } from 'url';
import useSWR, { useSWRConfig } from "swr";
import { AlignType } from 'rc-table/lib/interface';
import {HashLoader} from 'react-spinners';
import useUser from '@libs/client/useUser';
  
import kyoboLogo from '@public/img/logo_kyobo.png'
import Image from 'next/image';
import useMutation from '@libs/client/useMutation';
import { useRouter } from 'next/router';

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

interface Item {
  HT_SALEAMT: number;
  storecd: string;
  tendertype2: string;
  TOT_SALEAMT: number;
  plugb: string;
  KB_SALEAMT: number;
  saledate: string;
}

interface retProps {
  results : any;
  results2 : any;
}

interface MutationResult {
  ok: boolean;
}


const App2: NextPage = ({
  results,
  results2
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  
  const {user, isLoading} = useUser();
  console.log(user);
  const [logout, {data:logOutData,loading:logOutLoading , error}] = useMutation<MutationResult>("/api/users/logout");
  
  const { mutate } = useSWRConfig();
  const [collapsed, setCollapsed] = useState(false);
  const [onSelectedKeys, setOnSelectedKeys] = useState('1'); //키
  const [onData, setOndata] = useState('data');

  const [date, setDate] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const router  = useRouter();    
  //결과 가져오기
  var data: Item[];
  var dataByProd: Item[];

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
        router.push("/");
    }
    if (logOutData?.ok == false){
        console.log("일로오지? 2")
        message.warn('Logout 실패하였습니다!');  
        // router.push("/");
    }        
  }, [logOutData]);

  const handleChange = (value: any) => {
    message.info(` ${value ? value.format('YYYY-MM-DD') : 'None'} : 일자를 선택하셨네요!`);
    setDate(value.format('YYYYMMDD'));
  };
  const setSelectedMenuItem = (key: string, keyPath: string[]) => {
    // console.log('메뉴 타이틀이 선택됐네 근데 무슨 타이틀이지');
    // console.log('key=', key);
    // console.log('keyPath=', keyPath);
    setOnSelectedKeys(key);
  };
  //  results['retData'][1] 안에 데이터들 존재, 

  let resultArray = [];
  let resultArrayByProd = [];
  let onClickResultArray: any[] = [];
  let onClickResultArrayByProd: any[] = [];

  console.log("======================================================");
  //console.log("results = ", results);
  console.log("======================================================");

  //console.log("results['retData'].length = ", results['retData'].length);

  // Item[] 에 넣기 전에 000,000 처리
  for (var i = 0; i < results['retData'].length; i++) {
    // //console.log(results['retData'][i]);
    // results['retData'][i]['KB_SALEAMT'] = results['retData'][i]['KB_SALEAMT'].toLocaleString('ko-KR');
    // results['retData'][i]['HT_SALEAMT'] = results['retData'][i]['HT_SALEAMT'].toLocaleString('ko-KR');
    // results['retData'][i]['TOT_SALEAMT'] = results['retData'][i]['TOT_SALEAMT'].toLocaleString('ko-KR');
    // 배열에 push
    resultArray.push(results['retData'][i]);
  }  

  for (var i = 0; i < results2['retData'].length; i++) {
    //console.log(results['retData'][i]);
    // results2['retData'][i]['KB_SALEAMT'] = results2['retData'][i]['KB_SALEAMT'].toLocaleString('ko-KR');
    // results2['retData'][i]['HT_SALEAMT'] = results2['retData'][i]['HT_SALEAMT'].toLocaleString('ko-KR');
    // results2['retData'][i]['TOT_SALEAMT'] = results2['retData'][i]['TOT_SALEAMT'].toLocaleString('ko-KR');
    // 배열에 push
    resultArrayByProd.push(results2['retData'][i]);
  } 
  //결과 가져오기
  data = resultArray;
  dataByProd = resultArrayByProd;
  
  const [newData, setnewData] = useState(data);
  const [newDataByProd, setnewDataByProd] = useState(dataByProd);
  // console.log(data);
  
  const onActionClick = async () => {
    console.log("온클릭 ㄱㄱ");
    setLoading(true);
    // const date = new Date().toISOString().substring(0,10).replace(/-/g,'');
      // const { data } = useSWR(shouldFetch ? null : `/api/sale/${date}`);    
    try { 
      // date.toISOString().substring(0,10).replace(/-/g,'');
    const clickResults = await fetch(
      // `http://172.29.41.133:7070/kflowapi/getcommissionsaledata?storeCd=029&saleDate=${date}`
      `http://172.29.41.133:7070/kflowapi/getcommissionsaledata?storeCd=029&saleDate=${date}`
    )
    .then(function(response) {
      return response.json();
    })    
    .then(function(json) {
      //console.log("--------------------json--------------------------");
      //console.log(json);
      return json;})
    

    for (var i = 0; i < clickResults['retData'].length; i++) {
      
      // clickResults['retData'][i]['KB_SALEAMT'] = clickResults['retData'][i]['KB_SALEAMT'].toLocaleString('ko-KR');
      // clickResults['retData'][i]['HT_SALEAMT'] = clickResults['retData'][i]['HT_SALEAMT'].toLocaleString('ko-KR');
      // clickResults['retData'][i]['TOT_SALEAMT'] = clickResults['retData'][i]['TOT_SALEAMT'].toLocaleString('ko-KR');
      onClickResultArray.push(clickResults['retData'][i]);
      
    }

    } catch (err) {
      console.log("error!");
      console.log(err);
    }

    try { 
      // date.toISOString().substring(0,10).replace(/-/g,'');
    const clickResultsByProd = await fetch(
      // `http://172.29.41.133:7070/kflowapi/getcommissionsaledata?storeCd=029&saleDate=${date}`
      `http://172.29.41.133:7070/kflowapi/getcommissionsaledatabyprod?storeCd=029&saleDate=${date}`
    )
    .then(function(response) {
      return response.json();
    })    
    .then(function(json) {
      //console.log("--------------------json--------------------------");
      //console.log(json);
      return json;})
    

    for (var i = 0; i < clickResultsByProd['retData'].length; i++) {
      
      // clickResultsByProd['retData'][i]['KB_SALEAMT'] = clickResultsByProd['retData'][i]['KB_SALEAMT'].toLocaleString('ko-KR');
      // clickResultsByProd['retData'][i]['HT_SALEAMT'] = clickResultsByProd['retData'][i]['HT_SALEAMT'].toLocaleString('ko-KR');
      // clickResultsByProd['retData'][i]['TOT_SALEAMT'] = clickResultsByProd['retData'][i]['TOT_SALEAMT'].toLocaleString('ko-KR');
      console.log(clickResultsByProd['retData'][i]['KB_SALEAMT']);
      onClickResultArrayByProd.push(clickResultsByProd['retData'][i]);
      
    }

    } catch (err) {
      console.log("error!");
      console.log(err);
    }

    const newList = onClickResultArray;    
    const newListByProd = onClickResultArrayByProd;
    
    setnewData(newList);
    setnewDataByProd(newListByProd);

    setLoading(false);
    //setOndata('data');
    
  };  
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
      key: 'PLUGB',
      render: (plugb) => (<Tag color={ plugb == '교보문고' ? 'green' : 'red'} key='TENDERTYPE2'> {plugb.toUpperCase()}  </Tag>),
    },    
    {
      title: '롯데입력금권',
      dataIndex: 'TENDERTYPE2',
      key: 'TENDERTYPE2',
      render: (tendertype2) => (<Tag color={tendertype2.length > 6 ? (tendertype2.length > 9 ?  (tendertype2.length > 12 ? 'magenta' : 'blue') : 'geekblue') : 'purple' } key='TENDERTYPE2'> {tendertype2}  </Tag>),
      // render: (tendertype2) => (<Tag color={tendertype2.length > 6 ? 'red': 'purple' } key='TENDERTYPE2'> {tendertype2}  </Tag>),

    },
    {
      title: 'KB포스매출',
      dataIndex: 'KB_SALEAMT',
      key: 'KB_SALEAMT',
      align: 'right' as AlignType,
      render: (KB_SALEAMT) => KB_SALEAMT.toLocaleString('ko-KR'),
    },    
    {
      title: 'KH포스매출',
      dataIndex: 'HT_SALEAMT',
      key: 'HT_SALEAMT',
      align: 'right' as AlignType,
      render: (HT_SALEAMT) => HT_SALEAMT.toLocaleString('ko-KR'),
    },

    {
      title: '합계 매출',
      dataIndex: 'TOT_SALEAMT',
      key: 'TOT_SALEAMT',
      align: 'right' as AlignType,
      render: (TOT_SALEAMT) => TOT_SALEAMT.toLocaleString('ko-KR'),
    }
  ];

  const columnsByProd: ColumnsType<Item> = [
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
      key: 'PLUGB',
      render: (plugb) => (<Tag color={ plugb == '교보문고' ? 'green' : 'red'} key='TENDERTYPE2'> {plugb.toUpperCase()}  </Tag>),
    },    
    {
      title: '과세구분',
      dataIndex: 'TAXGB',
      key: 'TAXGB',
      render: (taxgb) => (<Tag color={ taxgb == '상품권' ? 'gold' : (taxgb =='과세' ? 'geekblue' : 'purple')} key='TENDERTYPE2'> {taxgb}  </Tag>),
    },  
    {
      title: 'KB포스매출',
      dataIndex: 'KB_SALEAMT',
      key: 'KB_SALEAMT',
      align: 'right' as AlignType,
      render: (KB_SALEAMT) => KB_SALEAMT.toLocaleString('ko-KR'),
    },    
    {
      title: 'KH포스매출',
      dataIndex: 'HT_SALEAMT',
      key: 'HT_SALEAMT',
      align: 'right' as AlignType,
      render: (HT_SALEAMT) => HT_SALEAMT.toLocaleString('ko-KR'),
    },

    {
      title: '합계 매출',
      dataIndex: 'TOT_SALEAMT',
      key: 'TOT_SALEAMT',
      align: 'right' as AlignType,
      render: (TOT_SALEAMT) => TOT_SALEAMT.toLocaleString('ko-KR'),
    }
  ];

  const componentsSwtich = (key: string) => {
    switch (key) {
      case '1':
        return (
          <div className=' -ml-6'>
          <Breadcrumb style={{ margin: '16px 0px' }}>
            <Breadcrumb.Item>잠실점</Breadcrumb.Item>
            <Breadcrumb.Item>롯데 수수료 매출정산</Breadcrumb.Item>
          </Breadcrumb>
            <Space key ='space_1' className="flex mb-8">
              <DatePicker size='large' placeholder ="매출조회일자" onChange={handleChange} />
              {/* <RangePicker key= 'rangepicker_1'
                onChange={(e) => console.log(e)}
                placeholder={["시작일", "종료일"]}
              />               */}
              {/* <Alert message="Selected Date" description={date ? date : 'None'} /> */}
              <Button key ='btn_1' size="middle" type="default" onClick={onActionClick} >
                매출조회
              </Button>
              {/* <HashLoader color="#36d7b7" /> */}
              { loading ?
                
                <Tag icon={<SyncOutlined spin />} color="processing">
                  processing
                </Tag>   : <></>           
              }
            </Space>
            <Space key ='space_2' className=" space-x-4 mb-8" align='start'>
            {
                loading ?
                <Spin tip="Loading..." size="large">
                </Spin>  : 
                <Table bordered key='table_1' 
                  columns={columnsByProd} 
                  dataSource={newDataByProd} 
                  pagination={false} 
                  summary={(pageData) => {
                      let total_kb_saleamt = 0;
                      let total_ht_saleamt = 0;
                      let total_tot_saleamt = 0;
                      console.log("==============pageData==============");
                      console.log(pageData);
                      pageData.forEach(({ KB_SALEAMT, HT_SALEAMT, TOT_SALEAMT }) => {
                      // kb_saleamt.replace(/,/g, "")
                      // console.log("kb_saleamt=", kb_saleamt );
                      
                      total_kb_saleamt += KB_SALEAMT;
                      total_ht_saleamt += HT_SALEAMT;
                      total_tot_saleamt += TOT_SALEAMT;
                    });
                    return (
                      <>
                        <Table.Summary.Row>
                          <Table.Summary.Cell index={0} colSpan={4} align='center'>Total</Table.Summary.Cell>
                          <Table.Summary.Cell index={4} align='right'>
                            <Typography.Title level={5} >{total_kb_saleamt.toLocaleString('ko-KR')}</Typography.Title>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={5}  align='right'>
                            <Typography.Title level={5} >{total_ht_saleamt.toLocaleString('ko-KR')}</Typography.Title>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={6}  align='right'>
                            <Typography.Title level={5} >{total_tot_saleamt.toLocaleString('ko-KR')}</Typography.Title>
                          </Table.Summary.Cell>                          
                        </Table.Summary.Row>
                      </>
                    );
                  }}
                />
              }              
              
              {/* {
                onData == 'clickData' ? (<Table key='table_2' columns={columns} dataSource={clickData} />): (<Table key='table_2' columns={columns} dataSource={[...data]} />)
              } */}
              {
                loading ?
                <Spin tip="Loading..." size="large">
                </Spin>  : <Table bordered key='table_2' columns={columns} dataSource={newData} pagination={false} 
                  summary={(pageData) => {
                      let total_kb_saleamt = 0;
                      let total_ht_saleamt = 0;
                      let total_tot_saleamt = 0;
                      console.log("==============pageData==============");
                      console.log(pageData);
                      pageData.forEach(({ KB_SALEAMT, HT_SALEAMT, TOT_SALEAMT }) => {
                      // kb_saleamt.replace(/,/g, "")
                      // console.log("kb_saleamt=", kb_saleamt );
                      
                      total_kb_saleamt += KB_SALEAMT;
                      total_ht_saleamt += HT_SALEAMT;
                      total_tot_saleamt += TOT_SALEAMT;
                    });
                    return (
                      <>
                        <Table.Summary.Row>
                          <Table.Summary.Cell index={0} colSpan={4} align='center'>Total</Table.Summary.Cell>
                          <Table.Summary.Cell index={4} align='right'>
                            <Typography.Title level={5} >{total_kb_saleamt.toLocaleString('ko-KR')}</Typography.Title>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={5}  align='right'>
                            <Typography.Title level={5} >{total_ht_saleamt.toLocaleString('ko-KR')}</Typography.Title>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={6}  align='right'>
                            <Typography.Title level={5} >{total_tot_saleamt.toLocaleString('ko-KR')}</Typography.Title>
                          </Table.Summary.Cell>                          
                        </Table.Summary.Row>
                      </>
                    );
                  }}
                />
              }
              
            </Space>
          </div>
        );
      case '2':
        return <h1>item2</h1>;
      case '3':
        return <h1>item3</h1>;
      case '5':
        return <h1>마일리지 정산</h1>;       
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
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {

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
  // console.log('result를 보여줘 =', results);

  return {
    props: {
      results,
      results2
    }
  };
};

export default App2;

