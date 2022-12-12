import { Form, 
    Input,
    Checkbox,
    Button,
    message
  } from 'antd';
  
  import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    LockOutlined
  } from '@ant-design/icons';
  import type { NextPage } from 'next';
  
import enterImage from '@public/img/bgimage-3.jpg'
import logoImage from '@public/img/logo.png'

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import useMutation from '@libs/client/useMutation';

interface LoginProfile{
    empno:String;
    empname:String;
}

interface MutationResult {
    ok: boolean;
    user: LoginProfile
  }

const Enter: NextPage = () => {

    const [enter, {loading, data, error}] = useMutation<MutationResult>("/api/users/enter");
    const [onLogin, setOnLogin] = useState(false);
    const [onSubmit, setOnSubmit] = useState(false);  
    const router  = useRouter();    
    
    useEffect(() => {
        if (data?.ok == true){
            console.log("일로오지?")
            message.success('Login success!');  
            router.push("/");
        }
        if (data?.ok == false){
            console.log("일로오지?")
            message.warn('Login 실패하였습니다!');  
            // router.push("/");
        }        
      }, [data]);

    const onFinish = (values: any) => {
        setOnLogin(false);
        setOnSubmit(true);
        console.log('Success:', values);
        console.log('username:', values.username);
        console.log('password:', values.password);
        let empNo = values.username;
        let empPassword = values.password;
        enter({empNo, empPassword});
        // enterLogin();
        setTimeout(() => {
            setOnSubmit(false);
        }, 2000);
      };

    // const onFinishFailed = (errorInfo: any) => {
    //     console.log('Failed:', errorInfo);
    // };

  return (
    <div className="w-full flex flex-wrap">

    <div className="w-full md:w-1/2 flex flex-col">
        {/* <div className=" flex mt-2 justify-end md:justify-start md:pl-12 md:-mb-12 absolute z-10">
            <a href="#" className="bg-black text-white font-bold text-xl p-4" >Logo</a>
        </div>     */}
        <div className="flex flex-col justify-center md:justify-start my-auto md: mt-12 px-8 md:px-24 lg:px-32">
            <div className="text-center text-3xl">오프라인 백화점입점</div>
            <div className="text-center text-3xl">정산관리시스템</div>
            
            <div className="flex flex-col pt-4">
                
                <Form
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                initialValues={{
                    remember: true,
                }} >
                    <label className="text-lg font-sans">사원번호</label>
                    <Form.Item
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: '사원번호를 입력해주세요!',
                        },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="사원번호를 입력해주세요. ex) 12975" />

                    </Form.Item>
                    <label className="text-lg font-sans">비밀번호</label>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '패스워드를 입력해주세요!' }]}
                    >
                        <Input.Password prefix={<UserOutlined className="site-form-item-icon" />} placeholder="비밀번호를 입력해주세요. ex) 통합유통 로그인 비밀번호" />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 0, span: 16 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item name="submit" wrapperCol={{ offset: 0, span: 24 }}>
                        <Button type="default" 
                                htmlType="submit" 
                                // onClick={() => setOnSubmit(true)}
                                block
                                loading={onSubmit} 
                                >
                        Login
                        </Button>
                    </Form.Item>                    
                </Form>
            </div>
        </div>

    </div>
    <div className="w-1/2 shadow-2xl hidden md:block">
        <div className="mt-12 ml-14 md:block absolute z-10">
            <Image className="object-cover w-full h-screen hidden md:block" src={logoImage} alt="logo" /> 
        </div>    
        { (! enterImage) ? <></>: <Image 
                                        className="object-cover w-full h-screen hidden md:block" 
                                        // height={4000}
                                        height={3000}
                                        src={enterImage} 
                                        alt="Background" /> }
    </div>
</div>
  );
};

export default Enter;
