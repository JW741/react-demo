import React from 'react';
import './index.scss'
import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import { fetchLogin } from '@/store/modules/user';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const formRef = React.useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    // 触发异步action fetchLogin
    await dispatch(fetchLogin(values))
    // 跳转首页
    navigate('/')
    // 成功提示
    message.success('登录成功')
  };

  return (
    <div className="login">
      <Card className="login-container">
        <h2>小姜知道后台管理系统</h2>
        <Form 
          ref={formRef}
          validateTrigger="onBlur"
          onFinish={onFinish}
        >
          <Form.Item
            name="mobile"
            rules={[
              {
                required: true,
                message: '请输入账号',
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '您输入的号码格式不正确',
                validateTrigger: 'onBlur'
              }
            ]}
          >
            <Input size="large" placeholder="请输入账号"/>
          </Form.Item>

          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: '请输入验证码',
              },
            ]}
          >
            <Input size="large" placeholder="请输入验证码 246810" />
          </Form.Item>

          <Form.Item
            
          >
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
            <Button className='rest' onClick={()=>formRef.current?.resetFields()}>重置</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
