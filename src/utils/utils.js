import React from 'react';
import { Select } from 'antd';
export default {
    showTime(time) {
        if (!time) return '';
        let data = new Date(time);
        let month;
        let date;
        let hour;
        let minute;
        let second;
        if ((data.getMonth() + 1) < 10) {
            month = "0" + (data.getMonth() + 1)
        } else {
            month = data.getMonth() + 1
        }

        if (data.getDate() < 10) {
            date = "0" + data.getDate()
        } else {
            date = data.getDate();
        }

        if (data.getHours() < 10) {
            hour = "0" + data.getHours()
        } else {
            hour = data.getHours();
        }

        if (data.getMinutes() < 10) {
            minute = "0" + data.getMinutes()
        } else {
            minute = data.getMinutes();
        }

        if (data.getSeconds() < 10) {
            second = "0" + data.getSeconds()
        } else {
            second = data.getSeconds();
        }

        return data.getFullYear() + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
    },

    pageState(data, callback) {
        return {
            current: data.result.page,
            pageSize: data.result.page_size,
            showQuickJumper: true,
            total: data.result.total,
            showTotal: () => {
                return `共有${data.result.total}条`
            },
            onChange: (current) => {
                return callback(current)
            }
        }
    },

    //获取下拉列表框中的值
    getSelectValue(data) {
        if (!data) {
            return [];
        }
        let selectValue = [];
        data.map(value => {
            selectValue.push(<Select.Option value={value.id} key={value.id}>{value.value}</Select.Option>);
        })
        return selectValue
    },

    //获取table某行的索引和数据
    updateTableValue(selectedRowKeys, selectedItem, selectedIds) {
        if (selectedIds) {
            this.setState({ selectedRowKeys, selectedItem, selectedIds });
        } else {
            this.setState({ selectedRowKeys, selectedItem });
        }
    }
}