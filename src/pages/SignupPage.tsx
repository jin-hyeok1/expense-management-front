import AppLayout from "../component/AppLayout.tsx";
import ContentBox from "../component/ContentBox.tsx";
import MultiDisplay from "../component/MultiDisplay.tsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, DatePicker, Flex, Form, Input} from "antd";
import {useForm} from "antd/es/form/Form";
import dayjs from "dayjs";
import {sendVerificationCodeMail, signup, verifyCode} from "../api/user.ts";
import appStatusStore from "../store/AppStatusStore.ts";
import {CommonConfirmModal} from "../component/CommonConfirmModal.tsx";
import {ButtonAction} from "../type.ts";

type Modal = 'signup' | 'emailSend' | 'verification'

const SignupForm = () => {
    const navigate = useNavigate();
    const [form] = useForm()
    const onCloseModal = () => {
        setModalOpen(false)
        setModalFlag(undefined)
    }
    const navigateToLoginOnCloseModal = () => {
        navigate('/login', {state: {email: form.getFieldValue('email')}})
    }
    const [timer, setTimer] = useState<number>(0);
    const [verified, setVerified] = useState<boolean>(false)
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [modalFlag, setModalFlag] = useState<Modal | 'default'>()
    const [confirmMessage, setConfirmMessage] = useState<string>('')
    const email: string = Form.useWatch('email', form)
    const verificationCode: string = Form.useWatch('verificationCode', form)

    const buttonSettings: Record<Modal, Record<ButtonAction, (values?: any) => void>> = {
        emailSend: {
            click: async () => {
                appStatusStore.callApi()
                try {
                    await sendVerificationCodeMail(email)
                    appStatusStore.completeApi()
                    setTimer(180);
                    const timerInterval = setInterval(() => {
                        setTimer((prev) => {
                            if (prev > 0) {
                                return prev - 1;
                            } else {
                                clearInterval(timerInterval)
                                return 0
                            }
                        })
                    }, 1000);
                } catch (_) {
                    appStatusStore.completeApi()
                    setModalFlag('default')
                    setConfirmMessage('인증메일 전송에 실패했습니다\n관리자에게 문의하세요')
                    setModalOpen(true)
                }
            },
            confirm: onCloseModal,
            cancel: onCloseModal
        },
        verification: {
            click: async () => {
                setModalFlag('verification')
                appStatusStore.callApi()
                try {
                    await verifyCode({email, verificationCode})
                    appStatusStore.completeApi()
                    setTimer(0)
                    setConfirmMessage('인증에 성공했습니다\n해당 메일의 인증정보는 영구 유지됩니다')
                    setModalFlag('verification')
                    setModalOpen(true)
                    setVerified(true)
                } catch (_) {
                    appStatusStore.completeApi()
                    setModalFlag('default')
                    setConfirmMessage('인증에 실패했습니다\n관리자에게 문의해주세요')
                    setModalOpen(true)
                }
            },
            confirm: onCloseModal,
            cancel: onCloseModal
        },
        signup: {
            click: async (values) => {
                if (!verified) {
                    setModalFlag('default')
                    setConfirmMessage('인증 이후 회원가입을 진행해주세요')
                    setModalOpen(true)
                    return
                }
                const birthDate: string = dayjs(values.birthDate).format("YYYY-MM-DD");
                appStatusStore.callApi()
                try {
                    await signup({...values, birthDate})
                    appStatusStore.completeApi()
                    setModalFlag('signup')
                    setConfirmMessage('회원가입이 완료되었습니다\n로그인 페이지로 이동합니다')
                    setModalOpen(true)
                } catch (_) {
                    appStatusStore.completeApi()
                    setModalFlag('default')
                    setConfirmMessage('회원가입에 실패했습니다\n관리자에게 문의해주세요')
                    setModalOpen(true)
                }
            },
            confirm: () => {
                navigateToLoginOnCloseModal()
            },
            cancel: onCloseModal
        }
    }

    const renderModal = () => {
        switch (modalFlag) {
            case 'emailSend':
                return <CommonConfirmModal message={confirmMessage} onClickConfirm={buttonSettings.emailSend.confirm}/>
            case 'verification':
                return <CommonConfirmModal message={confirmMessage} onClickConfirm={buttonSettings.verification.confirm} />
            case 'signup':
                return <CommonConfirmModal message={confirmMessage} onClickConfirm={buttonSettings.signup.confirm} />
            case 'default':
                return <CommonConfirmModal message={confirmMessage} onClickConfirm={onCloseModal} />
        }
    }
    return (
        <ContentBox
            title={'회원가입'}
            flexDirection={'column'}
            modalOpen={modalOpen}
            modal={renderModal()}
            onCloseModal={onCloseModal}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={buttonSettings.signup.click}
            >
                <Form.Item
                    label="이름"
                    name="name"
                    rules={[{required: true, message: "이름을 입력해주세요"}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="이메일"
                    name="email"
                    rules={[{required: true, message: "이메일을 입력해주세요"}]}
                >
                    <Flex gap='small'>
                        <Input disabled={verified || timer > 0}/>
                        <Button disabled={timer > 0 || !email || verified} type='primary'
                                onClick={buttonSettings.emailSend.click}>{timer > 0 ? timer : '인증번호 발송'}</Button>
                    </Flex>
                </Form.Item>
                <Form.Item
                    label="인증번호"
                    name="verificationCode"
                >
                    <Flex gap='small'>
                        <Input/>
                        <Button disabled={timer == 0} type='primary'
                                onClick={buttonSettings.verification.click}>인증하기</Button>
                    </Flex>
                </Form.Item>
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
                <Form.Item
                    label="연락처"
                    name="phone"
                    rules={[{required: true, message: "연락처를 입력해주세요"}]}
                >
                    <Input placeholder={'000-0000-0000'}/>
                </Form.Item>
                <Form.Item
                    label="생년월일"
                    name="birthDate"
                    rules={[{required: true, message: "생년월일을 입력해주세요"}]}
                >
                    <DatePicker format="YYYY-MM-DD" style={{width: '100%'}}/>
                </Form.Item>
                <Form.Item>
                    <Flex gap='small'>
                        <Button type="default" onClick={() => navigate('/login')}>
                            취소
                        </Button>
                        <Button type="primary" htmlType="submit">
                            회원가입
                        </Button>
                    </Flex>
                </Form.Item>
            </Form>
        </ContentBox>
    )
}

const SignupPage = () => {
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
                    width: '100%', alignItems: 'center', display: 'flex', padding: '40px',
                    height: '100%',
                }}>
                    <SignupForm/>
                </div>
            </MultiDisplay>
        </AppLayout>
    )
}

export default SignupPage