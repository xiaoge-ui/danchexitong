import React, { Component } from 'react';
import { Card, Row, Col, Modal } from 'antd';
import './ui.less';

export default class Gallery extends Component {
    state = {
        visible: false,
        imgs: null,
    }
    haddleVisible = (value) => {
        this.setState({ visible: true, imgs: '/gallery/' + value });
    }
    render() {
        let { visible, imgs } = this.state;
        let { haddleVisible } = this;
        const img = [
            ['1.png', '2.png', '3.png', '4.png', '5.png'],
            ['6.png', '7.png', '8.png', '9.png', '10.png'],
            ['11.png', '12.png', '13.png', '14.png', '15.png'],
            ['16.png', '17.png', '18.png', '19.png', '20.png'],
            ['21.png', '22.png', '23.png', '24.png', '25.png'],
        ]
        const imgList = img.map(item => item.map(value =>
            <Card
                className="card-warp"
                cover={<img alt={value} src={'/gallery/' + value} onClick={e => haddleVisible(value)} />}
            >
                <Card.Meta title="为了更好的明天" description="加油，努力吧，小伙" />
            </Card>
        ))
        return (
            <div className="button">
                <Row gutter={10}>
                    <Col md={5}>
                        {imgList[0]}
                    </Col>
                    <Col md={5}>
                        {imgList[1]}
                    </Col>
                    <Col md={5}>
                        {imgList[2]}
                    </Col>
                    <Col md={5}>
                        {imgList[3]}
                    </Col>
                    <Col md={4}>
                        {imgList[4]}
                    </Col>
                </Row>
                <Modal
                    width={800}
                    title="详情图片"
                    visible={visible}
                    footer={null}
                    onCancel={e => this.setState({ visible: false })}
                >
                    <img src={imgs} alt='努力挣钱' style={{ width: "100%" }} />
                </Modal>
            </div >
        )
    }
}
