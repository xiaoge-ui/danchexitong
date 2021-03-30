import React, { Component } from 'react';
import { Card, Form, Input, Button, Space, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

class FormLogin extends Component {

    onFinish = (value) => {
        message.info(`${value.username}，进入我的大家庭，密码是：${value.password}`)
    }

    render() {
        return (
            <div style={{ width: "100%" }}>
                <Card title="内联登录模块" style={{ marginBottom: 10 }}>
                    <Form layout="inline">
                        <Form.Item>
                            <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item>
                            <Input type="password" prefix={<LockOutlined />} placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item>
                            <Space>
                                <Button type='primary'>登录</Button>
                                <Button type='dashed'>注册</Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Card>

                <Card title="水平登录模块">
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        style={{ width: "300px" }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }, { min: 6, max: 16, message: "长度应在6-16个字符" }]}
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

                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <a href="#" style={{ float: "right" }}>忘记密码</a>
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default FormLogin;
