import {DefaultFrame} from "../component/DefaultFrame.tsx";
import ContentBox from "../component/ContentBox.tsx";
import {ExpenseRegisterForm} from "../component/ExpenseRegisterForm.tsx";
import {ExpenseItem} from "../type.ts";

const ExpenseCreatePage = () => {
    const expenseList: ExpenseItem[] = []
    const temp = async (values: any) => {
        console.log(values)
    }
    const removeList = (index: number) => {
        console.log(index + '삭제 예정')
    }
    return (
        <DefaultFrame>
            <ContentBox title={'경비 등록'}>
                <ExpenseRegisterForm
                    onFinish={temp}
                    expenseList={expenseList}
                    onRemoveExpense={removeList}
                    onClickExpenseAdd={() => console.log('클릭')}
                />
            </ContentBox>
        </DefaultFrame>
    )
}

export default ExpenseCreatePage