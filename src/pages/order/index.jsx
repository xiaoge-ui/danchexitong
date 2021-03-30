import React, { Component } from 'react';
import { Card, Button, Form, Space, Modal, message } from 'antd';
import FormItem from './../../component/FormItem/index';
import axios from './../../axios';
import ETable from './../../component/ETable';
import Utils from './../../utils/utils';

export default class Order extends Component {

    state = {
        formInfo: {},
        visible: false,
        selectedRowKeys: [],
    }
    params = {
        page: 1
    }
    formList = [
        {
            type: "SELECT",
            label: "城市",
            name: "city_select",
            width: 120,
            placeholder: "全部",
            list: [{ id: "0", value: "全部" }, { id: "1", value: "北京市" }, { id: "2", value: "河北省" }, { id: "3", value: "天津市" },]
        },
        {
            type: "时间控件",
            name: "vehicle_mode",
            label: "订单时间"
        },
        {
            type: "SELECT",
            label: "运营模式",
            name: "operation_mode",
            width: 120,
            placeholder: "全部",
            list: [{ id: "0", value: "全部" }, { id: "1", value: "进行中" }, { id: "2", value: "已完成" }]
        },
    ]
    //单击结束订单
    haddleClick = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: "提示信息",
                content: "请选择一条信息来结束订单"
            })
            return;
        }
        axios.ajax({
            url: "/order/bike_info",
            data: {
                params: {
                    order_id: item.order_id,
                }
            }
        }).then(res => {
            this.setState({
                visible: true,
                formInfo: res.data.result,
            });
        })
    }
    //点击模态框中的确认按钮，
    haddleFinish = () => {
        let item = this.state.selectedItem;
        axios.ajax({
            url: "/order/success",
            data: {
                params: {
                    order_id: item.order_id,
                }
            }
        }).then(res => {
            message.success(res.data.msg);
            this.setState({
                visible: true,
            });
            this.request();
        })
    }

    //打开订单详情页面
    haddleOrderDetail = () => {
        let item = this.state.selectedItem;
        console.log(item, "item")
        if (!item) {
            Modal.info({
                title: "提示信息",
                content: "请选择一条订单信息"
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.order_id}`, "_blank")
    }
    render() {
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_id',
                key: 'order_id',
            },
            {
                title: '车辆编号',
                dataIndex: 'vehicle_number',
                key: 'vehicle_number',
            },
            {
                title: '用户名',
                dataIndex: 'user_name',
                key: 'user_name',
            },
            {
                title: '手机号',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '里程',
                dataIndex: 'mileage',
                key: 'mileage',
                render(value) {
                    return value / 1000 + "Km"
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'driving_time',
                key: 'driving_time',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: '开始时间',
                dataIndex: 'start_time',
                key: 'start_time',

            },
            {
                title: '结束时间',
                dataIndex: 'end_time',
                key: 'end_time',
            },
            {
                title: '订单金额',
                dataIndex: 'order_amount',
                key: 'order_amount',

            },
            {
                title: '实付金额',
                dataIndex: 'user_paid',
                key: 'user_paid',
            },
        ]
        return (
            <div style={{ width: "100%" }}>
                <Card>
                    <FormItem formList={this.formList} formListValue={this.formValue} />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Space>
                        <Button type="primary" onClick={this.haddleOrderDetail}>订单详情</Button>
                        <Button type="primary" onClick={this.haddleClick}>结束订单</Button>
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
                        selectedIds={this.state.selectedIds}
                    />
                </div>
                <Modal
                    title="结束订单"
                    visible={this.state.visible}
                    onCancel={() => this.setState({ visible: false })}
                    onOk={this.haddleFinish}
                >
                    <Form
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Form.Item label="车辆编号">
                            {this.state.formInfo.bike_id}
                        </Form.Item>
                        <Form.Item label="剩余电量">
                            {this.state.formInfo.remaining_capacity + "%"}
                        </Form.Item>
                        <Form.Item label="行程开始时间">
                            {this.state.formInfo.start_time}
                        </Form.Item>
                        <Form.Item label="车辆编号">
                            {this.state.formInfo.address}
                        </Form.Item>
                    </Form>
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
        axios.requestajax(this, "/order/list", this.params);
    }
}
