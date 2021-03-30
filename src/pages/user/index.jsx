import React, { Component } from 'react';
import { Card, Button, Space, Modal, Form, Input, Radio, Select, DatePicker, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
import FormItem from './../../component/FormItem';
import ETable from './../../component/ETable';

export default class User extends Component {
    formRef = React.createRef()
    state = {
        visible: false,
    }

    params = {
        page: 1
    }
    formList = [
        {
            type: "INPUT",
            label: "用户名",
            name: "user_name",
            width: 120,
            placeholder: "请输入用户名",
        },
        {
            type: "DATA",
            name: "vehicle_mode",
            label: "入职时间"
        },
        {
            type: "INPUT",
            label: "手机号",
            name: "phone",
            width: 120,
            placeholder: "请输入手机号",
        },
    ]

    render() {
        const columns = [
            {
                title: '用户工号',
                dataIndex: 'user_id',
                key: 'user_id',
            },
            {
                title: '用户名',
                dataIndex: 'user_name',
                key: 'user_name',
            },
            {
                title: '性别',
                dataIndex: 'user_sex',
                key: 'user_sex',
            },

            {
                title: '年龄',
                dataIndex: 'user_age',
                key: 'user_age',

            },
            {
                title: '职位',
                dataIndex: 'status',
                key: 'status',
                render(status) {
                    return {
                        "1": "主管",
                        "2": "项目经理",
                        "3": "UI组长",
                        "4": "前端组长",
                        "5": "后端组长"
                    }[status]
                }
            },
            {
                title: '爱好',
                dataIndex: 'enjoy',
                key: 'enjoy',
                render(enjoy) {
                    return {
                        "1": "打乒乓球",
                        "2": "中国象棋",
                        "3": "王者",
                        "4": "吃鸡",
                        "5": "打篮球",
                        "6": "踢足球"
                    }[enjoy]
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                key: 'birthday',
            },
            {
                title: '联系地址',
                dataIndex: 'address',
                key: 'address',
            }
        ]
        let footer = {};
        if (this.state.type === "details") {
            footer = {
                footer: null
            }
        }
        return (
            <div style={{ width: "100%" }}>
                <Card>
                    <FormItem formList={this.formList} formListValue={this.formValue} />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Space>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => this.haddleEdit("create")}>
                            创建员工
                        </Button>
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={() => this.haddleEdit("edit")}>
                            编辑员工
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => this.haddleEdit("details")}>
                            员工详情
                        </Button>
                        <Button
                            type="danger"
                            icon={<DeleteOutlined />}
                            onClick={() => this.haddleEdit("delete")}>
                            删除员工
                        </Button>

                    </Space>
                </Card>
                <div style={{ background: "#ffffff", margin: "-2px -1px 0px -2px" }}>
                    <ETable
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={this.state.pagination}
                        updateTableValue={Utils.updateTableValue.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem={this.state.selectedItem}
                    />
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.visible}
                    onOk={this.haddleClick}
                    onCancel={() => this.setState({ visible: false })}
                    {...footer}
                >
                    <UseForm ref={this.formRef} {...this.state} />
                </Modal>
            </div>
        )
    }

    componentDidMount() {
        this.request();
    }
    //点击查询
    formValue = (value) => {
        this.params = value;
        this.request();
    }
    //请求数据
    request = () => {
        axios.requestajax(this, "/user/list", this.params);
    }
    //单机按钮，选择那种方式按钮
    haddleEdit = (type) => {
        let item = this.state.selectedItem;
        if (type === "create") {
            this.setState({
                type,
                visible: true,
                title: "创建员工"
            });
            this.request();
        } else if (type === "edit") {
            if (!item) {
                Modal.info({
                    title: "提示",
                    content: "请选择一条要编辑的员工记录"
                })
            } else {
                this.setState({
                    type,
                    title: "编辑员工",
                    visible: true,
                    user_Info: item,
                    selectedRowKeys: [],
                    selectedItem: "",
                });
            }

        } else if (type === "details") {
            if (!item) {
                Modal.info({
                    title: "提示",
                    content: "请选择一条要查看员工记录"
                })
            } else {
                this.setState({
                    type,
                    title: "员工详情",
                    visible: true,
                    user_Info: item,
                    selectedRowKeys: [],
                    selectedItem: "",
                });
            }
        } else {
            if (!item) {
                Modal.info({
                    title: "提示",
                    content: "请选择一条要删除的员工记录"
                })
            } else {
                Modal.confirm({
                    title: "提示",
                    content: `您确定要删除ID为${item.user_id}，姓名为${item.user_name}的记录吗`,
                    onOk: () => {
                        axios.ajax({
                            url: "user/delete",
                            data: {
                                params: {
                                    user_id: item.user_id
                                }
                            }
                        }).then(res => {
                            message.success(res.data.msg);
                            this.request();
                            this.setState({
                                selectedRowKeys: [],
                                selectedItem: "",
                            });
                        })
                    }
                })

            }
        }
    }
    //点击确定事件
    haddleClick = () => {
        let data = this.formRef.current.formRef.current.getFieldsValue()
        axios.ajax({
            url: "user/success",
            data: {
                params: data
            }
        }).then(res => {
            if (res.data.success === "ok") {
                this.formRef.current.formRef.current.resetFields()
                this.setState({ visible: false });
                this.request();
            }

        })

    }

}

class UseForm extends Component {
    formRef = React.createRef()

    getState(state) {
        return {
            "1": "主管",
            "2": "项目经理",
            "3": "UI组长",
            "4": "前端组长",
            "5": "后端组长"
        }[state]
    }

    render() {
        let userInfo = this.props.user_Info || {};
        const layout = {
            labelCol: {
                span: 5,
            },
            wrapperCol: {
                span: 15,
            },
        };
        return (
            <Form
                ref={this.formRef}
                {...layout}
            >
                <Form.Item
                    name="user_name"
                    label="姓名"
                    initialValue={userInfo.user_name}
                >
                    {
                        this.props.type === "details" ? userInfo.user_name
                            : <Input type="text" placeholder="请输入姓名" />
                    }
                </Form.Item>
                <Form.Item
                    label="性别"
                    name="user_sex"
                    initialValue={userInfo.user_sex}
                >
                    {
                        this.props.type === "details" ? userInfo.user_sex
                            : <Radio.Group>
                                <Radio value="男">男</Radio>
                                <Radio value="女">女</Radio>
                            </Radio.Group>
                    }
                </Form.Item>

                <Form.Item
                    label="职位"
                    name="status"
                    initialValue={userInfo.status}
                >
                    {
                        this.props.type === "details" ? this.getState(userInfo.status)
                            : <Select placeholder="请选择当前状态">
                                <Select.Option value={1}>
                                    主管
                            </Select.Option>
                                <Select.Option value={2}>
                                    项目经理
                            </Select.Option>
                                <Select.Option value={3}>
                                    UI组长
                            </Select.Option>
                                <Select.Option value={4}>
                                    前端组长
                            </Select.Option>
                                <Select.Option value={5}>
                                    后端组长
                            </Select.Option>
                            </Select>
                    }

                </Form.Item>

                <Form.Item
                    label="生日"
                    name="birthday"
                    initialValue={moment(userInfo.birthday)}
                >
                    {
                        this.props.type === "details" ? userInfo.birthday
                            : <DatePicker showTime />
                    }

                </Form.Item>

                <Form.Item
                    label="联系地址"
                    name="address"
                    initialValue={userInfo.address}
                >
                    {
                        this.props.type === "details" ? userInfo.address
                            : <Input.TextArea rows={3} placeholder="请输入您当前地址" />
                    }

                </Form.Item>
            </Form>
        )
    }
}
