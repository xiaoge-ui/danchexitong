import React, { Component } from 'react';
import { Card, Button, Space, Modal } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

export default class RichText extends Component {

    state = {
        visible: false,
    };
    //编辑事，存储数据
    onEditorStateChange = (editorState) => {
        this.setState({ editorState });
    }
    //清空文本
    haddleClearText = () => {
        this.setState({ editorState: "" });
    }
    //获取输入的值
    onEditText = (editText) => {
        this.setState({ editText });
    }

    //点击获取文本按钮
    haddleGetText = () => {
        this.setState({ visible: true });
    }
    render() {
        let { editorState } = this.state;
        return (
            <div style={{ width: "100%" }}>
                <Card style={{ marginBottom: 20 }}>
                    <Space>
                        <Button type="primary" onClick={this.haddleClearText}>清空文本</Button>
                        <Button type="primary" onClick={this.haddleGetText}>获取文本</Button>
                    </Space>
                </Card>
                <Card title="富文本编辑器">
                    <Editor
                        editorState={editorState}
                        onContentStateChange={this.onEditText}
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </Card>
                <Modal
                    title="富文本"
                    visible={this.state.visible}
                    onCancel={() => this.setState({ visible: false })}
                    footer={null}
                >
                    {draftToHtml(this.state.editText)}
                </Modal>
            </div>
        )
    }
}
