import { Form, Input, Button, Checkbox, message } from 'antd';
import { requestFunc, setLocalStorage } from '@/util';
import { withRouter } from 'react-router';

const Demo = (props: any) => {
  const onFinish = (values: any) => {
    requestFunc('/login', {
      method: 'post',
      data: values
    }).then(res => {
      if (res?.isSuccess) {
        message.success('登录成功！')
        setLocalStorage('token', res.data, 1)
        window.history.back()
      }
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ padding: '100px 0', width: 400, margin: '0 auto' }}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{
            required: true, message: '用户名不能为空!'
          }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '密码不能为空！' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>

      {/* <Button
        onClick={() => {
          requestFunc('/morain/user').then(res => {
            message.success(res?.msg)
          })
        }}>验证token</Button> */}
    </div>
  );
}

export default withRouter(Demo);