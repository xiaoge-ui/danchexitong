import React, { Component } from 'react';
import { Card, Button, Radio } from 'antd';
import { PlusOutlined, AppleOutlined, WechatOutlined, AudioMutedOutlined, WifiOutlined, LeftOutlined, RightOutlined, DownloadOutlined } from '@ant-design/icons';
import './ui.less'

export default class Buttons extends Component {
    state = {
        loading: true,
        size: "default",
    }
    haddleCloseLoading = () => {
        let { loading } = this.state;
        if (loading) {
            this.setState({ loading: false });
        } else {
            this.setState({ loading: true });
        }
    }

    handleSizeChange = (e) => {
        this.setState({ size: e.target.value });

    }

    render() {
        let { loading, size } = this.state;
        let { haddleCloseLoading, handleSizeChange } = this;
        return (
            <div className="button" >
                <Card title="基本按钮" className="card-warp">
                    <Button type="primary">我是最棒的</Button>
                    <Button>我是最棒的</Button>
                    <Button type="dashed">我是最棒的</Button>
                    <Button type="danger">我是最棒的</Button>
                    <Button type="link">我是最棒的</Button>
                </Card>

                <Card title="图形按钮" className="card-warp">
                    <Button type="primary" icon={<PlusOutlined />}>加油，你是最棒的</Button>
                    <Button icon={<AppleOutlined />}>加油，你是最棒的</Button>
                    <Button type="dashed" icon={<WechatOutlined />}>加油，你是最棒的</Button>
                    <Button type="danger" icon={<AudioMutedOutlined />}>加油，你是最棒的</Button>
                    <Button type="link" icon={<WifiOutlined />}>加油，你是最棒的</Button>
                </Card>

                <Card title="Loading" className="card-warp">
                    <Button type="primary" loading={loading}>加载中...</Button>
                    <Button shape="circle" loading={loading}></Button>
                    <Button type="dashed" loading={loading}>加载中...</Button>
                    <Button type="danger" loading={loading}>加载中...</Button>
                    <Button type="link" loading={loading}>加载中...</Button>
                    <Button type="primary" onClick={haddleCloseLoading}>关闭</Button>
                </Card>

                <Card title="按钮组" >
                    <Button type="primary" icon={<LeftOutlined />}>上一页</Button>
                    <Button type="primary" icon={<RightOutlined />}>下一页</Button>
                </Card>

                <Card title="按钮尺寸" className="card-warp card">
                    <Radio.Group value={size} onChange={handleSizeChange}>
                        <Radio value="large">Large</Radio>
                        <Radio value="default">Default</Radio>
                        <Radio value="small">Small</Radio>
                    </Radio.Group>
                    <Button type="primary" icon={<DownloadOutlined />} size={size} />
                    <Button type="primary" shape="circle" icon={<DownloadOutlined />} size={size} />
                    <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size} />
                    <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size}>
                    </Button>
                    <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size}>
                        Download
                    </Button>
                    <Button type="primary" icon={<DownloadOutlined />} size={size}>
                        Download
                    </Button>
                </Card >

            </div >
        )
    }
}
