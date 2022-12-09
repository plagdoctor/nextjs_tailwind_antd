import type { NextPage } from 'next';

import { Button, Checkbox, Form, Input, Space } from 'antd';

import enterImage from '@public/img/enterimage.png'
import logoImage from '@public/img/logo.png'
import { useState } from 'react';
import Image from 'next/image';

const Enter: NextPage = () => {
    
  const [random, setRandom] = useState<number>();
  return (
    <div className=' back'>
        <div className=' h-[800px] w-[1440px] absolute -z-10'>
        {/* <Image src={enterImage} height={800} width={1440} className=' h-[800px] w-[1440px]' alt='enter'  /> */}
        <Image
            layout="fill"
            objectFit="cover"
            quality={100}
            src={enterImage} className=' '  alt='enter' 
            />
        <div className=' ml-[95px] mt-[34px] absolute '  >
            <Image
            height={66}
            width={203}
            quality={100}
            src={logoImage} alt='logo' 
            /> 
        </div>
           
        <div className=' mt-[58px] absolute '>  {/* navBar*/}

            <div className=' ml-[] flex relative '>
                <p className=' ml-[958px] text-white'>Groupware</p>
                <p className=' ml-[24px] text-white'>Contact</p>
                <p className=' ml-[24px] text-white'>About</p>
                <button className='ml-[24px] bg-[#4c4f4b] text-white w-[94px] h-[34px] rounded-full shadow-sm font-medium focus:ring-2 focus:ring-offset-1 focus:ring-orange-500 focus:outline-none'>Login</button>
            </div>
        </div>

                

        <div className=' p-2 border-2 border-white mt-[200px] ml-11 absolute z-10' >  {/* rectangle-copy */}
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
            <Form.Item
                label="사원번호"
                name="사원번호"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="비밀번호"
                name="비밀번호"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>
            </Form>

        </div>
        {/* <div className=' p-2 border-8 bg-primary ' >  
            <p className='text-2 text-white'>Login</p>
        </div>         */}
        <div className='group-2'>
            <div className='rectangle-2' />
            <p className='text-6'>Login</p>
            <p className='text-7'>우리의 사명은 모든 사람이 다양한 지식 및 (예술)문화콘텐츠를
                경험해 지적/문화적/사회적으로 성장할 수 있도록
                도와드리는 것입니다.</p>
        </div>
        <div className='group-2-.-1'>
            <div className='rectangle-2' />
            <p className='text-8'>Sign in</p>
        </div>
        {/* <img src='' /> */}
        </div>  
    </div>
  );
};

export default Enter;
