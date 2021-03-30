import React, { Component } from 'react'
import { Card } from 'antd';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import themeLight from './../echartTheme'

export default class Pie extends Component {
    componentWillMount() {
        echarts.registerTheme('my_bar', themeLight);
    }
    getOption = () => {
        let option = {
            title: {
                text: "用户骑行信息"
            },
            xAxis: {
                data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }]
        };
        return option;
    }

    getOption2 = () => {
        let option = {
            title: {
                text: '用户骑行信息'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ["OFO骑行信息", "摩拜骑行信息"]
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'OFO骑行信息',
                    type: 'line',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '摩拜骑行信息',
                    type: 'line',
                    data: [220, 182, 191, 234, 290, 330, 310]
                }
            ]
        };
        return option;
    }

    getOption3 = () => {
        let option = {
            title: {
                text: "用户骑行信息"
            },
            xAxis: {
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {}
            }]
        };
        return option;
    }

    render() {
        return (
            <div style={{ width: "100%" }}>
                <Card title="基本折线图一">
                    <ReactECharts option={this.getOption()} theme='my_bar' style={{ height: 500 }} />
                </Card>
                <Card title="基本折线图二" style={{ marginTop: 20 }}>
                    <ReactECharts option={this.getOption2()} theme='my_bar' style={{ height: 500 }} />
                </Card>
                <Card title="基本折线图三" style={{ marginTop: 20 }}>
                    <ReactECharts option={this.getOption3()} theme='my_bar' style={{ height: 500 }} />
                </Card>
            </div>
        )
    }
}
