import React, { Component } from 'react'
import { Button, Card, Modal } from 'antd';
import './ui.less';

export default class Modals extends Component {
    state = {
        showModal1: false,
        showModal2: false,
        showModal3: false,
        showModal4: false
    }
    haddleClick = (type) => {
        this.setState({ [type]: true });
    }

    haddlePop = (type) => {
        Modal[type]({
            title: "确定？",
            content: "你确定已经准备好了吗？"
        })
    }

    render() {
        let { showModal1, showModal2, showModal3, showModal4 } = this.state;
        let { haddleClick, haddlePop } = this;
        return (
            <div className="button">
                <Card title="基础模态框" className="card-warp">
                    <Button type="primary" onClick={e => haddleClick("showModal1")}>open</Button>
                    <Button type="primary" onClick={e => haddleClick("showModal2")}>自定义页脚</Button>
                    <Button type="primary" onClick={e => haddleClick("showModal3")}>顶部20px弹框</Button>
                    <Button type="primary" onClick={e => haddleClick("showModal4")}>水平垂直居中</Button>
                </Card>

                <Card title="模态框 弹出式" className="card-warp">
                    <Button type="primary" onClick={e => haddlePop("info")}>提示信息info</Button>
                    <Button type="primary" onClick={e => haddlePop("success")}>成功success</Button>
                    <Button type="danger" onClick={e => haddlePop("error")}>错误提示error</Button>
                    <Button type="dashed" onClick={e => haddlePop("warning")}>警告提示warning</Button>
                    <Button type="text" onClick={e => haddlePop("confirm")}>弹出窗confirm</Button>
                </Card>

                <Modal
                    title="美少女直播间"
                    visible={showModal1}
                    onOk={() => { this.setState({ showModal1: false }) }}
                    onCancel={() => this.setState({ showModal1: false })}>
                    <p>欢迎您进入我的直播间，感谢</p>
                </Modal>

                <Modal
                    title="司藤"
                    visible={showModal2}
                    okText="好的呢"
                    cancelText="算了"
                    onOk={() => { this.setState({ showModal2: false }) }}
                    onCancel={() => this.setState({ showModal2: false })}>
                    <p>欢迎来给我下藤杀</p>
                </Modal>

                <Modal
                    title="励志名言"
                    visible={showModal3}
                    style={{ top: "20px" }}
                    onOk={() => { this.setState({ showModal3: false }) }}
                    onCancel={() => this.setState({ showModal3: false })}>
                    <p>清澈的爱，只为中国</p>
                </Modal>

                <Modal
                    title="飞天园区"
                    visible={showModal4}
                    centered
                    onOk={() => { this.setState({ showModal4: false }) }}
                    onCancel={() => this.setState({ showModal4: false })}>
                    <p>阿里，我来了，20k，我来了</p>
                    <p>世上无难事只怕有心人</p>
                </Modal>
            </div >
        )
    }
}
