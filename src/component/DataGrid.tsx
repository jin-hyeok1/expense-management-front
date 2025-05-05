import React from "react";
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
    onSelect?: (record: any, index?: number) => void,
    selected: any,
    onChangePage: (page: number) => void;
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
         onSelect,
         selected,
     }) => {
        const columns: ColumnsType<any> = headers.map((header) => ({
            title: header.displayValue,
            dataIndex: header.key,
            key: header.key,
            render: header.render,
            width: header.width
        }));

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
                        rowClassName={(_, index) =>
                            index % 2 === 0 ? 'even-row' : 'odd-row'
                        }
                        dataSource={data}
                        columns={columns}
                        id={'name'}
                        pagination={{
                            total: totalItems,
                            current: currentPage,
                            pageSize,
                            onChange: (page, _) => onChangePage(page)
                        }}
                        onRow={(record: any, rowIndex) => ({
                            onClick: () => {
                                if (onSelect) {
                                    if (selected && record[rowKey] === selected[rowKey]) {
                                        onSelect(undefined, -1)
                                    } else {
                                        onSelect(record, rowIndex)
                                    }
                                }
                            }
                        })}
                        rowSelection={{
                            type: 'radio',
                            selectedRowKeys: selected ? [selected[rowKey]] : [],
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

    .even-row {
        background-color: #f0f0f0;
    }

    .odd-row {
        background-color: #fafafa;
    }

    .ant-table-cell-row-hover {
        background-color: #e6f7ff;
        cursor: pointer;
    }

`;

const ScrollContainer = styled.div`
    overflow-x: auto;
    width: 100%;
    height: 100%;

    .ant-table-tbody {
        .ant-table-row.ant-table-row-selected {
            .ant-table-cell {
                background-color: #bae7ff;
            }
        }

        .ant-table-row {
            .ant-table-cell {
                .ant-radio-wrapper {
                    .ant-radio {
                        display: none;
                    }
                }
            }

            .ant-table-cell-row-hover {
                background-color: #e6f7ff;
            }
        }
    }

    .ant-table-wrapper {
        user-select: none;
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
