import React, { Component } from 'react';
import { Card } from 'antd';
import axios from './../../axios/index';
import './detail.less';

export default class Detail extends Component {
    state = {}
    render() {
        let info = this.state.orderInfo || {};
        return (
            <div style={{ width: "90%", margin: '0px auto' }}>
                <Card style={{ border: "none" }}>
                    <div id="orderDetailMap" className="order-map"></div>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{info.mode === 1 ? '服务区' : '停车点'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{info.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{info.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{info.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{info.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行程起点</div>
                                <div className="detail-form-content">{info.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程终点</div>
                                <div className="detail-form-content">{info.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程</div>
                                <div className="detail-form-content">{info.distance / 1000}公里</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        )
    }

    componentDidMount() {
        let item = this.props.match.params.id
        if (item) {
            this.request(item);
        }
    }

    request = (item) => {
        axios.ajax({
            url: "/order/detail",
            data: {
                params: {
                    bike_sn: item
                }
            }
        }).then(res => {
            console.log(res.data.result);
            this.setState({ orderInfo: res.data.result });
            this.newMap(res.data.result);
        })
    }
    //创建map实例
    newMap = (position) => {
        this.map = new window.BMapGL.Map("orderDetailMap");
        // this.map.centerAndZoom("北京", 11);
        //开启鼠标滚轮缩放
        this.map.enableScrollWheelZoom(true);
        //运行插入控件
        this.orderMap();
        //运行用户的行驶路线函数
        this.drawBikeMap(position.position_list);
        //运行服务区的函数
        this.drawServerMap(position.area);
    }
    //插入控件
    orderMap = () => {
        let map = this.map;
        map.addControl(new window.BMapGL.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_LEFT }));  // 添加比例尺控件
        map.addControl(new window.BMapGL.ZoomControl({ anchor: window.BMAP_ANCHOR_TOP_LEFT })); // 添加缩放控件
    }
    //绘制用户的行驶路线
    drawBikeMap = (position) => {
        let startPoint = "";
        let endPoint = "";
        if (position.length > 0) {
            let first = position[0];
            let last = position[position.length - 1];
            //起始点
            startPoint = new window.BMapGL.Point(first.lon, first.lat);
            let startIcon = new window.BMapGL.Icon('/assets/start_point.png', new window.BMapGL.Size(36, 42), {
                imageSize: new window.BMapGL.Size(36, 42),
                anchor: new window.BMapGL.Size(36, 42)
            })
            let startMarker = new window.BMapGL.Marker(startPoint, { icon: startIcon });
            this.map.addOverlay(startMarker);
            //终点
            endPoint = new window.BMapGL.Point(last.lon, last.lat);
            let endIcon = new window.BMapGL.Icon('/assets/end_point.png', new window.BMapGL.Size(36, 42), {
                imageSize: new window.BMapGL.Size(36, 42),
                anchor: new window.BMapGL.Size(36, 42)
            })
            let endMarker = new window.BMapGL.Marker(endPoint, { icon: endIcon });
            this.map.addOverlay(endMarker);

            //链接路线
            let takePoint = [];
            for (let i = 0; i < position.length; i++) {
                let point = position[i];
                takePoint.push(new window.BMapGL.Point(point.lon, point.lat))
            }

            let polyPoint = new window.BMapGL.Polyline(takePoint, {
                strokeColor: '#1869AD',
                strokeWeight: 3,
                strokeOpacity: 1
            });
            this.map.addOverlay(polyPoint);

            this.map.centerAndZoom(endPoint, 11);
        }

    }
    //绘制服务区
    drawServerMap = (position) => {
        let takePoint = [];
        for (let i = 0; i < position.length; i++) {
            let point = position[i];
            takePoint.push(new window.BMapGL.Point(point.lon, point.lat))
        }

        let Polygon = new window.BMapGL.Polygon(takePoint, {
            strokeColor: '#0099FF',
            strokeWeight: 4,
            strokeOpacity: 1,
            fillColor: '#00AD99',
            fillOpacity: 0.4
        });
        this.map.addOverlay(Polygon);
    }
}
