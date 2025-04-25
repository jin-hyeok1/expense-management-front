import styled from "@emotion/styled";
import React, {useState} from "react";


interface ExpenseCardListProps {
    children: React.ReactNode,
    totalPages: number,
    onClickPage: () => void
}

export const ExpenseCardList: React.FC<ExpenseCardListProps> =
    ({
         children,
         totalPages,
         onClickPage
     }) => {
        const [currentPage, setCurrentPage] = useState(1)
        const onClickPageInner = (index: number) => {
            setCurrentPage(index + 1)
            onClickPage()
        }

        return (
            <div>
                <ListWrapper>
                    {children}
                </ListWrapper>

                <Pagination>
                    {Array.from({length: totalPages}).map((_, index) => (
                        <PageButton
                            key={index}
                            onClick={() => onClickPageInner(index)}
                            active={currentPage === index + 1}
                        >
                            {index + 1}
                        </PageButton>
                    ))}
                </Pagination>
            </div>
        )
    }

// 스타일
const ListWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
`

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
`

const PageButton = styled.button<{ active: boolean }>`
    padding: 6px 12px;
    border: none;
    background-color: ${({active}) => (active ? '#007BFF' : '#e0e0e0')};
    color: ${({active}) => (active ? '#fff' : '#333')};
    border-radius: 6px;
    cursor: pointer;
    font-weight: ${({active}) => (active ? 'bold' : 'normal')};

    &:hover {
        background-color: #0056b3;
        color: #fff;
    }
`