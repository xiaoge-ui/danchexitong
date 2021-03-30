import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Menu } from 'antd';
import { connect } from 'react-redux';
import { getMenuInfo } from './../../redux/action/index';
import './index.less';
import menuList from './../../config/routerconfig';

const { SubMenu } = Menu;
class NavLeft extends Component {

    state = {
        selectedKeys: ""
    }

    show = (data) => {
        return data.map(item => {
            if (item.children) {
                return (
                    <SubMenu key={item.key} title={item.title}>
                        {this.show(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item key={item.key}><Link to={item.key}>{item.title}</Link></Menu.Item>
        })
    }
    render() {
        let { menu } = this.state;
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt="" />
                    <h1>大波仔俱乐部</h1>
                </div>
                <Menu
                    theme='dark'
                    onClick={this.haddleClick}
                    selectedKeys={this.state.selectedKeys}
                >
                    {menu}
                </Menu>
            </div>
        );
    }
    componentWillMount() {
        const menu = this.show(menuList);
        let selectedKeys = window.location.hash.replace(/#|\?.*$/g, "");
        if (selectedKeys === "") {
            <Redirect to={selectedKeys} />
        } else {
            this.setState({ menu, selectedKeys });
        }
    }

    haddleClick = ({ item, key }) => {
        if (key == this.state.selectedKeys) {
            return false;
        }
        let { dispatch } = this.props;
        dispatch(getMenuInfo(item.node.innerText));

        this.setState({ selectedKeys: key });
    }
}

export default connect()(NavLeft);