import React, { Component } from 'react';
import { Card, Button, Input, Select, Space, Modal, Form, message, Tree, Transfer } from 'antd';
import axios from './../../axios';
import Utils from './../../utils/utils';
import ETable from './../../component/ETable';
import menuConfig from './../../config/menuconfig';

export default class Permission extends Component {
    formRef = React.createRef()
    formPer = React.createRef()
    formUser = React.createRef()
    state = {
        visible: false,
        isVisible: false,
        isUserVisible: false,
    }
    render() {
        const columns = [
            {
                title: '角色ID',
                dataIndex: 'role_id',
                key: 'role_id',
            },
            {
                title: '角色名称',
                dataIndex: 'role_name',
                key: 'role_name',
                render: (status) => {
                    return {
                        1: "客服专员",
                        2: "财务专员",
                        3: "管理人员",
                        4: "市场专员",
                        5: "产品经理"
                    }[status]
                }
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'create_time',
                render: (status) => {
                    return Utils.showTime(status)
                }
            },
            {
                title: '使用状态',
                dataIndex: 'status',
                key: 'status',
                render: (status) => {
                    return status === 1 ? "启用" : "禁止"
                }
            },
            {
                title: '授权时间',
                dataIndex: 'authorization_time',
                key: 'authorization_time',
            },
            {
                title: '授权人',
                dataIndex: 'authorization_person',
                key: 'authorization_person',
            },
        ]
        return (
            <div style={{ width: "100%" }}>
                <Card>
                    <Space>
                        <Button type="primary" onClick={this.haddleCreateRole}>创建角色</Button>
                        <Button type="primary" onClick={this.haddlePermissions}>设置权限</Button>
                        <Button type="primary" onClick={this.haddleUserSubmit}>用户授权</Button>
                    </Space>
                </Card>
                <div>
                    <ETable
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={this.state.pagination}
                        updateTableValue={this.updateTableValue}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem={this.selectedItem}
                    />
                </div>
                {/* 创建角色弹框 */}
                <Modal
                    title="创建角色"
                    visible={this.state.visible}
                    onOk={this.haddleOk}
                    onCancel={() => this.setState({ visible: false })}
                >
                    <UseForm ref={this.formRef} />
                </Modal>
                {/* 设置权限弹框 */}
                <Modal
                    title="设置角色"
                    visible={this.state.isVisible}
                    onOk={this.haddleisOk}
                    onCancel={() => this.setState({ isVisible: false })}
                >
                    <PermissionForm
                        ref={this.formPer}
                        roleName={this.state.selectedItem}
                        menuInfo={this.state.menuInfo}
                        patchMenuInfo={(data) => this.setState({ menuInfo: data })}
                    />
                </Modal>

                {/* 用户授权设置 */}
                <Modal
                    title="用户授权"
                    visible={this.state.isUserVisible}
                    onOk={this.haddleUserOk}
                    onCancel={() => this.setState({ isUserVisible: false })}
                >
                    <TransferForm
                        ref={this.formUser}
                        roleName={this.state.selectedItem}
                        targetKeys={this.state.targetKeys}
                        mockData={this.state.mockData}
                        haddleChange={(targetKeys) => {
                            this.setState({ targetKeys });
                        }}
                    />
                </Modal>
            </div>
        )
    }
    componentDidMount() {
        this.request();
    }
    request = () => {
        axios.requestajax(this, "role/list", {})
    }

    updateTableValue = (selectedRowKeys, selectedItem) => {
        this.setState({
            selectedRowKeys,
            selectedItem
        });
    }
    //点击创建角色按钮，出发的事件
    haddleCreateRole = () => {
        this.setState({ visible: true });
    }
    //点击modal框，创建角色确认按钮
    haddleOk = () => {
        const item = this.formRef.current.formRef.current.getFieldsValue()
        axios.ajax({
            url: "role/success",
            data: {
                params: item
            }
        }).then(res => {
            if (res.data.success === "ok") {
                message.success(res.data.msg);
                this.formRef.current.formRef.current.resetFields()
                this.setState({
                    visible: false,
                });
                this.request()
            }
        })
    }

    //点击设置权限
    haddlePermissions = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: "提示",
                content: "请选择一条记录"
            })
            return;
        }
        let menuInfo = item.menus;
        this.setState({
            isVisible: true,
            menuInfo
        });

    }
    //点击设置权限模态框haddleisOk
    haddleisOk = () => {
        let item = this.formPer.current.formPer.current.getFieldsValue();
        console.log(item);
        axios.ajax({
            url: "role_info/success",
            data: {
                params: {
                    item,
                    menus: this.state.menuInfo
                }
            }
        }).then(res => {
            if (res.data.success === "ok") {
                this.formPer.current.formPer.current.resetFields()
                this.setState({ isVisible: false }, () => {
                    message.success(res.data.msg);
                    this.request();
                });

            }
        })
    }

    //用户授权提交
    haddleUserSubmit = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: "提示",
                content: "请选择一条记录"
            })
            return;
        }
        axios.ajax({
            url: "role/info",
            data: {
                params: this.params
            }
        }).then(res => {
            if (res.data.success === "ok") {
                const mockData = [];
                const targetKeys = [];
                for (let i = 0; i < res.data.result.length; i++) {
                    const data = {
                        key: res.data.result[i].user_id,
                        title: res.data.result[i].user_name,
                        status: res.data.result[i].status,
                    };
                    if (data.status === 1) {
                        targetKeys.push(data.key)
                    }
                    mockData.push(data)
                    this.setState(
                        {
                            isUserVisible: true,
                            mockData,
                            targetKeys
                        }
                    );
                }
            }
        })
    }

    //点击用户授权模态框中的确认按钮
    haddleUserOk = () => {
        let data = {};
        data.user_ids = this.state.targetKeys || [];
        data.role_id = this.state.selectedItem.role_id;
        console.log(this.state.selectedItem);
        axios.ajax({
            url: 'role_info/success',
            data: {
                params: {
                    ...data
                }
            }
        }).then((res) => {
            if (res.data.success === "ok") {
                this.setState({
                    isUserVisible: false
                }, () => {
                    this.request();
                    message.success(res.data.msg)
                })
            }
        })
    }
}


class UseForm extends Component {
    formRef = React.createRef()


    render() {
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
                    name="role_name"
                    label="用户名"
                >
                    <Input type="text" placeholder="请输入用户名" />
                </Form.Item>

                <Form.Item
                    label="状态"
                    name="status"
                >

                    <Select placeholder="请选择当前状态">
                        <Select.Option value={1}>
                            启用
                            </Select.Option>
                        <Select.Option value={2}>
                            禁止
                            </Select.Option>
                    </Select>

                </Form.Item>
            </Form>
        )
    }
}


class PermissionForm extends Component {
    formPer = React.createRef()

    getState = (state) => {
        return {
            1: "客服专员",
            2: "财务专员",
            3: "管理人员",
            4: "市场专员",
            5: "产品经理"
        }[state]
    }
    render() {
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
                ref={this.formPer}
                {...layout}
            >
                <Form.Item
                    name="role_name"
                    label="角色名称"
                    initialValue={this.getState(this.props.roleName.role_name)}
                >
                    <Input type="text" disabled />
                </Form.Item>

                <Form.Item
                    label="状态"
                    name="status"
                    initialValue={1}
                >

                    <Select>
                        <Select.Option value={1}>
                            启用
                            </Select.Option>
                        <Select.Option value={2}>
                            禁止
                            </Select.Option>
                    </Select>

                </Form.Item>
                <Tree
                    name="menus"
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys) => { this.props.patchMenuInfo(checkedKeys) }}
                    checkedKeys={this.props.menuInfo || []}
                    treeData={menuConfig}
                />
            </Form>
        )
    }

    //获得tree树
    // renderTreeNodes = (data) => {
    //     return data.map(item => {
    //         if (item.children) {
    //             return <Tree.TreeNode title={item.title} key={item.key}>
    //                 {this.renderTreeNodes(item.children)}
    //             </Tree.TreeNode>
    //         } else {
    //             return <Tree.TreeNode title={item.title} key={item.key} />
    //         }
    //     })
    // }
}

class TransferForm extends Component {
    formUser = React.createRef()

    getState = (state) => {
        return {
            1: "客服专员",
            2: "财务专员",
            3: "管理人员",
            4: "市场专员",
            5: "产品经理"
        }[state]
    }
    render() {
        const layout = {
            labelCol: {
                span: 5,
            },
            wrapperCol: {
                span: 19,
            },
        };
        return (
            <Form
                ref={this.formUser}
                {...layout}
            >
                <Form.Item
                    name="role_name"
                    label="角色名称"
                    initialValue={this.getState(this.props.roleName.role_name)}
                >
                    <Input type="text" disabled />
                </Form.Item>

                <Form.Item
                    name="status"
                    label="选择用户"
                >
                    <Transfer
                        listStyle={{ width: 200, height: 300 }}
                        dataSource={this.props.mockData}
                        titles={['待选用户', '已选用户']}
                        showSearch
                        filterOption={this.filterOption}
                        targetKeys={this.props.targetKeys}
                        onChange={this.handleChange}
                        render={item => item.title}
                    />
                </Form.Item>
            </Form>
        )
    }
    //当用户权限发生变化时
    handleChange = (targetKeys) => {
        this.props.haddleChange(targetKeys)
    }

    filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;
}


