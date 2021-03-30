import React, { Component } from 'react';
import { Button, notification, Space, Card } from 'antd';
import './ui.less'

export default class Notifications extends Component {

    haddleNotification = (type, position) => {
        if (position) {
            notification.config({
                placement: position,
            })
        }
        notification[type]({
            message: "今天的你挣到钱了吗",
            description: "今天的你是最棒的，全勤，21k到手"
        })
    }
    render() {
        let { haddleNotification } = this;
        return (
            <div className="button">
                <Card title="通知框提醒" className="card-warp">
                    <Space>
                        <Button type="primary" onClick={e => haddleNotification("success")}>success</Button>
                        <Button type="primary" onClick={e => haddleNotification("info")}>info</Button>
                        <Button type="primary" onClick={e => haddleNotification("error")}>error</Button>
                        <Button type="primary" onClick={e => haddleNotification('warning')}>warning</Button>
                    </Space>
                </Card>

                <Card title="通知框位置设定">
                    <Space>
                        <Button type="primary" onClick={e => haddleNotification("success", "topLeft")}>success</Button>
                        <Button type="primary" onClick={e => haddleNotification("info", 'topRight')}>info</Button>
                        <Button type="primary" onClick={e => haddleNotification("error", 'bottomLeft')}>error</Button>
                        <Button type="primary" onClick={e => haddleNotification('warning', 'bottomRight')}>warning</Button>
                    </Space>
                </Card>
            </div>
        )
    }
}
