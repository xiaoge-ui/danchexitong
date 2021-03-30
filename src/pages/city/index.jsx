import React, { Component } from 'react'
import { Card, Button, Table, Select, Form, Modal, message } from 'antd';
import axios from './../../axios';
import Utils from './../../utils/utils';

export default class City extends Component {

    form = React.createRef();
    state = {
        visible: false,
    }
    params = {
        page: 1
    }
    //开通城市
    haddleOpenCity = () => {
        this.setState({ visible: true });
    }
    //添加开通城市
    haddleClick = () => {
        const fieldsValue = this.form.current.form.current.getFieldValue();
        //fieldsValue即为表单内的值
        // console.log("haddleClick", fieldsValue)
        axios.ajax({
            url: "/open",
            data: {
                params: { fieldsValue }
            }
        }).then(res => {
            this.setState({ visible: false });
            message.success(res.data.msg);
            this.request();
        })
    }
    render() {
        const columns = [
            {
                title: '城市ID',
                dataIndex: 'ID',
                key: 'ID',
            },
            {
                title: '城市名称',
                dataIndex: 'city_name',
                key: 'city_name',
            },
            {
                title: '用车模式',
                dataIndex: 'vehicle_mode',
                key: 'vehicle_mode',
                render: (value) => {
                    return value === 1 ? "指定点停车模式" : "禁停区模式"
                }
            },
            {
                title: '营运模式',
                dataIndex: 'operation_mode',
                key: 'operation_mode',
                render: (value) => {
                    return value === 1 ? "自营" : "加盟"
                }
            },
            {
                title: '授权加盟商',
                dataIndex: 'auth_join',
                key: 'auth_join',
            },
            {
                title: '城市管理员',
                dataIndex: 'city_administrator',
                key: 'city_administrator',
                render: (value) => {
                    // console.log(value);
                    return value.map(item => {
                        item = item.user_name;
                        return item;
                    }).join(',')
                }
            },
            {
                title: '城市开通时间',
                dataIndex: 'open_time',
                key: 'open_time',
            },
            {
                title: '操作时间',
                dataIndex: 'operation_time',
                key: 'operation_time',
                render: (value) => {
                    return Utils.showTime(value)
                }
            },
            {
                title: '操作人',
                dataIndex: 'operator',
                key: 'operator',
            },
        ]
        return (
            <div style={{ width: "100%" }}>
                <Card style={{ marginBottom: 20 }}>
                    <FilterForm {...this} />
                </Card>
                <Card>
                    <Button type="primary" onClick={this.haddleOpenCity}>开通城市</Button>
                </Card>
                <div style={{ background: "#ffffff", margin: "-2px -1px 0px -2px" }}>
                    <Table
                        columns={columns}
                        bordered
                        dataSource={this.state.dataSource}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal
                    title="开通城市"
                    visible={this.state.visible}
                    onOk={this.haddleClick}
                    onCancel={() => { this.setState({ visible: false }); }}
                >
                    <FormItem ref={this.form} />
                </Modal>
            </div>
        )
    }

    componentDidMount() {
        this.request()

    }

    //获取开通城市数据
    request = () => {
        axios.ajax({
            url: "/open/city",
            data: {
                params: {
                    page: this.params.page,
                }
            }
        }).then(res => {
            this.setState(
                {
                    dataSource: res.data.result.list,
                    pagination: Utils.pageState(res.data, (current) => {
                        this.params.page = current;
                        this.request();
                    })
                }
            );
        })
    }
}
class FilterForm extends Component {
    formItem = React.createRef();

    render() {
        return (
            <Form
                layout="inline"
                ref={this.formItem}
            >
                <Form.Item
                    label="城市"
                    name="city_select"
                >
                    <Select style={{ width: 100 }} placeholder="全部">
                        <Select.Option value="">全部</Select.Option>
                        <Select.Option value="1">北京市</Select.Option>
                        <Select.Option value="2">河北省</Select.Option>
                        <Select.Option value="3">天津市</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="用车模式"
                    name="vehicle_mode"
                >
                    <Select style={{ width: 130 }} placeholder="全部">
                        <Select.Option value="">全部</Select.Option>
                        <Select.Option value="1">指定点停车模式</Select.Option>
                        <Select.Option value="2">禁停区模式</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="运营模式"
                    name="operation_mode"
                >
                    <Select style={{ width: 80 }} placeholder="全部">
                        <Select.Option value="">全部</Select.Option>
                        <Select.Option value="1">自营</Select.Option>
                        <Select.Option value="2">加盟</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="加盟商授权状态"
                    name="auth_status"
                >
                    <Select style={{ width: 100 }} placeholder="全部">
                        <Select.Option value="">全部</Select.Option>
                        <Select.Option value="1">自营</Select.Option>
                        <Select.Option value="2">加盟</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item >
                    <Button type="primary" style={{ margin: "0px 20px" }} onClick={(e) => { this.props.request() }}>查询</Button>
                    <Button onClick={() => this.formItem.current.resetFields()}>重置</Button>
                </Form.Item>
            </Form>
        )
    }
}

class FormItem extends Component {
    form = React.createRef();

    render() {
        return (
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 9 }}
                ref={this.form}
            >
                <Form.Item
                    label="选择城市"
                    name="city_select"
                    initialValue="1"
                >
                    <Select placeholder="全部">
                        <Select.Option value="1">北京市</Select.Option>
                        <Select.Option value="2">河北省</Select.Option>
                        <Select.Option value="3">天津市</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="用车模式"
                    name="vehicle_mode"
                    initialValue="1"
                >
                    <Select placeholder="全部">
                        <Select.Option value="1">指定点停车模式</Select.Option>
                        <Select.Option value="2">禁停区模式</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="运营模式"
                    name="operation_mode"
                    initialValue="1"
                >
                    <Select placeholder="全部">
                        <Select.Option value="1">自营</Select.Option>
                        <Select.Option value="2">加盟</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        )
    }
}