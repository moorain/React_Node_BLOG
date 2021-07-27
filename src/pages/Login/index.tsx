import { Form, Input, Button, Checkbox, message } from 'antd';
import { requestFunc } from '@/util';
import { withRouter } from 'react-router';

const Demo = (props: any) => {
  const onFinish = (values: any) => {
    requestFunc('/login', {
      method: 'post',
      data: values
    }).then(res => {
      if (res?.isSuccess) {
        window.history.back()
      }
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Button
        onClick={() => {
          requestFunc('/morain/user').then(res => {
            message.success(res?.msg)
          })
        }}>验证token</Button>
    </div>
  );
}

export default withRouter(Demo);