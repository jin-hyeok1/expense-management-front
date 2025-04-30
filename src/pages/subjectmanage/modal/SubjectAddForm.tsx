import {Subject} from "../../../type.ts";
import {useForm} from "antd/es/form/Form";
import {useEffect} from "react";
import {Button, Flex, Form, Input} from "antd";

interface SubjectAddProp {
    subject?: Subject,
    onFinish: (values: any) => Promise<void>
    onCancel: () => void,
}

export const SubjectAddForm: React.FC<SubjectAddProp> = ({subject, onFinish, onCancel}) => {
    const [form] = useForm()
    useEffect(() => {
        if (subject) {
            form.setFieldValue('name', subject.name);
        }
    }, []);

    return (
        <Form
            form={form}
            onFinish={values => onFinish({...values})}
            layout='vertical'
            autoComplete={'off'}
        >
            <Form.Item
                label={'이름'}
                name={'name'}
                rules={[{required: true, message: "지출월일을 입력해주세요"}]}
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Flex gap={'small'}>
                    <Button type={'default'} onClick={onCancel} style={{width: '100%'}}>취소</Button>
                    <Button htmlType={'submit'} type={'primary'} style={{width: '100%'}}>생성</Button>
                </Flex>
            </Form.Item>
        </Form>
    )
}