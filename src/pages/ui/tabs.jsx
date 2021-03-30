import React, { Component } from 'react'
import { Card, Tabs } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import './ui.less';
const { TabPane } = Tabs;
const initialPanes = [
    { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
    { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
    { title: 'Tab 3', content: 'Content of Tab 3', key: '3', closable: false, },
];

export default class Tabss extends Component {
    newTabIndex = 0;

    state = {
        activeKey: initialPanes[0].key,
        panes: initialPanes,
    };

    onChange = activeKey => {
        this.setState({ activeKey });
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        const newPanes = [...panes];
        newPanes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
        this.setState({
            panes: newPanes,
            activeKey,
        });
    };

    remove = targetKey => {
        const { panes, activeKey } = this.state;
        let newActiveKey = activeKey;
        let lastIndex;
        panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = panes.filter(pane => pane.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        this.setState({
            panes: newPanes,
            activeKey: newActiveKey,
        });
    };

    callback = (key) => {
        console.log(key);
    }
    render() {
        const { panes, activeKey } = this.state;
        let { callback } = this;
        return (
            <div className="button">
                <Card title="基本标签页" className="card-warp">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Tab 1" key="1">
                            胜利就在前方！！！
                    </TabPane>
                        <TabPane tab="Tab 2" key="2">
                            Content of Tab Pane 2
                    </TabPane>
                        <TabPane tab="Tab 3" key="3">
                            Content of Tab Pane 3
                    </TabPane>
                    </Tabs>
                </Card>

                <Card title="动画标签页" className="card-warp">
                    <Tabs defaultActiveKey="1" onChange={callback} animated={true}>
                        <TabPane tab="Tab 1" key="1">
                            Content of Tab Pane 1
                    </TabPane>
                        <TabPane tab="Tab 2" key="2">
                            Content of Tab Pane 2
                    </TabPane>
                        <TabPane tab="Tab 3" key="3">
                            Content of Tab Pane 3
                    </TabPane>
                    </Tabs>
                </Card>

                <Card title="图标标签页" className="card-warp">
                    <Tabs defaultActiveKey="2" animated={true}>
                        <TabPane
                            tab={<span><AppleOutlined />Tab 1</span>}
                            key="1"
                        >
                            Tab 1
                        </TabPane>
                        <TabPane
                            tab={<span><AndroidOutlined />Tab 2</span>}
                            key="2"
                        >
                            Tab 2
                        </TabPane>
                    </Tabs>
                </Card>

                <Card title="图标标签页" className="card-warp">
                    <Tabs
                        type="editable-card"
                        onChange={this.onChange}
                        activeKey={activeKey}
                        onEdit={this.onEdit}
                    >
                        {panes.map(pane => (
                            <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                                {pane.content}
                            </TabPane>
                        ))}
                    </Tabs>
                </Card>
            </div>
        )
    }
}
