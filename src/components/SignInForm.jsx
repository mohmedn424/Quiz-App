import { Button, Form, Input, notification } from 'antd';
import React from 'react';
import pb from '../../lib/pocketbase';
import {
  redirect,
  redirectDocument,
  useNavigate,
} from 'react-router-dom';
import Loader from './Redirect';

/*
const data = {
    "username": "test_username",
    "email": "test@example.com",
    "emailVisibility": true,
    "password": "12345678",
    "passwordConfirm": "12345678",
    "name": "test"
};

const record = await pb.collection('users').create(data);

// (optional) send an email verification request
await pb.collection('users').requestVerification('test@example.com');

*/
export default function SignInForm() {
  const [api, contextHolder] = notification.useNotification({
    rtl: true,
  });

  const navigate = useNavigate();

  const onFinish = async ({ username, password }) => {
    try {
      const record = await pb
        .collection('users')
        .authWithPassword(username, password);
      if (record.token) {
        window.location.replace('/home');
      }
    } catch (error) {
      api.error({
        placement: 'bottom',
        message: 'اسم المستخد او الباسورد غلط',
        showProgress: true,
        role: 'alert',
        style: {
          // textAlign: 'center',
        },
      });
    }
    // const record = await pb
    //   .collection('users')
    //   .authWithPassword(username, password);

    // if (record.token) {
    //   window.location.reload();
    // } else {
    //   api.open({
    //     placement: 'bottom',
    //     message: 'Notification Title',
    //   });
    // }
  };
  return (
    <>
      {contextHolder}
      <Form
        onFinish={onFinish}
        variant="outlined"
        size="large"
        style={{ textAlign: 'center', width: '80%' }}
        layout="vertical"
      >
        <Form.Item label="Username" name="username">
          <Input className="form-btn" autoComplete="trues" />
        </Form.Item>
        <Form.Item label="password" name="password">
          <Input.Password className="form-btn" autoComplete="false" />
        </Form.Item>

        <Form.Item style={{ width: '100%' }}>
          <Button
            type="default"
            htmlType="submit"
            style={{ width: '100%' }}
          >
            🤝 تسجيل دخول
          </Button>
        </Form.Item>
      </Form>

      <Button
        className="form"
        size="large"
        type="primary"
        onClick={() => navigate('/signup')}
      >
        انا لسة جديد عايز اعمل اكونت لسة
      </Button>
    </>
  );
}
