import React, { Component } from 'react';
import { Button, Card, message, Table, Badge } from 'antd';
import axios from './../../axios'
import Modal from 'antd/lib/modal/Modal';

export default class HighTable extends Component {

    state = {}
    params = {
        page: 1
    }
    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 80,
                key: 'id',
            },
            {
                title: '姓名',
                dataIndex: 'name',
                width: 80,
                key: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
                width: 80,
                key: 'age',
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: 80,
                key: 'sex',
            },
            {
                title: '生日',
                dataIndex: 'birtary',
                width: 80,
                key: 'birtary',
            },
            {
                title: '工资',
                dataIndex: 'money',
                width: 80,
                key: 'money',
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 100,
                key: 'address',
            },
            {
                title: '车',
                dataIndex: 'car',
                width: 80,
                key: 'car',
            }
        ]

        const columns2 = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 80,
                fixed: "left",
                key: 'id',
            },
            {
                title: '姓名',
                dataIndex: 'name',
                width: 80,
                fixed: "left",
                key: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
                width: 80,
                key: 'age',
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: 80,
                key: 'sex',
            },
            {
                title: '生日',
                dataIndex: 'birtary',
                width: 80,
                key: 'birtary',
            },
            {
                title: '工资',
                dataIndex: 'money',
                width: 80,
                key: 'money',
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 100,
                key: 'address',
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 100,
                key: 'address',
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 100,
                key: 'address',
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 100,
                key: 'address',
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 100,
                key: 'address',
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 100,
                key: 'address',
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 100,
                key: 'address',
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 100,
                key: 'address',
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 100,
                key: 'address',
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 100,
                key: 'address',
            },
            {
                title: '车',
                dataIndex: 'car',
                width: 80,
                fixed: "right",
                key: 'car',
            }
        ]

        const columns3 = [
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
                sorter: (a, b) => a.age - b.age,
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

        const columns4 = [
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
                render: (text, item) => {
                    // console.log("text", text)
                    // console.log('item', item)
                    if (item.money > 19000) {
                        return <Badge status="success" text={text} />
                    } else {
                        return <Badge status="warning" text={text} />
                    }
                }
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
            },
            {
                title: '操作',
                render: (text, item) => {
                    return (<Button type="primary" onClick={item => this.haddleDeleted(item)}>删除</Button>)
                }
            }
        ]

        return (
            <div style={{ width: "100%" }}>
                <Card title="表头固定" style={{ marginBottom: "20px" }}>
                    <Table
                        columns={columns}
                        bordered
                        dataSource={this.state.dataSource}
                        scroll={{ y: 230 }}
                        pagination={false}
                    />
                </Card>

                <Card title="左侧/右侧固定" style={{ marginBottom: "20px" }}>
                    <Table
                        columns={columns2}
                        bordered
                        dataSource={this.state.dataSource}
                        scroll={{ x: 1802, y: 200 }}
                        pagination={false}
                    />
                </Card>

                <Card title="排序" style={{ marginBottom: "20px" }}>
                    <Table
                        columns={columns3}
                        bordered
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>

                <Card title="带图标，删除操作" style={{ marginBottom: "20px" }}>
                    <Table
                        columns={columns4}
                        bordered
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }

    componentDidMount() {
        this.request()
    }

    request = () => {
        axios.ajax({
            url: "/table/highlist",
            data: {
                params: {
                    page: this.params.page,
                }
            }
        }).then(res => {
            this.setState({ dataSource: res.data.result.list });
        })
    }
    haddleDeleted = (item, value) => {
        // let id = value.id;
        Modal.confirm({
            title: "删除",
            content: "您确认要删除此记录吗？",
            onOk: () => {
                message.success("删除成功");
                this.request()
            }
        })
    }
}
