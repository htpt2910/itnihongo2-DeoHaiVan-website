import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal } from 'antd';
import CreatePost from './CreatePost';

export default function ButtonCreate () {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        style={{ border: 'none', padding: '0 16px', width: '138px', height: '50px' }}
        type="primary"
        onClick={() => setOpen(true)}>
        + Đăng Bài
      </Button>
      <Modal
        title="Tạo bài viết"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={600}
      >
        <CreatePost />
      </Modal>
    </>
  );
}
