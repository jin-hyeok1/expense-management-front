import {useForm} from "antd/es/form/Form";
import {Button, Flex, Form, Input} from "antd";

interface PasswordUpdateModalProps {
    onFinish: (values: any) => void
    onClose: () => void
}

export const PasswordUpdateModal: React.FC<PasswordUpdateModalProps> = ({onFinish, onClose}) => {
    const [form] = useForm();
    return (
        <Form
            form={form}
            layout={'vertical'}
            onFinish={values => onFinish({...values})}
        >
            <Form.Item
                label="비밀번호"
                name="password"
                rules={[{required: true, message: "비밀번호를 입력해주세요"}]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item
                label="비밀번호 확인"
                name="passwordCheck"
                dependencies={['password']}
                rules={[
                    {required: true, message: "비밀번호를 한번 더 입력해주세요"},
                    ({getFieldValue}) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject(new Error('비밀번호가 일치하지 않습니다'))
                        },
                    }),
                ]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item>
                <Flex gap='small'>
                    <Button type="default" onClick={onClose} style={{width: '100%'}}>
                        취소
                    </Button>
                    <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                        확인
                    </Button>
                </Flex>
            </Form.Item>
        </Form>
    )
}