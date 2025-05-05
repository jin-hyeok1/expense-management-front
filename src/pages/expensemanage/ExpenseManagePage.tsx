import {DefaultFrame} from "../../component/DefaultFrame.tsx";
import ContentBox from "../../component/ContentBox.tsx";
import {useCallback, useEffect, useState} from "react";
import {ButtonAction, ButtonSetting, ExpenseRequest, ExpenseStatus, Pageable, User} from "../../type.ts";
import DataGrid from "../../component/DataGrid.tsx";
import {getPageable} from "../../util.ts";
import {Button} from "antd";
import {CommonModal} from "../../component/CommonModal.tsx";
import dayjs from "dayjs";
import {
    approveExpenseRequest,
    cancelApproveOfExpenseRequest, deleteExpenseRequestByAdmin,
    getAllExpense,
    rejectExpenseRequest,
    reviewExpenseRequest
} from "../../api/admin.ts";
import {downloadInvoice, downloadReportInvoice} from "../../api/expenseRequest.ts";
import {CommonConfirmModal} from "../../component/CommonConfirmModal.tsx";
import appStatusStore from "../../store/AppStatusStore.ts";

type Modal = 'review' | 'approve' | 'reject' | 'cancelApprove' | 'delete' | 'report' | 'reportSubmit'

export const ExpenseManagePage: React.FC = () => {
    const [modalOpen, setModalOpen] = useState<boolean>()
    const [modalFlag, setModalFlag] = useState<Modal | 'default'>()
    const [confirmMessage, setConfirmMessage] = useState<string>('')
    const [data, setData] = useState<ExpenseRequest[]>([])
    const [selected, setSelected] = useState<ExpenseRequest>()
    const [pageable, setPageable] = useState<Pageable>({currentPage: 1})
    const initData = useCallback(async () => {
        const response = await getAllExpense(pageable.currentPage, 8)
        setData(response.content)
        setPageable(getPageable(response))
        setSelected(undefined)
    }, [pageable.currentPage])
    const onChangePage = async (page: number) => {
        setPageable({...pageable, currentPage: page})
    }
    const onSelect = async (value: any, _: number | undefined) => {
        setSelected(value)
    }

    const openConfirmModal = () => {
        setModalFlag('default')
        setModalOpen(true)
    }
    const onClickModalClose = () => {
        setModalOpen(false)
        setModalFlag(undefined)
    }
    const buttonFunctions: Record<Modal, Record<ButtonAction, () => void>> = {
        review: {
            click: () => {
                setModalFlag('review');
                setModalOpen(true);
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
                    await reviewExpenseRequest(selected.id)
                    await initData()
                    onClickModalClose()
                    appStatusStore.completeApi()
                    setConfirmMessage('검토 상태로 변경 완료했습니다')
                    openConfirmModal()
                } catch (_) {
                    appStatusStore.completeApi()
                    setConfirmMessage('검토 상태 변경이 실패했습니다\n관리자에게 문의하세요')
                    openConfirmModal()
                }
            },
            cancel: onClickModalClose
        },
        approve: {
            click: () => {
                setModalFlag('approve')
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
                    await approveExpenseRequest(selected.id)
                    await initData()
                    appStatusStore.completeApi()
                    setConfirmMessage('승인 처리가 완료되었습니다')
                    openConfirmModal()
                } catch (_) {
                    appStatusStore.completeApi()
                    setConfirmMessage('승인 처리에 실패했습니다\n관리자에게 문의하세요')
                    openConfirmModal()
                }
            },
            cancel: onClickModalClose
        },
        reject: {
            click: () => {
                setModalFlag('reject')
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
                    await rejectExpenseRequest(selected.id)
                    await initData()
                    appStatusStore.completeApi()
                    setConfirmMessage('반려처리가 완료되었습니다')
                    openConfirmModal()
                } catch (_) {
                    appStatusStore.completeApi()
                    setConfirmMessage('반려처리에 실패했습니다\n관리자에게 문의하세요')
                    openConfirmModal()
                }
            },
            cancel: onClickModalClose
        },
        cancelApprove: {
            click: () => {
                setModalFlag('cancelApprove')
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
                    await cancelApproveOfExpenseRequest(selected.id)
                    await initData()
                    appStatusStore.completeApi()
                    setConfirmMessage('승인 취소가 완료되었습니다')
                    openConfirmModal()
                } catch (_) {
                    appStatusStore.completeApi()
                    setConfirmMessage('승인 취소에 실패했습니다\n관리자에게 문의하세요')
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
                    await deleteExpenseRequestByAdmin(selected.id)
                    await initData()
                    appStatusStore.completeApi()
                    setConfirmMessage('삭제가 완료되었습니다')
                    openConfirmModal()
                } catch (_) {
                    appStatusStore.completeApi()
                    setConfirmMessage('삭제에 실패했습니다\n관리자에게 문의하세요')
                    openConfirmModal()
                }
            },
            cancel: onClickModalClose
        },
        report: {
            click: () => {
                setModalFlag('report')
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
                    await downloadInvoice(selected.id)
                    appStatusStore.completeApi()
                } catch (_) {
                    appStatusStore.completeApi()
                    setConfirmMessage('보고서 다운로드에 실패했습니다\n관리자에게 문의하세요')
                    openConfirmModal()
                }
            },
            cancel: onClickModalClose
        },
        reportSubmit: {
            click: () => {
                setModalFlag('reportSubmit')
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
                    await downloadReportInvoice(selected.id)
                    appStatusStore.completeApi()
                } catch (_) {
                    appStatusStore.completeApi()
                    setConfirmMessage('보고서(출력용) 다운로드에 실패했습니다\n관리자에게 문의하세요')
                    openConfirmModal()
                }
            },
            cancel: onClickModalClose
        }
    }

    const buttonSettings: ButtonSetting[] = [
        {
            disabled: !selected || selected.status.name !== 'SUBMITTED',
            type: 'primary',
            onClick: buttonFunctions.review.click,
            content: '검토'
        }, {
            disabled: !selected || selected.status.name !== 'REVIEWING',
            type: 'primary',
            onClick: buttonFunctions.approve.click,
            content: '승인'
        }, {
            disabled: !selected || selected.status.name !== 'REVIEWING',
            type: 'default',
            onClick: buttonFunctions.reject.click,
            content: '반려'
        }, {
            disabled: !selected || selected.status.name !== 'APPROVED',
            type: 'default',
            onClick: buttonFunctions.cancelApprove.click,
            content: '승인 취소'
        }, {
            disabled: !selected || selected.status.name !== 'APPROVED',
            type: 'default',
            onClick: buttonFunctions.delete.click,
            content: '삭제'
        }, {
            disabled: !selected,
            type: 'primary',
            onClick: buttonFunctions.report.click,
            content: '보고서'
        }, {
            disabled: !selected,
            type: 'primary',
            onClick: buttonFunctions.reportSubmit.click,
            content: '보고서(제출용)'
        }
    ]

    const renderModal = () => {
        switch (modalFlag) {
            case 'review':
                return <CommonModal
                    message={'경비 요청을 검토하시겠습니까?'}
                    onClickConfirm={buttonFunctions.review.confirm}
                    onClickCancel={buttonFunctions.review.cancel}/>
            case 'approve':
                return <CommonModal
                    message={'경비 요청을 승인하시겠습니까?'}
                    onClickConfirm={buttonFunctions.approve.confirm}
                    onClickCancel={buttonFunctions.approve.cancel}/>
            case 'reject' :
                return <CommonModal
                    message={'경비 요청을 반려하시겠습니까?'}
                    onClickConfirm={buttonFunctions.reject.confirm}
                    onClickCancel={buttonFunctions.reject.cancel}/>
            case 'cancelApprove' :
                return <CommonModal
                    message={'경비 요청을 승인 취소하시겠습니까?'}
                    onClickConfirm={buttonFunctions.cancelApprove.confirm}
                    onClickCancel={buttonFunctions.cancelApprove.cancel}/>
            case 'delete' :
                return <CommonModal
                    message={'경비 요청을 삭제하시겠습니까?'}
                    onClickConfirm={buttonFunctions.delete.confirm}
                    onClickCancel={buttonFunctions.delete.cancel}/>
            case 'report' :
                return <CommonModal
                    message={'경비 요청을 보고서를 다운하시겠습니까?'}
                    onClickConfirm={buttonFunctions.report.confirm}
                    onClickCancel={buttonFunctions.report.cancel}/>
            case 'reportSubmit' :
                return <CommonModal
                    message={'경비 요청을 보고서(제출용)을 다운하시겠습니까?'}
                    onClickConfirm={buttonFunctions.reportSubmit.confirm}
                    onClickCancel={buttonFunctions.reportSubmit.cancel}/>
            case 'default' :
                return <CommonConfirmModal message={confirmMessage} onClickConfirm={onClickModalClose} />
            default :
                return null
        }
    }

    useEffect(() => {
        initData()
    }, [initData]);
    return (
        <DefaultFrame>
            <ContentBox
                title={'경비요청 관리'}
                modalOpen={modalOpen}
                modal={renderModal()}
                onCloseModal={onClickModalClose}
            >
                <DataGrid
                    data={data}
                    headers={[
                        {
                            key: 'writer',
                            displayValue: '작성자',
                            render: (value: User) => value.name
                        },
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
                    onSelect={onSelect}
                    selected={selected}
                    onChangePage={onChangePage}
                    {...pageable}
                ></DataGrid>
            </ContentBox>

        </DefaultFrame>
    )
}