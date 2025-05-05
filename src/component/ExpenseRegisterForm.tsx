import {Button, DatePicker, Flex, Form, FormInstance, Input, Typography} from "antd";
import {Expense} from "../type.ts";

interface ExpenseRegisterFormProps {
    onFinish: (values: any) => Promise<void>,
    expenseList: Expense[]
    onRemoveExpense: (index: number) => void
    onClickExpenseAdd: () => void
    form: FormInstance
}

export const ExpenseRegisterForm: React.FC<ExpenseRegisterFormProps> =
    ({
         onFinish,
         expenseList,
         onRemoveExpense,
         onClickExpenseAdd,
         form
     }) => {

        const totalAmount = expenseList.reduce((sum, item) => sum + Number(item.amount), 0);
        const formatDate = (dateString: string) => {
            const [year, month, day] = dateString.split("-");
            return `${year}년 ${month.padStart(2, "0")}월 ${day.padStart(2, "0")}일`;
        };

        return (
            <Form
                style={{width: '100%'}}
                onFinish={values => onFinish({...values})}
                layout="vertical"
                form={form}
            >
                <Flex justify='space-between'>
                    <Form.Item
                        label="경비 등록 월"
                        name="registerDate"
                        rules={[{required: true, message: "지출월을 입력해주세요"}]}
                    >
                        <DatePicker picker="month" format="YYYY-MM"/>
                    </Form.Item>
                    <Button type="primary" onClick={onClickExpenseAdd}>항목 추가하기</Button>
                </Flex>
                <div style={{maxHeight: 400, overflowY: 'auto', marginBottom: 16}}>
                    {expenseList.map((expense, index) => (
                        <Form.Item key={index} label={`지출내역-${index + 1}`} style={{width: '70%'}}>
                            <Flex justify={'space-between'}>
                                <Input disabled={true}
                                       value={`${formatDate(expense.expenseDate)}, ${expense.content}에 ${expense.amount.toLocaleString()}원을 사용했어요.`}/>
                                <Button type="link" danger onClick={() => onRemoveExpense(index)}>❌</Button>
                            </Flex>
                        </Form.Item>
                    ))}
                </div>
                <div style={{borderTop: '1px solid #eee', paddingTop: 16}}>
                    <Typography.Text strong>총 사용 금액: {totalAmount.toLocaleString()} 원</Typography.Text>
                    <Form.Item>
                        <Flex justify={'flex-end'}>
                            <Button type="primary" htmlType="submit">
                                등록
                            </Button>
                        </Flex>
                    </Form.Item>
                </div>
            </Form>
    )
    }

