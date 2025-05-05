import AppLayout from "../component/AppLayout.tsx";
import MultiDisplay from "../component/MultiDisplay.tsx";
import ContentBox from "../component/ContentBox.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useForm} from "antd/es/form/Form";
import {Button, Flex, Form, Input} from "antd";
import {login} from "../api/user.ts";
import appStatusStore from "../store/AppStatusStore.ts";
import {useEffect, useState} from "react";
import {CommonConfirmModal} from "../component/CommonConfirmModal.tsx";

const LoginForm = () => {
    const navigate = useNavigate()
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [form] = useForm()
    const state: Record<'email', string | undefined> = useLocation().state
    const onClickLogin = async (values: any) => {
        appStatusStore.callApi()
        try {
            await login(values);
            appStatusStore.completeApi()
            navigate('/expenses')
        } catch (_) {
            appStatusStore.completeApi()
            setModalOpen(true)
        }
    }

    const onClickModalClose = () => {
        setModalOpen(false)
    }
    useEffect(() => {
        if (state) {
            form.setFieldValue('email', state?.email)
        }
    }, [form, state]);
    return (
        <ContentBox title={'로그인'}
                    flexDirection={'column'}
                    modalOpen={modalOpen}
                    modal={<CommonConfirmModal
                        message={'로그인에 실패했습니다\n관리자에게 문의하세요'}
                        onClickConfirm={onClickModalClose}/>}
                    onCloseModal={onClickModalClose}
        >
            <Form form={form} layout='vertical' onFinish={onClickLogin}>
                <Form.Item
                    label={'email'}
                    name={'email'}
                    rules={[{required: true, message: '이메일을 입력해 주세요'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label={'password'}
                    name={'password'}
                    rules={[{required: true, message: '비밀번호를 입력해 주세요'}]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item>
                    <Flex gap='small'>
                        <Button type='primary' htmlType='submit'>로그인</Button>
                        <Button type='primary' onClick={() => navigate('/signup')}>회원가입</Button>
                    </Flex>
                </Form.Item>
            </Form>
        </ContentBox>
    )
}

const LoginPage = () => {
    return (
        <AppLayout>
            <MultiDisplay direction={'row'}>
                <div
                    style={{
                        width: '100%',
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        height: '100%',
                        boxShadow: '4px 0 rgba(0, 0, 0, 0.1)',
                        borderRadius: '10px'
                    }}>
                    <img src='/logo.png' alt={'logo'}
                         style={{display: 'block', width: '350px', height: 'auto'}}/>
                </div>
                <div style={{
                    width: '100%', alignItems: 'center', display: 'flex', padding: '75px',
                    height: '100%',
                }}>
                    <LoginForm/>
                </div>
            </MultiDisplay>
        </AppLayout>
    )
}

export default LoginPage