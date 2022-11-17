import * as React from 'react';
import { Avatar, Input, Button, Upload } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',

  onChange ({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  }
};

export default function CreateProject () {
  return (
    <div className="create-post">
      <Avatar size={48} style={{ marginRight: '12px' }} icon={<UserOutlined />} />
      <span className="user-name">Ngô Đức Quân</span>
      <br />
      <br />
      <TextArea rows={5} />
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Ảnh/Video</Button>
      </Upload>
    </div>
  );
}
