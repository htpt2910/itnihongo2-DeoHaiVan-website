import { Button, Result } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';


export const NotFound = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button href='/' type="primary">Back Home</Button>}
  />
);
