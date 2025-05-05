import {useForm} from "antd/es/form/Form";
import {useEffect} from "react";
import {Button, Flex, Form, Input} from "antd";

interface PasswordUpdateModalByMeProps {
    onFinish: (values: any) => void,
    onCancel: () => void,
}

export const PasswordUpdateModalByMe: React.FC<PasswordUpdateModalByMeProps> = ({onFinish, onCancel}) => {
    const [form] = useForm()
    useEffect(() => {
        form.resetFields()
    }, [form]);
    return (
        <Form
            form={form}
            onFinish={values => onFinish({...values})}
            layout={'vertical'}
        >
            <Form.Item
                label={'현재 비밀번호'}
                name={'currentPassword'}
                rules={[{required: true, message: '현재 비밀번호를 입력해주세요'}]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="비밀번호"
                name="newPassword"
                rules={[{required: true, message: "비밀번호를 입력해주세요"}]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item
                label="비밀번호 확인"
                name="newPasswordCheck"
                dependencies={['newPassword']}
                rules={[
                    {required: true, message: "비밀번호를 한번 더 입력해주세요"},
                    ({getFieldValue}) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
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
                    <Button type="default" onClick={onCancel} style={{width: '100%'}}>
                        취소
                    </Button>
                    <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                        변경
                    </Button>
                </Flex>
            </Form.Item>
        </Form>
    )
}