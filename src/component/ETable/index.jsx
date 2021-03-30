import React, { Component } from 'react';
import { Table } from 'antd';

export default class ETable extends Component {
    render() {
        return (
            <div>
                {this.requestTable()}
            </div>
        )
    }

    requestTable = () => {
        let { selectedRowKeys } = this.props;
        let row_selection = this.props.rowSelection;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
        }
        if (row_selection === false || row_selection === null) {
            row_selection = false;
        } else if (row_selection === 'checkbox') {
            rowSelection.type = "checkbox";
        } else {
            row_selection = "radio";
        }
        return (
            <Table
                bordered
                rowSelection={row_selection ? rowSelection : null}
                {...this.props}
                onRow={(record, index) => {
                    return {
                        onClick: () => {
                            this.onRowClick(record, index);
                        }
                    };
                }}
            />
        )
    }
    onRowClick = (record, index) => {
        let rowSelection = this.props.rowSelection
        if (rowSelection === "checkbox") {
            let selectedRowKeys = this.props.selectedRowKeys;
            let selectedItem = this.props.selectedItem;
            let selectedIds = this.props.selectedIds;
            if (selectedIds) {
                let i = selectedIds.indexOf(record.key);
                if (i == -1) {
                    selectedRowKeys.push(index);
                    selectedItem.push(record);
                    selectedIds.push(record.key);
                } else {
                    selectedRowKeys.splice(i, 1);
                    selectedItem.splice(i, 1);
                    selectedIds.splice(i, 1);
                }
            } else {
                selectedRowKeys = [index];
                selectedItem = [record];
                selectedIds = [record.key];
            }
            this.props.updateTableValue(selectedRowKeys, selectedItem, selectedIds)
            console.log(selectedRowKeys, selectedItem, selectedIds)
        } else {
            let selectedRowKeys = [index];
            let selectedItem = record;
            this.props.updateTableValue(selectedRowKeys, selectedItem)
        }
    }
}
