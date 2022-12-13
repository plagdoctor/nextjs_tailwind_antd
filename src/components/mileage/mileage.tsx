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

import type { ColumnsType } from 'antd/es/table';  
import { AlignType } from 'rc-table/lib/interface';  
import React, { useEffect, useState } from 'react';
import moment from "moment";
import { ConfigProvider } from "antd";

const { RangePicker } = DatePicker;

interface Item {
    HT_SALEAMT: number;
    storecd: string;
    tendertype2: string;
    TOT_SALEAMT: number;
    plugb: string;
    KB_SALEAMT: number;
    saledate: string;
  }

  interface mileageItem {
    PROCDATE: string;
    STORECD: string;
    STORENM: string;
    POSTYPE: string;
    PLUTYPE: string;
    ETC1NM: string;
    MILEAGETYPE: string;
    TRANTYPE: string;
    APPAMT: number;
    DEP1: number;
    DEP2: number;
    DEP3: number;
    SAVETYPE: string;
  }
    
  

const Mileage = () => {

    // console.log(data);
    const mileages: ColumnsType<mileageItem> = [
        {
        title: '매출일자',
        dataIndex: 'PROCDATE',
        key: 'PROCDATE',
        width: 100
        },
        {
        title: '점포코드',
        dataIndex: 'STORECD',
        key: 'STORECD',
        render: STORECD => <a>{STORECD}</a>,
        width: 100
        },
        {
        title: '점포명',
        dataIndex: 'STORENM',
        key: 'STORENM',
        render: storenm => <a>{storenm}</a>,
        width: 130
        },    
        {
        title: '포스소속구분',
        dataIndex: 'POSTYPE',
        key: 'POSTYPE',
        render: (postype) => (<Tag color={ postype == '교보문고POS' ? 'green' : 'red'} key='POSTYPE'> {postype}  </Tag>),
        width: 120,
        filters: [
          {
            text: '교보문고POS',
            value: '교보문고POS',
          },
          {
            text: '핫트랙스POS',
            value: '핫트랙스POS',
          },    
        ],
        onFilter: (value: string, record) => record.POSTYPE?.indexOf(value) === 0,             
        },
        {
        title: '매출상품구분',
        dataIndex: 'PLUTYPE',
        key: 'PLUTYPE',
        render: (PLUTYPE) => (<Tag color={ PLUTYPE == '교보문고상품' ? 'green' : 'red'} key='PLUTYPE'> {PLUTYPE}  </Tag>),
        width: 120,
        filters: [
          {
            text: '교보문고상품',
            value: '교보문고상품',
          },
          {
            text: '핫트랙스상품',
            value: '핫트랙스상품',
          },    
        ],
        onFilter: (value: string, record) => record.PLUTYPE?.indexOf(value) === 0,                
        },    
        {
        title: '회계점포코드',
        dataIndex: 'ETC1NM',
        key: 'ETC1NM',
        width: 120,
        align: 'center' as AlignType,
        },
        {
        title: '마일리지구분',
        dataIndex: 'MILEAGETYPE',
        key: 'MILEAGETYPE',
        render: (MILEAGETYPE) => (<Tag color={ MILEAGETYPE == '마일리지' ? 'geekblue' : 'blue'} key='MILEAGETYPE'> {MILEAGETYPE}  </Tag>),
        width: 120,
        filters: [
          {
            text: '통합포인트',
            value: '통합포인트',
          },
          {
            text: '마일리지',
            value: '마일리지',
          },    
        ],
        onFilter: (value: string, record) => record.MILEAGETYPE?.indexOf(value) === 0,               
        },
        {
        title: '처리구분',
        dataIndex: 'TRANTYPE',
        key: 'TRANTYPE',
        width: 100,
        },    
        {
        title: '사용금액',
        dataIndex: 'APPAMT',
        key: 'APPAMT',
        align: 'right' as AlignType,
        render: (APPAMT) => APPAMT.toLocaleString('ko-KR'),
        width: 150,
        },    
        {
        title: '기본마일리지',
        dataIndex: 'DEP1',
        key: 'DEP1',
        align: 'right' as AlignType,
        render: (DEP1) => DEP1.toLocaleString('ko-KR'),
        width: 150,
        },  
        {
        title: '추가마일리지',
        dataIndex: 'DEP2',
        key: 'DEP2',
        align: 'right' as AlignType,
        render: (DEP2) => DEP2.toLocaleString('ko-KR'),
        width: 150,
        },  
        // {
        //     title: '행사마일리지',
        //     dataIndex: 'DEP3',
        //     key: 'DEP3',
        //     align: 'right' as AlignType,
        //     render: (DEP3) => DEP3.toLocaleString('ko-KR'),
        //     width: 130,
        // },  
        {
        title: '적립경로구분',
        dataIndex: 'SAVETYPE',
        key: 'SAVETYPE',
        align: 'center' as AlignType,
        width: 150,
        }            
  ];

    let resultArray = [
        {
            PROCDATE: '',
            STORECD: '',
            STORENM: '',
            POSTYPE: '',
            PLUTYPE: '',
            ETC1NM: '',
            MILEAGETYPE: '',
            TRANTYPE: '',
            APPAMT: 0,
            DEP1: 0,
            DEP2: 0,
            DEP3: 0,
            SAVETYPE: '',
          }        

    ];
    
    let onClickResultArray: any[] = [];
    //결과 가져오기
    var data: mileageItem[];
    const [date, setDate] = useState(null);
    const [loading, setLoading] = useState(false); 
    //오늘자(now), 그달의 시작일자(firstdayOfMonth) 가져오기
    const [now,setNow] = useState(moment());
    const [firstdayOfMonth,setFirstdayOfMonth] = useState(moment(moment().format('YYYYMM'+'01')));
    const onDateChange = (
      date: Array<moment>,
      dateString: Array<string>
    ): void => {
      console.log(moment(date[0]).format('YYYYMMDD'));
      console.log(moment(date[1]).format('YYYYMMDD'));
      
      setNow(date[0]);
      setFirstdayOfMonth(date[1]);
    };

    // useEffect(() => {
    //   const now =moment();
    //   const firstdayOfMonth = moment(moment().format('YYYYMM'+'01'));
    // }, []);

    console.log("-----------------------firstdayOfMonth-----------------------");
    // console.log(firstdayOfMonth);
    // const todaySetting = (now :dayjs,now2:dayjs) => {

    // }
    const rangeDate = (value:any, value2:any) => {
        console.log("value1=" , value);
        console.log("value2=" , value2);
    }
    
    //결과 가져오기
    data = resultArray;
    
    const [newData, setnewData] = useState(data);

    const handleChange = (value: any) => {
        message.info(` ${value ? value.format('YYYY-MM-DD') : 'None'} : 일자를 선택하셨네요!`);
        setDate(value.format('YYYYMMDD'));
      };    

    
      const onActionClick = async () => {
        setLoading(true);
        // const date = new Date().toISOString().substring(0,10).replace(/-/g,'');
          // const { data } = useSWR(shouldFetch ? null : `/api/sale/${date}`);    
        try { 
          // date.toISOString().substring(0,10).replace(/-/g,'');
        const clickResults = await fetch(
          // `http://172.29.41.133:7070/kflowapi/getcommissionsaledata?storeCd=029&saleDate=${date}`
          `http://172.29.41.133:7070/kflowapi/getmileage?fromDate=${moment(firstdayOfMonth).format('YYYYMMDD')}&toDate=${moment(now).format('YYYYMMDD')}`
        )
        .then(function(response) {
          return response.json();
        })    
        .then(function(json) {
          //console.log("--------------------json--------------------------");
          //console.log(json);
          return json;})
        
    
        for (var i = 0; i < clickResults['retData'].length; i++) {
          onClickResultArray.push(clickResults['retData'][i]);
        }
    
        } catch (err) {
          console.log("error!");
          console.log(err);
        }
    
        const newList = onClickResultArray;    
        
        setnewData(newList);
    
        setLoading(false);
        //setOndata('data');
        
      };        
  return (
      <div>
          <Breadcrumb style={{ margin: '16px 0px' }}>
            <Breadcrumb.Item>통합포인트</Breadcrumb.Item>
            <Breadcrumb.Item>마일리지정산조회</Breadcrumb.Item>
          </Breadcrumb>
            <Space key ='space_1' className="flex mb-8">
              {/* <DatePicker size='large' placeholder ="매출조회일자" onChange={handleChange} /> */}
              <ConfigProvider>
                <RangePicker key= 'rangepicker_1'
                  value={[firstdayOfMonth,now]}
                  onChange={onDateChange}
                  placeholder={["시작일", "종료일"]}
                />    
              </ConfigProvider>
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
                  </Spin>  : <Table bordered key='table_2' columns={mileages} dataSource={newData} pagination={false} scroll={{  x: 900, y: 700 }}  
                    summary={(pageData) => {
                        let tot_app = 0;
                        let tot_dep1 = 0;
                        let tot_dep2 = 0;
                        let tot_dep3 = 0;
                        pageData.forEach(({ 
                            APPAMT, DEP1, DEP2, DEP3}) => {
                        // kb_saleamt.replace(/,/g, "")
                        // console.log("kb_saleamt=", kb_saleamt );
                        
                        tot_app += APPAMT;
                        tot_dep1 += DEP1;
                        tot_dep2 += DEP2;
                        tot_dep3 += DEP3;
                      });
                      return (
                        <Table.Summary fixed>
                          <Table.Summary.Row>
                            <Table.Summary.Cell index={0} colSpan={8} align='center'><Typography.Title level={4} >Total</Typography.Title></Table.Summary.Cell>
                            <Table.Summary.Cell index={8} align='right'>
                              <Typography.Title level={5} >{tot_app.toLocaleString('ko-KR')}</Typography.Title>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={9}  align='right'>
                              <Typography.Title level={5} >{tot_dep1.toLocaleString('ko-KR')}</Typography.Title>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={10}  align='right'>
                              <Typography.Title level={5} >{tot_dep2.toLocaleString('ko-KR')}</Typography.Title>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={11}  align='right'>
                              <Typography.Title level={5} >{tot_dep3.toLocaleString('ko-KR')}</Typography.Title>
                            </Table.Summary.Cell>                                                    
                          </Table.Summary.Row>
                        </Table.Summary>
                      );
                    }}
                    
                  />
                }              
              </Space>
            </div>
      </div>
  );
};

export default Mileage;
