import {Button, DatePicker, Divider, Flex, Form, Typography} from "antd";
import {ExpenseItem} from "../type.ts";

interface ExpenseRegisterFormProps {
    onFinish: (values: any) => Promise<void>,
    expenseList: ExpenseItem[]
    onRemoveExpense: (index: number) => void
    onClickExpenseAdd: () => void
}

export const ExpenseRegisterForm: React.FC<ExpenseRegisterFormProps> = ({onFinish, expenseList, onRemoveExpense, onClickExpenseAdd}) => {

    const totalAmount = expenseList.reduce((sum, item) => sum + Number(item.amount), 0);

    return (
        <Form onFinish={values => onFinish({...values})} layout="vertical">
            <Form.Item
                label="경비 등록 월"
                name="registerDate"
                rules={[{required: true, message: "지출월을 입력해주세요"}]}
            >
                <Flex justify='space-between'>
                    <DatePicker picker="month" format="YYYY-MM" />
                    <Button type="primary" onClick={onClickExpenseAdd}>추가하기</Button>
                </Flex>
            </Form.Item>
            {expenseList.map((expense, index) => (
                <div key={index} style={{display: "flex", alignItems: "center", marginBottom: 8}}>
                    <Typography.Text>{`${expense.expenseDate}, ${expense.purpose}에 ${expense.amount.toLocaleString()}원을 사용했어요.`}</Typography.Text>
                    <Button type="link" danger onClick={() => onRemoveExpense(index)}>❌</Button>
                </div>
            ))}
            <Divider />
            <Typography.Text strong>총 사용 금액: {totalAmount.toLocaleString()} 원</Typography.Text>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    등록
                </Button>
            </Form.Item>
        </Form>
    )
}

