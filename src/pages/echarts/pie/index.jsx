import React, { Component } from 'react'
import { Card } from 'antd';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import themeLight from './../themeLight';

export default class Pie extends Component {
    componentWillMount() {
        echarts.registerTheme('my_bar', themeLight);
    }
    getOption = () => {
        let option = {
            title: {
                text: '用户骑行信息',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                right: "right",
                data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 1048, name: '星期一' },
                        { value: 735, name: '星期二' },
                        { value: 580, name: '星期三' },
                        { value: 484, name: '星期四' },
                        { value: 1500, name: '星期五' },
                        { value: 3000, name: '星期六' },
                        { value: 2500, name: '星期日' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        return option;
    }

    getOption2 = () => {
        let option = {
            title: {
                text: "用户骑行信息",
                left: "center"
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                top: '5%',
                right: "right",
                data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
            },
            series: [
                {
                    name: '订单数量',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '40',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 1048, name: '星期一' },
                        { value: 735, name: '星期二' },
                        { value: 580, name: '星期三' },
                        { value: 484, name: '星期四' },
                        { value: 1500, name: '星期五' },
                        { value: 3000, name: '星期六' },
                        { value: 2500, name: '星期日' }
                    ]
                }
            ]
        };
        return option;
    }

    getOption3 = () => {
        let option = {
            title: {
                text: "用户骑行信息",
                left: "center",
            },
            legend: {
                top: '5%',
                right: "right",
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            },

            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)",
            },

            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    data: [
                        { value: 335, name: '直接访问' },
                        { value: 310, name: '邮件营销' },
                        { value: 274, name: '联盟广告' },
                        { value: 235, name: '视频广告' },
                        { value: 400, name: '搜索引擎' }
                    ].sort(function (a, b) { return a.value - b.value; }),
                    roseType: 'radius',
                    label: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    labelLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    },
                    itemStyle: {
                        color: '#c23531',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },

                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        };
        return option;
    }

    render() {
        return (
            <div style={{ width: "100%" }}>
                <Card title="基本饼图一">
                    <ReactECharts option={this.getOption()} theme='my_bar' />
                </Card>
                <Card title="基本饼图二" style={{ marginTop: 20 }}>
                    <ReactECharts option={this.getOption2()} theme='my_bar' />
                </Card>
                <Card title="基本饼图三" style={{ marginTop: 20 }}>
                    <ReactECharts option={this.getOption3()} theme='my_bar' />
                </Card>
            </div>
        )
    }
}
