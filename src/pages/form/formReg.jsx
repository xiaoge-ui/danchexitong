import React, { Component } from 'react';
import { Card, Button, Input, Form, Radio, InputNumber, Select, Switch, DatePicker, Rate, Upload, Checkbox, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default class FormReg extends Component {

    onFinish = (value) => {
        message.success(`恭喜${value.userName}您已注册成功`);
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 8 },
        }
        return (
            <div style={{ width: "100%" }}>
                <Card title="注册模块">
                    <Form {...formItemLayout} onFinish={this.onFinish}>
                        <Form.Item
                            label="用户名"
                            name="userName"
                            rules={[{ required: true, message: '用户名不能为空' }, { min: 2, max: 16, message: "长度应在2-16个字符" }]}
                        >
                            <Input placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            name="userPwd"
                            rules={[{ required: true, message: '密码不能为空!' }, { min: 6, max: 16, message: "长度应在6-16个字符" }]}
                        >
                            <Input type="password" placeholder="密码" />
                        </Form.Item>

                        <Form.Item
                            label="性别"
                            name="radio"
                        >
                            <Radio.Group defaultValue="nan">
                                <Radio value="nan">男</Radio>
                                <Radio value="nv">女</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            label="年龄"
                            name="age"
                        >
                            <InputNumber min={18} max={28} defaultValue={18} />
                        </Form.Item>

                        <Form.Item
                            label="权限等级"
                            name="select"
                        >
                            <Select defaultValue="VIP1">
                                <Select.Option value="VIP1">VIP1</Select.Option>
                                <Select.Option value="VIP4">VIP4</Select.Option>
                                <Select.Option value="VIP5">VIP5</Select.Option>
                                <Select.Option value="VIP8">VIP8</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="爱好"
                            name="selects"
                        >
                            <Select defaultValue={['1', '5', '7']} mode="multiple"
                                allowClear>
                                <Select.Option value="1">踢足球</Select.Option>
                                <Select.Option value="2">打乒乓球</Select.Option>
                                <Select.Option value="3">打篮球</Select.Option>
                                <Select.Option value="4">跳绳</Select.Option>
                                <Select.Option value="5">王者荣耀</Select.Option>
                                <Select.Option value="6">吃鸡</Select.Option>
                                <Select.Option value="7">飞车</Select.Option>
                                <Select.Option value="8">LOL</Select.Option>
                                <Select.Option value="9">钱</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="是否已婚"
                            name="switch"
                            rules={[{ required: true }]}
                        >
                            <Switch defaultChecked />
                        </Form.Item>

                        <Form.Item
                            label="生日"
                            name="birthry"
                            rules={[{ required: true }]}
                        >
                            <DatePicker showTime />
                        </Form.Item>

                        <Form.Item
                            label="幸运指数"
                            name="luckly"
                        >
                            <Rate allowHalf defaultValue={2.5} />
                        </Form.Item>

                        <Form.Item
                            label="家庭地址"
                            name="address"
                        >
                            <Input.TextArea rows={3} defaultValue="河北省邢台市" />
                        </Form.Item>

                        <Form.Item
                            label="上传图片"
                            name="upload"
                        >
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                            >
                                <UploadOutlined />
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            name="checkbox"
                            wrapperCol={{ span: 8, offset: 6 }}
                        >
                            <Checkbox >我已阅读<a href="#">大波仔俱乐部详情</a></Checkbox>
                        </Form.Item>

                        <Form.Item
                            name="btn"
                            wrapperCol={{ span: 8, offset: 6 }}
                        >
                            <Button type="primary" htmlType="submit">
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div >
        )
    }
}
