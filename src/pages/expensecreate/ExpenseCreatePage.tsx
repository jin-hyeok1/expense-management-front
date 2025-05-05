import {DefaultFrame} from "../../component/DefaultFrame.tsx";
import ContentBox from "../../component/ContentBox.tsx";
import {ExpenseRegisterForm} from "../../component/ExpenseRegisterForm.tsx";
import {ButtonAction, Expense, ExpenseRequest} from "../../type.ts";
import {useEffect, useState} from "react";
import {ExpenseAddForm} from "./modal/ExpenseAddForm.tsx";
import dayjs from "dayjs";
import {useLocation, useNavigate} from "react-router-dom";
import {Form} from "antd";
import {createExpenseRequest, getExpenseByRequestId} from "../../api/expenseRequest.ts";
import appStatusStore from "../../store/AppStatusStore.ts";
import {CommonConfirmModal} from "../../component/CommonConfirmModal.tsx";

type Modal = 'add'

const ExpenseCreatePage = () => {
    const navigate = useNavigate()
    const [expenseList, setExpenseList] = useState<Expense[]>([]);
    const [modalFlag, setModalFlag] = useState<Modal | 'default' | 'defaultFail'>()
    const [modalOpen, setModalOpen] = useState<boolean>()
    const updateTarget: ExpenseRequest | undefined = useLocation().state
    const removeList = (index: number) => {
        const target = [...expenseList]
        target.splice(index, 1)
        setExpenseList(target)
    }

    const openConfirmModal = (value: 'default' | 'defaultFail') => {
        setModalFlag(value)
        setModalOpen(true)
    }
    const addExpenseRequest = async (values: any) => {
        appStatusStore.callApi()
        try {
            const requestDate: string = dayjs(values.registerDate).startOf("month").format("YYYY-MM-DD");
            await createExpenseRequest({expenseList, requestDate, id: updateTarget?.id})
            appStatusStore.completeApi()
            openConfirmModal('default')
        } catch (_) {
            appStatusStore.completeApi()
            openConfirmModal('defaultFail')
        }
    }

    const onClickModalClose = () => {
        setModalOpen(false)
        setModalFlag(undefined)
    }
    const buttonFunction: Record<Modal, Record<ButtonAction, (value?: any) => void>> = {
        add: {
            click: () => {
                setModalFlag('add')
                setModalOpen(true);
            },
            confirm: (value) => {
                setExpenseList([...expenseList, {...value, expenseDate: value.expenseDate.format("YYYY-MM-DD")}])
                setModalOpen(false);
            },
            cancel: onClickModalClose
        }
    }
    const [mainForm] = Form.useForm();
    const renderModal = () => {
        switch (modalFlag) {
            case 'add':
                return <ExpenseAddForm
                    onFinish={buttonFunction.add.confirm}
                    onCancel={buttonFunction.add.cancel}
                />
            case 'default':
                return <CommonConfirmModal message={'등록을 완료했습니다\n현황 페이지로 이동합니다'}
                                           onClickConfirm={() => navigate('/expenses')}/>
            case 'defaultFail':
                return <CommonConfirmModal message={'등록에 실패했습니다\n관리자에게 문의하세요'}
                                           onClickConfirm={onClickModalClose}/>
            default :
                return null
        }
    }

    useEffect(() => {
        if (updateTarget) {
            mainForm.setFieldValue('registerDate', dayjs(`${updateTarget.year}-${String(updateTarget.month).padStart(2, '0')}-01`))
            getExpenseByRequestId(updateTarget.id)
                .then(result => {
                    setExpenseList(result)
                })
        } else {
            mainForm.resetFields()
            setExpenseList([])
        }
    }, [mainForm, updateTarget]);
    return (
        <DefaultFrame>
            <ContentBox
                title={`경비 ${updateTarget ? '수정' : '등록'}`}
                modalOpen={modalOpen}
                modal={renderModal()}
                onCloseModal={onClickModalClose}
            >
                <ExpenseRegisterForm
                    onFinish={addExpenseRequest}
                    expenseList={expenseList}
                    onRemoveExpense={removeList}
                    onClickExpenseAdd={buttonFunction.add.click}
                    form={mainForm}
                />
            </ContentBox>
        </DefaultFrame>
    )
}

export default ExpenseCreatePage