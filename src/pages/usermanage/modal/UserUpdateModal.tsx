import {User} from "../../../type.ts";
import {useForm} from "antd/es/form/Form";
import {useEffect} from "react";
import {Button, DatePicker, Flex, Form, Input} from "antd";
import dayjs from "dayjs";

interface UserUpdateModalProps {
    user: User
    onFinish: (values: User) => void
    onClose: () => void
}

export const UserUpdateModal: React.FC<UserUpdateModalProps> = ({user, onFinish, onClose}) => {
    const [form] = useForm()

    useEffect(() => {
        const transformedUser = {
            ...user,
            birthDate: dayjs(user.birthDate), // string → dayjs 객체
        };
        form.setFieldsValue(transformedUser);
    }, [form, user]);

    return (
        <Form
            form={form}
            layout={'vertical'}
            onFinish={values => onFinish({...values})}
        >
            <Form.Item
                label={'이메일'}
                name={'email'}
                tooltip={'고유값이므로 수정할 수 없습니다'}
            >
                <Input disabled={true}/>
            </Form.Item>
            <Form.Item
                label={'이름'}
                name={'name'}
                rules={[{required: true, message: "이름을 입력해주세요"}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label={'연락처'}
                name={'phone'}
                rules={[{required: true, message: '연락처를 입력해주세요'}]}
            >
                <Input placeholder={'000-0000-0000'}/>
            </Form.Item>
            <Form.Item
                label={'생년월일'}
                name={'birthDate'}
                rules={[{required: true, message: '생년월일을 입력해주세요'}]}
            >
                <DatePicker format={'YYYY-MM-DD'} style={{width: '100%'}}/>
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