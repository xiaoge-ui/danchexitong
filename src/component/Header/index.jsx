import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';
import utils from './../../utils/utils';
import './index.less';

class Header extends Component {
    state = {}
    componentWillMount() {
        this.setState({ time: utils.showTime(new Date().getTime()) });
        setInterval(() => {
            let time = utils.showTime(new Date().getTime());
            this.setState({ time });
        }, 1000)
    }
    componentDidMount() {
        this.getWeather();
    }
    getWeather() {
        axios.get("https://devapi.qweather.com/v7/weather/now?location=101010100&key=edfbb55fa73b442293d860de43adcdae").then(res => {
            if (res.data.code === "200") {
                this.setState({
                    weather: res.data.now.text,
                    icon: res.data.now.icon
                });
            }
        })
    }

    render() {
        let { contentType } = this.props;
        console.log(this.props);
        return (
            <div className="header">
                <Row className="header-top">
                    {
                        contentType ?
                            <Col span={6} className="logo1">
                                <img src="/assets/logo-ant.svg" alt="" />
                                <h1>大波仔俱乐部</h1>
                            </Col> : ""
                    }
                    <Col span={contentType ? 18 : 24}>
                        <span>欢迎您,大波仔</span>
                        <a href="">退出</a>
                    </Col>
                </Row>
                {
                    contentType ? "" :
                        <Row className="column">
                            <Col span={4} className="column-title">
                                {this.props.menu}
                            </Col>
                            <Col span={20} className="weather">
                                <span className="time">{this.state.time}</span>
                                <img src={`color-256/${this.state.icon}.png`} alt="" width="35" />
                                <span className="weather-detail">{this.state.weather}</span>
                            </Col>
                        </Row>
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        menu: state.menu_title
    }
}

export default connect(mapStateToProps)(Header);