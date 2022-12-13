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
    Popconfirm,
    ConfigProvider
  } from 'antd';

import type { ColumnsType, TableProps } from 'antd/es/table';  
import { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from 'next';
import { AlignType } from 'rc-table/lib/interface';  
import React, { useState } from 'react';
const dayjs = require("dayjs");

interface retProps {
    results : any;
    results2 : any;
  }
  

interface Item {
    key: React.Key;
    HT_SALEAMT: number;
    storecd: string;
    TENDERTYPE2: string;
    TOT_SALEAMT: number;
    PLUGB: string;
    KB_SALEAMT: number;
    saledate: string;
  }


  interface ItemProd {
    key: React.Key;
    HT_SALEAMT: number;
    storecd: string;
    TAXGB: string;
    TOT_SALEAMT: number;
    PLUGB: string;
    KB_SALEAMT: number;
    saledate: string;
  }  


const Jamsil = ({
    results,
    results2,
  }: retProps) => {

  // console.log(data);

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
      filters: [
        {
          text: '교보문고',
          value: '교보문고',
        },
        {
          text: '핫트랙스',
          value: '핫트랙스',
        },      
      ],
      onFilter: (value: string, record) => record.PLUGB?.indexOf(value) === 0,        
    },    
    {
      title: '롯데입력금권',
      dataIndex: 'TENDERTYPE2',
      key: 'TENDERTYPE2',
      // width: 120,
      render: (tendertype2) => (<Tag color={tendertype2.length > 6 ? (tendertype2.length > 9 ?  (tendertype2.length > 12 ? 'magenta' : 'blue') : 'geekblue') : 'purple' } key='TENDERTYPE2'> {tendertype2}  </Tag>),
      // render: (tendertype2) => (<Tag color={tendertype2.length > 6 ? 'red': 'purple' } key='TENDERTYPE2'> {tendertype2}  </Tag>),
      filters: [
        {
          text: '01:현금',
          value: '01:현금',
        },
        {
          text: '02:자사상품권',
          value: '02:자사상품권',
        },    
        {
          text: '03:타사상품권',
          value: '03:타사상품권',
        },    
        {
          text: '04:임대상품권',
          value: '04:임대상품권',
        },    
        {
          text: '05:브랜드마일리지',
          value: '05:브랜드마일리지',
        },                              
      ],
      onFilter: (value: string, record) => record.TENDERTYPE2?.indexOf(value) === 0,  
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

  const columnsByProd: ColumnsType<ItemProd> = [
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
      render: (PLUGB) => (<Tag color={ PLUGB == '교보문고' ? 'green' : 'red'} key='TENDERTYPE2'> {PLUGB}  </Tag>),
      filters: [
        {
          text: '교보문고',
          value: '교보문고',
        },
        {
          text: '핫트랙스',
          value: '핫트랙스',
        },      
      ],
      onFilter: (value: string, record) => record.PLUGB?.indexOf(value) === 0,  
    },    
    {
      title: '과세구분',
      dataIndex: 'TAXGB',
      key: 'TAXGB',
      render: (TAXGB) => (<Tag color={ TAXGB == '상품권' ? 'gold' : (TAXGB =='과세' ? 'geekblue' : 'purple')} key='TAXGB'> {TAXGB}  </Tag>),
      filters: [
        {
          text: '과세',
          value: '과세',
        },
        {
          text: '비과세',
          value: '비과세',
        },      
        {
          text: '상품권',
          value: '상품권',
        },      
      ],
      onFilter: (value: string, record) => record.TAXGB?.indexOf(value) === 0,        
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
    let resultArray = [];
    let resultArrayByProd = [];  
    let onClickResultArray: any[] = [];
    let onClickResultArrayByProd: any[] = [];

    //오늘날짜 
    var now = dayjs();
    
    //결과 가져오기
    var data: Item[];
    var dataByProd: ItemProd[];  
    const [date, setDate] = useState(null);
    const [loading, setLoading] = useState(false); 
    // const today = Date.now();
    
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

    const handleChange = (value: any) => {
        message.info(` ${value ? value.format('YYYY-MM-DD') : 'None'} : 일자를 선택하셨네요!`);
        setDate(value.format('YYYYMMDD'));
      };    


    const onChange: TableProps<Item>['onChange'] = ( filters, sorter, extra) => {
      console.log('params',  filters, sorter, extra);
    };
          
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
  return (
      <div>
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
            <div className="">
              <Space key ='space_2' className="mb-8" align='start' wrap>
              {
                  loading ?
                  <Spin tip="Loading..." size="large">
                  </Spin>  : 
                  <Table bordered key='table_1' 
                  className="mr-4"
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
                  </Spin>  : <Table bordered key='table_2' columns={columns} dataSource={newData} pagination={false} onChange={onChange} 
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
      </div>
  );
};

export default Jamsil;
