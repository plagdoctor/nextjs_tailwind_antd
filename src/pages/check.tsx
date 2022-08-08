import { Button, DatePicker } from 'antd';
import type { NextPage } from 'next';
import { blue } from '@ant-design/colors';

const Check: NextPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-primary">
        Hello world!
      </h1>

      <Button size="large" type="primary">
        Button
      </Button>

      <Button size="large" type="primary" className='bg-secondary border-primary'>
        Button
      </Button>
      <DatePicker></DatePicker>
    </div>
  );
};

export default Check;