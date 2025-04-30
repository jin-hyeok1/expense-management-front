import {DefaultFrame} from "../../component/DefaultFrame.tsx";
import ContentBox from "../../component/ContentBox.tsx";
import {ExpenseRegisterForm} from "../../component/ExpenseRegisterForm.tsx";
import {Expense, ExpenseRequest} from "../../type.ts";
import {useEffect, useState} from "react";
import {ExpenseAddForm} from "./modal/ExpenseAddForm.tsx";
import dayjs from "dayjs";
import {useLocation, useNavigate} from "react-router-dom";
import {Form} from "antd";
import {createExpenseRequest, getExpenseByRequestId} from "../../api.ts";

interface ExpenseCreatePageProp {
    id?: string,
}

const ExpenseCreatePage = ({id = undefined}: ExpenseCreatePageProp) => {
    const navigate = useNavigate()
    const [expenseList, setExpenseList] = useState<Expense[]>([]);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>()
    const updateTarget: ExpenseRequest | undefined = useLocation().state
    useEffect(() => {
        if(updateTarget) {
            mainForm.setFieldValue('registerDate', dayjs(`${updateTarget.year}-${String(updateTarget.month).padStart(2, '0')}-01`))
            getExpenseByRequestId(updateTarget.id)
                .then(result => {
                    setExpenseList(result)
                })
        } else {
            console.log('clear!')
            mainForm.resetFields()
            setExpenseList([])
        }
    }, [updateTarget]);
    const register = async (values: any) => {

        const requestDate: string = dayjs(values.registerDate).startOf("month").format("YYYY-MM-DD");
        await createExpenseRequest({expenseList, requestDate, id: updateTarget?.id})

        navigate('/expenses')
    }
    const removeList = (index: number) => {
        const target = [...expenseList]
        target.splice(index, 1)
        setExpenseList(target)
    }

    const onClickAddButton = () => {
        setIsPopupOpen(true);
    }
    const onClickCancelButton = () => {
        setIsPopupOpen(false)
        adderForm.resetFields()
    }
    const onClickAddComplete = async (form: any) => {
        // console.log(form)
        setExpenseList([...expenseList, {...form, expenseDate: form.expenseDate.format("YYYY-MM-DD")}])
        adderForm.resetFields()
        setIsPopupOpen(false);
    }
    const [mainForm] = Form.useForm();
    const [adderForm] = Form.useForm();
    useEffect(() => {
        if (id) {
            mainForm.setFieldValue('id', id);
        }
    }, []);
    return (
        <DefaultFrame>
            <ContentBox
                title={`경비 ${updateTarget ? '수정' : '등록'}`}
                modalOpen={isPopupOpen}
                modal={<ExpenseAddForm
                    onCancel={onClickCancelButton}
                    onFinish={onClickAddComplete}
                    form={adderForm}
                />}
                onCloseModal={onClickCancelButton}
            >
                <ExpenseRegisterForm
                    onFinish={register}
                    expenseList={expenseList}
                    onRemoveExpense={removeList}
                    onClickExpenseAdd={onClickAddButton}
                    form={mainForm}
                />
            </ContentBox>
        </DefaultFrame>
    )
}

export default ExpenseCreatePage