import React, { Component } from 'react'
import { Card, Space, Button, message } from 'antd'
import './ui.less'

export default class Messages extends Component {
    haddleMessage = (type) => {
        message[type]("请求成功了！！！")
    }
    render() {
        let { haddleMessage } = this;
        return (
            <div className="button">
                <Card title="全局通知提示" className="card-warp">
                    <Space>
                        <Button type="primary" onClick={e => haddleMessage("success")}>
                            success
                        </Button>
                        <Button type="default" onClick={e => haddleMessage("info")}>info</Button>
                        <Button type="primary" onClick={e => haddleMessage("warning")}>
                            warning
                        </Button>
                        <Button type="danger" onClick={e => haddleMessage("error")}>error</Button>
                        <Button type="dashed" onClick={e => haddleMessage("loading")}>
                            loading
                        </Button>
                        <Button type="primary" onClick={e => haddleMessage("warn")}>warn</Button>
                    </Space>
                </Card>
            </div>
        )
    }
}
