import React, { Component } from 'react';
import { Form, Input, Select, Checkbox, Button, DatePicker } from 'antd';
import Utils from './../../utils/utils';

export default class FormItem extends Component {
    formItem = React.createRef();
    initialFormValue = () => {
        let { formList } = this.props;
        let formItemList = [];
        if (formList && formList.length > 0) {
            formList.forEach((item, index) => {
                let label = item.label;
                let name = item.name;
                let initialValue = item.initialValue || "";
                let placeholder = item.placeholder;
                let width = item.width;
                if (item.type === "时间控件") {
                    const START_TIME = <Form.Item
                        label={label}
                        name={name}
                        key={item.type + "1"}
                    >
                        <DatePicker showTime />
                    </Form.Item>
                    formItemList.push(START_TIME);

                    const END_TIEM = <Form.Item
                        label="~"
                        colon={false}
                        name="vehicle_mode1"
                        key={(index + 2)}
                    >
                        <DatePicker showTime />
                    </Form.Item>
                    formItemList.push(END_TIEM);
                } else if (item.type === 'INPUT') {
                    const INPUT = <Form.Item
                        label={label}
                        name={name}
                        key={index}
                        initialValue={initialValue}
                    >
                        <Input type="text" placeholder={placeholder} />
                    </Form.Item>
                    formItemList.push(INPUT)
                } else if (item.type === 'SELECT') {
                    const SELECT = <Form.Item
                        label={label}
                        key={index}
                        name={name}
                    >
                        <Select style={{ width: width }} placeholder={placeholder}>
                            {Utils.getSelectValue(item.list)}
                        </Select>
                    </Form.Item>
                    formItemList.push(SELECT)

                } else if (item.type === 'CHECKBOX') {
                    const CHECKBOX = <Form.Item
                        label={label}
                        key={index}
                        name={name}
                        valuePropName="checked"
                        initialValue={initialValue}
                    >
                        <Checkbox>
                            {label}
                        </Checkbox>
                    </Form.Item>
                    formItemList.push(CHECKBOX)
                } else if (item.type === 'DATA') {
                    const START_TIME = <Form.Item
                        label={label}
                        name={name}
                        key={item.type}
                    >
                        <DatePicker showTime />
                    </Form.Item>
                    formItemList.push(START_TIME);
                }
            });
        }
        return formItemList;
    }

    //获取表单数据
    requestFormValue = () => {
        console.log(this.formItem.current.getFieldsValue());
        let formValue = this.formItem.current.getFieldsValue();
        this.props.formListValue(formValue);
    }
    render() {
        return (
            <Form
                layout="inline"
                ref={this.formItem}
            >
                {this.initialFormValue()}
                <Form.Item >
                    <Button type="primary" style={{ margin: "0px 20px" }} onClick={this.requestFormValue}>查询</Button>
                    <Button onClick={() => this.formItem.current.resetFields()}>重置</Button>
                </Form.Item>
            </Form>
        )
    }
}
