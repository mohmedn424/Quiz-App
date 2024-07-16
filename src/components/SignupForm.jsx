import { Button, Form, Input } from 'antd';
import React from 'react';
import pb from '../../lib/pocketbase';
import { useNavigate } from 'react-router-dom';

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
export default function SignupForm() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const data = {
      username: values.username,
      password: values.password,
      passwordConfirm: values.password,
      name: values.name,
      scores: [],
      finished_levels: {},
    };

    const record = await pb.collection('users').create(data);
    const loginRec = await pb
      .collection('users')
      .authWithPassword(values.username, values.password);
    if (record.id) window.location.replace('/home');
  };
  return (
    <>
      <Form
        onFinish={onFinish}
        variant="outlined"
        size="large"
        layout="vertical"
        className="form"
      >
        <Form.Item label="Name" name="name">
          <Input
            autoComplete="true"
            dir="auto"
            className="form-btn"
            placeholder="😉 اكتب اسمك هنا"
          />
        </Form.Item>
        <Form.Item label="Username" name="username">
          <Input className="form-btn" autoComplete="true" />
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
            تسجيل
          </Button>
        </Form.Item>
      </Form>

      <Button
        className="form"
        size="large"
        type="primary"
        onClick={() => navigate('/login')}
      >
        انا مسجل قبل كدة يا صاحبي
      </Button>
    </>
  );
}
