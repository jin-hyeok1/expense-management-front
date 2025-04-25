import React, {useState} from "react";
import styled from "@emotion/styled";
import {Button} from "antd";
import {ButtonType} from "antd/es/button";

interface ExpenseStatus {
    name: "CREATED" | "SUBMITTED" | "REVIEWING" | "APPROVED" | "REJECTED";
    displayValue: string;
}

type ActionType = "상신" | "상신 취소" | "검토" | "반려" | "승인" | "수정" | "삭제";

const statusColorMap: Record<ExpenseStatus["name"], string> = {
    CREATED: "#808080",
    SUBMITTED: "#1E90FF",
    REVIEWING: "#FFA500",
    APPROVED: "#2ECC71",
    REJECTED: "#E74C3C",
};

const statusActionMap: Record<ExpenseStatus["name"], { label: ActionType; type: ButtonType }[]> = {
    CREATED: [
        {label: "수정", type: "dashed"},
        {label: "삭제", type: "dashed"},
        {label: "상신", type: "primary"}
    ],
    SUBMITTED: [
        {label: "상신 취소", type: "dashed"},
        {label: "검토", type: "primary"},
    ],
    REVIEWING: [
        {label: "승인", type: "primary"},
        {label: "반려", type: "default"},
    ],
    APPROVED: [],
    REJECTED: [
        {label: "수정", type: "dashed"},
        {label: "삭제", type: "dashed"},
        {label: "상신", type: "primary"}
    ],
};

interface ExpenseCardProps {
    title: string;
    count: number;
    amount: number;
    date: string;
    status: ExpenseStatus;
    onActionClick: (action: string) => void;
}

export const ExpenseCard: React.FC<ExpenseCardProps> =
    ({
         title,
         count,
         amount,
         date,
         status,
         onActionClick,
     }) => {
        const [showMenu, setShowMenu] = useState(false);

        return (
            <CardContainer selected={false}>
                <CardHeader>
                    <StatusBadge color={statusColorMap[status.name]}>{status.displayValue}</StatusBadge>
                    <Title>{title}</Title>
                    <MoreArea>
                        <Button onClick={() => setShowMenu(!showMenu)}>더보기</Button>
                        {showMenu && (
                            <MenuActions>
                                {statusActionMap[status.name].map(({label, type}) => (
                                    <Button key={label} type={type} onClick={() => onActionClick(label)}>
                                        {label}
                                    </Button>
                                ))}
                            </MenuActions>
                        )}
                    </MoreArea>
                </CardHeader>

                <CardContent>
                    <Line>지출 건수: {count} 건</Line>
                    <Line>총액: {amount.toLocaleString()} 원</Line>
                    <Line>최종작성일: {date}</Line>
                </CardContent>
            </CardContainer>
        );
    };

const CardContainer = styled.div<{ selected: boolean }>`
    width: 620px;
    height: 200px;
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background-color: white;
`;

const CardHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
`;

const StatusBadge = styled.span<{ color: string }>`
    font-size: 20px;
    font-weight: bold;
    color: white;
    background-color: ${({color}) => color};
    padding: 4px 12px;
    border-radius: 16px;
`;
const MoreArea = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;
const Title = styled.h2`
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    margin: 0 auto;
`;

const MenuActions = styled.div`
    position: absolute;
    border: none;
    top: 36px; // 버튼 아래로 살짝 내려오도록 조정
    right: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background-color: white;
    z-index: 10;
`;

const CardContent = styled.div`
    font-size: 20px;
    padding-top: 8px;
`;

const Line = styled.div`
    margin: 4px 0;
`;