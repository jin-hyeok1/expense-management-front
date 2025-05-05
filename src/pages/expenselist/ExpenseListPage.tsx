import {DefaultFrame} from "../../component/DefaultFrame.tsx";
import ContentBox from "../../component/ContentBox.tsx";
import {useUser} from "../../context/UserContext.tsx";
import {ButtonAction, ButtonSetting, ExpenseRequest, ExpenseStatus, Pageable} from "../../type.ts";
import {useCallback, useEffect, useState} from "react";
import DataGrid from "../../component/DataGrid.tsx";
import {Button} from "antd";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {CommonModal} from "../../component/CommonModal.tsx";
import {getPageable} from "../../util.ts";
import {
    deleteExpense,
    getExpenseRequestsForMe,
    submitCancelExpenseRequest,
    submitExpenseRequest
} from "../../api/expenseRequest.ts";
import appStatusStore from "../../store/AppStatusStore.ts";
import {CommonConfirmModal} from "../../component/CommonConfirmModal.tsx";

type Modal = 'submit' | 'submitCancel' | 'delete'

const ExpenseListPage = () => {
    const user = useUser();
    const navigate = useNavigate()
    const [data, setData] = useState<ExpenseRequest[]>([])
    const [pageable, setPageable] = useState<Pageable>({currentPage: 1})
    const [selected, setSelected] = useState<ExpenseRequest>()
    const [modalFlag, setModalFlag] = useState<Modal | 'default'>()
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [confirmMessage, setConfirmMessage] = useState<string>('')
    const initData = useCallback(async () => {
        const response = await getExpenseRequestsForMe(pageable.currentPage, 5);
        setData(response.content);
        setPageable(getPageable(response));
        setSelected(undefined);
    }, [pageable.currentPage])
    const onSelect = (value: any, _: number | undefined) => {
        setSelected(value)
    }
    const onChangePage = (page: number) => {
        setPageable({...pageable, currentPage: page})
    }

    // button 설정
    const openConfirmModal = () => {
        setModalOpen(true)
        setModalFlag('default')
    }
    const onClickModalClose = () => {
        setModalOpen(false)
        setModalFlag(undefined)
    }
    const buttonFunction: Record<Modal, Record<ButtonAction, () => void>> = {
        submit: {
            click: () => {
                setModalFlag('submit')
                setModalOpen(true)
            },
            confirm: async () => {
                if (!selected) {
                    setConfirmMessage('항목 선택이 필요합니다')
                    openConfirmModal()
                    return
                }
                onClickModalClose()
                appStatusStore.callApi()
                try {
                    await submitExpenseRequest(selected.id)
                    await initData()
                    appStatusStore.completeApi()
                    setConfirmMessage('경비가 상신 완료되었습니다')
                    openConfirmModal()
                } catch (_) {
                    appStatusStore.completeApi()
                    setConfirmMessage('경비 상신이 실패했습니다\n관리자에게 문의하세요')
                    openConfirmModal()
                }
            },
            cancel: onClickModalClose
        },
        submitCancel: {
            click: () => {
                setModalFlag('submitCancel')
                setModalOpen(true)
            },
            confirm: async () => {
                if (!selected) {
                    setConfirmMessage('항목 선택이 필요합니다')
                    openConfirmModal()
                    return
                }
                onClickModalClose()
                appStatusStore.callApi()
                try {
                    await submitCancelExpenseRequest(selected.id)
                    await initData()
                    appStatusStore.completeApi()
                    setConfirmMessage('경비 상신이 취소되었습니다')
                    openConfirmModal()
                } catch (_) {
                    appStatusStore.completeApi()
                    setConfirmMessage('경비 상신 취소가 실패했습니다\n관리자에게 문의하세요')
                    openConfirmModal()
                }
            },
            cancel: onClickModalClose
        },
        delete: {
            click: () => {
                setModalFlag('delete')
                setModalOpen(true)
            },
            confirm: async () => {
                if (!selected) {
                    setConfirmMessage('항목 선택이 필요합니다')
                    openConfirmModal()
                    return
                }
                onClickModalClose()
                appStatusStore.callApi()
                try {
                    await deleteExpense(selected.id)
                    await initData()
                    appStatusStore.completeApi()
                    setConfirmMessage('경비가 삭제되었습니다')
                    openConfirmModal()
                } catch (_) {
                    appStatusStore.completeApi()
                    setConfirmMessage('경비 삭제에 실패했습니다\n관리자에게 문의하세요')
                    openConfirmModal()
                }
            },
            cancel: onClickModalClose
        }
    }

    const buttonSettings: ButtonSetting[] = [
        {
            disabled: false,
            type: 'primary',
            onClick: () => navigate('/expense/new'),
            content: '추가'
        }, {
            disabled: !selected || !(selected.status.name === 'CREATED' || selected.status.name === 'REJECTED'),
            type: 'default',
            onClick: () => navigate('/expense/new', {state: selected}),
            content: '수정'
        }, {
            disabled: !selected || !(selected.status.name === 'CREATED' || selected.status.name === 'REJECTED'),
            type: 'default',
            onClick: buttonFunction.delete.click,
            content: '삭제'
        }, {
            disabled: !selected || !(selected.status.name === 'CREATED' || selected.status.name === 'REJECTED'),
            type: 'primary',
            onClick: buttonFunction.submit.click,
            content: '상신'
        }, {
            disabled: !selected || selected.status.name !== 'SUBMITTED',
            type: 'default',
            onClick: buttonFunction.submitCancel.click,
            content: '상신취소'
        }
    ]

    // modal 설정
    const renderModal = () => {
        switch (modalFlag) {
            case 'submit':
                return <CommonModal
                    message={'경비를 상신하시겠습니까?'}
                    onClickConfirm={buttonFunction.submit.confirm}
                    onClickCancel={buttonFunction.submit.cancel}
                />;
            case 'submitCancel':
                return <CommonModal
                    message={'경비 상신을 취소하시겠습니까?'}
                    onClickConfirm={buttonFunction.submitCancel.confirm}
                    onClickCancel={buttonFunction.submitCancel.cancel}
                />;
            case 'delete':
                return <CommonModal
                    message={'경비 요청을 삭제하시겠습니까?'}
                    onClickConfirm={buttonFunction.delete.confirm}
                    onClickCancel={buttonFunction.delete.cancel}
                />
            case 'default':
                return <CommonConfirmModal message={confirmMessage} onClickConfirm={onClickModalClose}/>
            default:
                return null;
        }
    };


    useEffect(() => {
        initData()
    }, [initData]);
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
                    selected={selected}
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
                    buttons={buttonSettings.map((setting, idx) =>
                        <Button
                            key={idx}
                            disabled={setting.disabled}
                            type={setting.type}
                            onClick={setting.onClick}>
                            {setting.content}
                        </Button>
                    )}
                    {...pageable}
                    onChangePage={onChangePage}
                    onSelect={onSelect}
                />
            </ContentBox>
        </DefaultFrame>
    )
}
export default ExpenseListPage