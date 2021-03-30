import React, { Component } from 'react'
import { Table, Card, Button } from 'antd';
import axios from './../../axios';
import pageState from './../../utils/utils'
import Modal from 'antd/lib/modal/Modal';

export default class BasicTable extends Component {
    state = {}
    params = {
        page: 1
    }

    componentDidMount() {
        const dataSource = [
            {
                key: '1',
                id: "1",
                name: '胡彦斌',
                age: 32,
                sex: "男",
                birtary: "2021-02-18",
                money: 20000,
                address: '西湖区湖底公园1号',
                car: "劳斯莱斯"
            },
            {
                key: '2',
                id: "2",
                name: 'tom',
                age: 32,
                sex: "男",
                birtary: "2021-02-18",
                money: 20000,
                address: '西湖区湖底公园1号',
                car: "劳斯莱斯"
            },
            {
                key: '3',
                id: "3",
                name: 'jarry',
                age: 32,
                sex: "男",
                birtary: "2021-02-18",
                money: 20000,
                address: '西湖区湖底公园1号',
                car: "劳斯莱斯"
            },
        ]
        this.setState({ dataSource });
        this.request();
    }
    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
            },
            {
                title: '生日',
                dataIndex: 'birtary',
                key: 'birtary',
            },
            {
                title: '工资',
                dataIndex: 'money',
                key: 'money',
            },
            {
                title: '地址',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '车',
                dataIndex: 'car',
                key: 'car',
            }
        ]

        return (
            <div style={{ width: "100%" }}>
                <Card title="基础表格">
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource}
                        bordered
                        pagination={false}
                    />
                </Card>

                <Card title="动态数据获取">
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        bordered
                        pagination={false}
                    />
                </Card>

                <Card title="表格--单选按钮">
                    <Table
                        rowSelection={{
                            type: "radio",
                            onChange: (value, item) => {
                                console.log(item[0]);
                                Modal.info({
                                    title: "提示",
                                    content: `欢迎第${value}号学员${item[0].name}进入直播间`
                                })
                            }
                        }}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>

                <Card title="表格--复选框">
                    <div>
                        <Button type="primary" onClick={this.haddleDelete} >删除</Button>
                    </div>
                    <Table
                        rowSelection={{
                            type: "checkbox",
                            onChange: (value, item) => {
                                console.log(item);
                                this.setState({ value, item });
                            }
                        }}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>

                <Card title="表格--分页">
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={this.state.pageState}
                    />
                </Card>
            </div>
        )
    }

    haddleDelete = () => {
        let value = this.state.value;

        Modal.info({
            title: "删除提示",
            content: `您确定要删除${value}吗？`,
            onOk: () => {
                this.forceUpdate()
                this.request()
            }
        })
    }
    request = () => {
        //获取动态的表格数据
        // var _this = this;
        axios.ajax({
            url: '/table/list',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then(res => {
            this.setState({
                dataSource2: res.data.result.list, pageState: pageState.pageState(res.data, (current) => {
                    this.params.page = current;
                    this.request()
                })
            });
        })
    }
}
