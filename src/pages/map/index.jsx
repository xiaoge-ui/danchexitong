import React, { Component } from 'react';
import { Card } from 'antd';
import axios from './../../axios/index';
import FormItem from './../../component/FormItem';

export default class BikeMap extends Component {
    state = {}
    params = {};
    map = {};
    formList = [
        {
            type: "SELECT",
            label: "城市",
            name: "city_select",
            width: 120,
            placeholder: "全部",
            list: [{ id: "0", value: "全部" }, { id: "1", value: "北京市" }, { id: "2", value: "河北省" }, { id: "3", value: "天津市" }, { id: "4", value: "杭州市" }, { id: "5", value: "上海市" }]
        },
        {
            type: "时间控件",
            name: "time",
            label: "订单时间"
        },
        {
            type: "SELECT",
            label: "订单选择",
            name: "order_select",
            width: 120,
            placeholder: "全部",
            list: [{ id: "0", value: "全部" }, { id: "1", value: "进行中" }, { id: "2", value: "已完成" }]
        },
    ]
    render() {
        return (
            <div style={{ width: "100%" }}>
                <Card>
                    <FormItem formList={this.formList} formListValue={this.haddleFormListValue} />
                </Card>
                <Card style={{ marginTop: 20 }}>
                    <div>
                        共有{this.state.bike_count}辆车
                    </div>
                    <div id="container" style={{ height: 500, marginTop: 10 }}>

                    </div>
                </Card>
            </div>
        )
    }
    componentDidMount() {
        this.request();
    }
    //请求接口，获取数据
    request = () => {
        axios.ajax({
            url: "bike/list",
            data: {
                params: this.params
            }
        }).then(res => {
            this.setState({ bike_count: res.data.result.total_count });
            this.requestMap(res);
        })
    }

    haddleFormListValue = (value) => {
        this.params = value;
        this.request();
    }

    //地图信息
    requestMap = (res) => {
        let list = res.data.result.route_list;
        this.map = new window.BMapGL.Map("container"); //创建地图实例
        let golba1 = list[0].split(",");
        let startPoint = new window.BMapGL.Point(golba1[0], golba1[1]); // 创建点坐标 
        let golba2 = list[list.length - 1].split(",");
        let endPoint = new window.BMapGL.Point(golba2[0], golba2[1]); // 创建点坐标 

        this.map.centerAndZoom(endPoint, 15); // 初始化地图，设置中心点坐标和地图级别
        this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        this.map.setHeading(64.5);   //设置地图旋转角度
        this.map.setTilt(73);       //设置地图的倾斜角度
        var scaleCtrl = new window.BMapGL.ScaleControl();  // 添加比例尺控件
        this.map.addControl(scaleCtrl);
        var zoomCtrl = new window.BMapGL.ZoomControl();  // 添加缩放控件
        this.map.addControl(zoomCtrl);
        var cityCtrl = new window.BMapGL.CityListControl();  // 添加城市列表控件
        this.map.addControl(cityCtrl);

        //添加起始图标
        let startPointIcon = new window.BMapGL.Icon("/assets/start_point.png", new window.BMapGL.Size(36, 42), {
            imageSize: new window.BMapGL.Size(36, 42),
            anchor: new window.BMapGL.Size(18, 42)
        });

        var bikeMarkerStart = new window.BMapGL.Marker(startPoint, { icon: startPointIcon });
        this.map.addOverlay(bikeMarkerStart);

        let endPointIcon = new window.BMapGL.Icon("/assets/end_point.png", new window.BMapGL.Size(36, 42), {
            imageSize: new window.BMapGL.Size(36, 42),
            anchor: new window.BMapGL.Size(18, 42)
        });
        var bikeMarkerEnd = new window.BMapGL.Marker(endPoint, { icon: endPointIcon });
        this.map.addOverlay(bikeMarkerEnd);

        let routeList = [];
        list.forEach((item) => {
            let p = item.split(",");
            let point = new window.BMapGL.Point(p[0], p[1]);
            routeList.push(point);
        })
        // 行驶路线
        var polyLine = new window.BMapGL.Polyline(routeList, {
            strokeColor: "#ef4136",
            strokeWeight: 3,
            strokeOpacity: 1
        });
        this.map.addOverlay(polyLine);

        // 服务区路线
        let serviceList = res.data.result.service_list;
        let servicePointist = [];
        serviceList.forEach((item) => {
            let point = new window.BMapGL.Point(item.lon, item.lat);
            servicePointist.push(point);
        })
        // 画线
        var polyServiceLine = new window.BMapGL.Polyline(servicePointist, {
            strokeColor: "#ef4136",
            strokeWeight: 3,
            strokeOpacity: 1
        });
        this.map.addOverlay(polyServiceLine);

        // 添加地图中的自行车
        let bikeList = res.data.result.bike_list;
        let bikeIcon = new window.BMapGL.Icon("/assets/bike.jpg", new window.BMapGL.Size(36, 42), {
            imageSize: new window.BMapGL.Size(36, 42),
            anchor: new window.BMapGL.Size(18, 42)
        });
        bikeList.forEach((item) => {
            let p = item.split(",");
            let point = new window.BMapGL.Point(p[0], p[1]);
            var bikeMarker = new window.BMapGL.Marker(point, { icon: bikeIcon });
            this.map.addOverlay(bikeMarker);
        })

    }
}
