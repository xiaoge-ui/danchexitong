import React, { Component } from 'react';
import { Card, Carousel } from 'antd';
import './ui.less';


export default class Carousels extends Component {

    render() {
        const contentStyle = {
            height: '160px',
            color: '#fff',
            lineHeight: '160px',
            textAlign: 'center',
            background: '#364d79',
        }
        const contentStyle1 = {
            height: '576px',
            color: '#fff',
            lineHeight: '576px',
            textAlign: 'center',
            background: '#364d79',
        }
        return (
            <div className="button">
                <Card title="基本文字轮播" className="card-warp">
                    <Carousel >
                        <div>
                            <h3 style={contentStyle}>立刻有</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>杭州</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>飞天园区</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>21k</h3>
                        </div>
                    </Carousel>
                </Card>
                <Card title="文字自动轮播" className="card-warp">
                    <Carousel autoplay>
                        <div>
                            <h3 style={contentStyle}>I Love You</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>Money</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>Car</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>House</h3>
                        </div>
                    </Carousel>
                </Card>

                <Card title="图片自动轮播" className="card-warp">
                    <Carousel autoplay>
                        <div>
                            <h3 style={contentStyle1}>
                                <img style={{ width: "100%", display: "inline-block" }} src="/carousel-img/carousel-1.jpg" alt="" />
                            </h3>
                        </div>
                        <div>
                            <h3 style={contentStyle1}>
                                <img src="/carousel-img/carousel-2.jpg" alt="" />
                            </h3>
                        </div>
                        <div>
                            <h3 style={contentStyle1}>
                                <img src="/carousel-img/carousel-3.jpg" alt="" />
                            </h3>
                        </div>
                    </Carousel>
                </Card>
            </div>
        )
    }
}
