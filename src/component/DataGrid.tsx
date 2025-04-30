import React, {useState} from "react";
import {Table, Flex} from "antd";
import type {ColumnsType} from "antd/es/table";
import type {ReactNode} from "react";
import styled from "@emotion/styled";
import {Pageable} from "../type.ts";

interface Header {
    displayValue: string;
    key: string;
    width?: string | number;
    render?: (value: any, record: any, index: number) => ReactNode;
}

interface DataGridProps extends Pageable {
    data: any[];
    headers: Header[];
    buttons?: ReactNode;
    rowKey?: string;
    onSelect?: (record: any, index?: number) => void
}

const DataGrid: React.FC<DataGridProps> =
    ({
         data,
         headers,
         buttons,
         rowKey = "id",
         totalItems,
         currentPage,
         pageSize,
         onChangePage,
         onSelect
     }) => {
        const columns: ColumnsType<any> = headers.map((header) => ({
            title: header.displayValue,
            dataIndex: header.key,
            key: header.key,
            render: header.render,
            width: header.width
        }));

        const [selectedRowKey, setSelectedRowKey] = useState<any>();
        return (
            <div style={{display: "flex", flexDirection: "column", gap: 12, width: '100%', height: '100%'}}>
                {buttons && (
                    <Flex style={{alignSelf: "flex-end"}} gap="small">
                        {React.Children.map(buttons, (child, index) => (
                            <div key={index}>{child}</div>
                        ))}
                    </Flex>
                )}
                <ScrollContainer>
                    <StyledTable
                        dataSource={data}
                        columns={columns}
                        id={'name'}
                        pagination={
                            onChangePage
                                ? {
                                    total: totalItems,
                                    current: currentPage,
                                    pageSize,
                                    onChange: onChangePage,
                                }
                                : false
                        }
                        onRow={(record, rowIndex) => ({
                            onClick: () => {
                                // @ts-ignore
                                if (selectedRowKey === record[rowKey]) {
                                    setSelectedRowKey(undefined)
                                    if (onSelect) onSelect(undefined, -1)
                                } else {
                                    // @ts-ignore
                                    setSelectedRowKey(record[rowKey]);
                                    if (onSelect) onSelect(record, rowIndex)
                                }
                            }
                        })}
                        rowSelection={{
                            type: 'radio',
                            selectedRowKeys: selectedRowKey ? [selectedRowKey] : [],
                            onChange: (keys) => setSelectedRowKey(keys[0]),
                        }}
                        rowKey={rowKey}
                    />
                </ScrollContainer>
            </div>
        );
    };

export default DataGrid;

const StyledTable = styled(Table)`
    .ant-table-thead > tr > th {
        background-color: #f0f0f0;
        font-weight: 600;
    }

    .ant-table-row:nth-of-type(odd) {
        background-color: #fafafa;
    }

    .ant-table-row:hover {
        background-color: #e6f7ff;
        cursor: pointer;
    }

    .ant-table-row-selected {
        background-color: #bae7ff !important;
    }
`;

const ScrollContainer = styled.div`
    overflow-x: auto;
    width: 100%;
    height: 100%;
    .ant-table-wrapper {
        height: calc(100% - 50px);
        .ant-spin-nested-loading {
            height: 100%;
            .ant-spin-container {
                height: 100%;
                .ant-table {
                    height: 100%;
                }
            }
        }
    }
`;
