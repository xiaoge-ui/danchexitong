import React, { Component } from 'react';
import { Spin, Card, Alert, Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

export default class Loadings extends Component {
    state = {
        loading: true
    }

    haddleClick = () => {
        let { loading } = this.state;
        if (loading) {
            this.setState({ loading: false });
        } else {
            this.setState({ loading: true });
        }
    }

    render() {
        let { loading } = this.state;
        let { haddleClick } = this;
        const antIcon = <SyncOutlined style={{ fontSize: 24 }} spin />;
        return (
            <div className="button">
                <Card title="Spin用法" className="card-warp">
                    <Spin size="small" />
                    <Spin style={{ margin: '0 10px' }} />
                    <Spin size="large" />
                    <Spin indicator={antIcon} style={{ marginLeft: 10 }} />
                </Card>

                <Card title="Spin遮罩用法">
                    <Spin tip="Loading..." >
                        <Alert
                            message="最后一颗子弹留给我"
                            description="一天是狼牙，终身是狼牙"
                            type="info"
                            style={{ marginBottom: 10 }}
                        />
                    </Spin>
                    <Spin tip="加载中..." indicator={antIcon}>
                        <Alert
                            message="最后一颗子弹留给我"
                            description="一天是狼牙，终身是狼牙"
                            type="success"
                            style={{ marginBottom: 10 }}
                        />
                    </Spin>
                    <Spin>
                        <Alert
                            message="最后一颗子弹留给我"
                            description="一天是狼牙，终身是狼牙"
                            style={{ marginBottom: 10 }}
                        />
                    </Spin>

                    <Spin spinning={loading} delay={700}>
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="error"
                            style={{ marginBottom: 10 }}
                        />
                    </Spin>
                    <Button type="primary" style={{ margin: "0 500px" }} onClick={haddleClick}>点击切换loading状态</Button>
                </Card>
            </div>
        )
    }
}
