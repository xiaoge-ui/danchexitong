import React, { Component } from 'react'
import { Card } from 'antd';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import echartTheme from './../echartTheme';

export default class Bar extends Component {
    componentWillMount() {
        echarts.registerTheme('my_bar', echartTheme);
    }
    getOption = () => {
        let option = {
            title: {
                text: "用户骑行订单"
            },
            tooltip: {
                trigger: "axis",
            },
            xAxis: {
                type: 'category',
                data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: "订单量",
                data: [1000, 1800, 2500, 3000, 2800, 1700, 300],
                type: 'bar'
            }]
        };
        return option;
    }

    getOption2 = () => {
        let option = {
            title: {
                text: "用户骑行订单"
            },
            tooltip: {
                trigger: "axis",
            },
            legend: {
                data: ['OFO', '摩拜', '小蓝']
            },
            xAxis: {
                type: 'category',
                data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: "OFO",
                    data: [1000, 1800, 2500, 3000, 2800, 1700, 4000],
                    type: 'bar'
                },
                {
                    name: "摩拜",
                    data: [800, 1200, 2000, 2600, 3200, 4000, 5000],
                    type: 'bar'
                },
                {
                    name: "小蓝",
                    data: [300, 700, 1500, 1800, 1300, 1000, 600],
                    type: 'bar'
                }
            ]
        };
        return option;
    }

    render() {
        return (
            <div style={{ width: "100%" }}>
                <Card title="基本柱形图一">
                    <ReactECharts option={this.getOption()} theme='my_bar' style={{ height: 500 }} />
                </Card>
                <Card title="基本柱形图二" style={{ marginTop: 20 }}>
                    <ReactECharts option={this.getOption2()} theme='my_bar' style={{ height: 500 }} />
                </Card>
            </div>
        )
    }
}
