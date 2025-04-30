import {DefaultFrame} from "../../component/DefaultFrame.tsx";
import ContentBox from "../../component/ContentBox.tsx";
import {useUser} from "../../hooks/UserContext.tsx";
import {deleteExpense, getExpenseRequestsForMe, submitCancelExpenseRequest, submitExpenseRequest} from "../../api.ts";
import {ExpenseRequest, ExpenseStatus, getPageable, Pageable} from "../../type.ts";
import {useEffect, useState} from "react";
import DataGrid from "../../component/DataGrid.tsx";
import {Button} from "antd";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {CommonModal} from "../../component/CommonModal.tsx";

type Modal = '상신' | '상신취소' | '삭제' | undefined

const ExpenseListPage = () => {
    const user = useUser();
    const navigate = useNavigate()
    const [data, setData] = useState<ExpenseRequest[]>([])
    const [pageable, setPageable] = useState<Pageable>()
    const [selected, setSelected] = useState<ExpenseRequest>()
    const [modalFlag, setModalFlag] = useState<Modal>()
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const initData = async () => {
        const response = await getExpenseRequestsForMe(pageable?.currentPage ?? 1)
        setData(response.content)
        setPageable(getPageable(response))
        setSelected(undefined)
    }
    const onChangePage = async (page: number, pageSize: number) => {
        const response = await getExpenseRequestsForMe(page, pageSize)
        setData(response.content)
        setPageable(getPageable(response))
    }
    const onSelect = async (value: any, _: number | undefined) => {
        setSelected(value)
    }

    // button 설정
    const onClickSubmitButton = () => {
        setModalFlag('상신')
        setModalOpen(true)
    }
    const onClickSubmitCancelButton = () => {
        setModalFlag('상신취소')
        setModalOpen(true)
    }
    const onClickRemoveButton = () => {
        setModalFlag('삭제')
        setModalOpen(true)
    }

    const buttons = [
        <Button type={'primary'} onClick={() => navigate('/expense/new')}>추가</Button>,
        <Button disabled={!selected || !(selected.status.name === 'CREATED' || selected.status.name === 'REJECTED')}
                type={'default'} onClick={() => navigate('/expense/new', {state: selected})}>수정</Button>,
        <Button disabled={!selected || !(selected.status.name === 'CREATED' || selected.status.name === 'REJECTED')}
                onClick={onClickRemoveButton}>삭제</Button>,
        <Button disabled={!selected || !(selected.status.name === 'CREATED' || selected.status.name === 'REJECTED')}
                onClick={onClickSubmitButton} type={'primary'}>상신</Button>,
        <Button disabled={!selected || selected.status.name !== 'SUBMITTED'}
                onClick={onClickSubmitCancelButton}>상신취소</Button>,
    ]

    // modal 설정
    const onClickSubmitConfirmButton = async () => {
        await submitExpenseRequest(selected?.id!!)
        await initData()
        onClickModalClose()
    }
    const onClickSubmitCancelConfirmButton = async () => {
        await submitCancelExpenseRequest(selected?.id!!)
        await initData()
        onClickModalClose()
    }
    const onClickRemoveConfirmButton = async () => {
        await deleteExpense(selected?.id!!)
        await initData()
        onClickModalClose()
    }
    const onClickModalClose = () => {
        setModalOpen(false)
        setModalFlag(undefined)
    }

    const renderModal = () => {
        switch (modalFlag) {
            case '상신':
                return <CommonModal
                    message={'경비를 상신하시겠습니까?'}
                    onClickConfirm={onClickSubmitConfirmButton}
                    onClickCancel={onClickModalClose}
                />;
            case '상신취소':
                return <CommonModal
                    message={'경비 상신을 취소하시겠습니까?'}
                    onClickConfirm={onClickSubmitCancelConfirmButton}
                    onClickCancel={onClickModalClose}
                />;
            case '삭제':
                return <CommonModal
                    message={'경비 요청을 삭제하시겠습니까?'}
                    onClickConfirm={onClickRemoveConfirmButton}
                    onClickCancel={onClickModalClose}
                />
            default:
                return null;
        }
    };


    useEffect(() => {
        initData()
    }, []);
    return (
        <DefaultFrame>
            <ContentBox
                title={`${user?.name} 님의 경비 등록 현황`}
                modalOpen={modalOpen}
                modal={renderModal()}
                onCloseModal={onClickModalClose}
            >
                <DataGrid
                    data={data}
                    headers={[
                        {
                            key: 'year',
                            displayValue: '년도',
                            render: (value: number) => `${value}년`
                        },
                        {
                            key: 'month',
                            displayValue: '월',
                            render: (value: number) => String(value).padStart(2, '0') + '월'
                        },
                        {
                            key: 'count',
                            displayValue: '항목수',
                            render: (value: number) => `${value}건`
                        },
                        {
                            key: 'totalAmount',
                            displayValue: '총액',
                            render: (value: number) => `${value.toLocaleString()}원`
                        },
                        {
                            key: 'status',
                            displayValue: '상태',
                            render: (value: ExpenseStatus) => value.displayValue
                        },
                        {
                            key: 'modifiedDate',
                            displayValue: '최종작성일',
                            render: (value: string) => dayjs(value).format("YYYY년 MM월 DD일")
                        }
                    ]}
                    buttons={buttons}
                    {...pageable}
                    onChangePage={onChangePage}
                    onSelect={onSelect}
                />
            </ContentBox>
        </DefaultFrame>
    )
}
export default ExpenseListPage