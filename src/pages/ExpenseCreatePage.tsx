import {DefaultFrame} from "../component/DefaultFrame.tsx";
import ContentBox from "../component/ContentBox.tsx";
import {ExpenseRegisterForm} from "../component/ExpenseRegisterForm.tsx";
import {ExpenseItem} from "../type.ts";
import {useState} from "react";
import {ExpenseAddForm} from "../component/ExpenseAddForm.tsx";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {Form} from "antd";
import {createExpenseRequest} from "../util/api.ts";

const ExpenseCreatePage = () => {
    const navigate = useNavigate()
    const [expenseList, setExpenseList] = useState<ExpenseItem[]>([]);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>()
    const register = async (values: any) => {

        const requestDate: string = dayjs(values.registerDate).startOf("month").format("YYYY-MM-DD");
        await createExpenseRequest({expenseItems: expenseList, requestDate})

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
    const onClickCancelButton = async () => {
        setIsPopupOpen(false)
    }
    const onClickAddComplete = async (form: any) => {
        // console.log(form)
        setExpenseList([...expenseList, {...form, expenseDate: form.expenseDate.format("YYYY-MM-DD")}])
        setIsPopupOpen(false);
    }
    const [mainForm] = Form.useForm();
    const [adderForm] = Form.useForm();

    return (
        <DefaultFrame>
            <ContentBox
                title={'경비 등록'}
                popupOpen={isPopupOpen}
                popup={<ExpenseAddForm
                    onCancel={onClickCancelButton}
                    onFinish={onClickAddComplete}
                    form={adderForm}
                />}
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