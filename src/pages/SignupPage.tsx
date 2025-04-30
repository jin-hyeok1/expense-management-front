import AppLayout from "../component/AppLayout.tsx";
import ContentBox from "../component/ContentBox.tsx";
import MultiDisplay from "../component/MultiDisplay.tsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, DatePicker, Flex, Form, Input} from "antd";
import {useForm} from "antd/es/form/Form";
import dayjs from "dayjs";
import {sendVerificationCodeMail, signup, verifyCode} from "../api.ts";

const SignupForm = () => {
    const [timer, setTimer] = useState<number>(0);
    const [verified, setVerified] = useState<boolean>(false)
    const navigate = useNavigate();
    const [form] = useForm()
    const email: string = Form.useWatch('email', form)
    const verificationCode: string = Form.useWatch('verificationCode', form)
    const sendAuthMail = async () => {
        await sendVerificationCodeMail(email)
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
    }

    const onClickVerificationButton = async () => {
        try {
            await verifyCode({email, verificationCode})
            setVerified(true)
        } catch(e) {
            alert(e)
        }
    }

    const onClickSignup = async (values: any) => {
        const birthDate: string = dayjs(values.birthDate).format("YYYY-MM-DD");
        await signup({...values, birthDate})
        alert('회원가입이 완료되었습니다')
        navigate('/login')
    }
    return (
        <ContentBox title={'회원가입'} flexDirection={'column'}>
            <Form
                form={form}
                layout="vertical"
                onFinish={onClickSignup}
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
                        <Input disabled={verified || timer > 0} />
                        <Button disabled={timer > 0 || !email || verified} type='primary'
                                onClick={sendAuthMail}>{timer > 0 ? timer : '인증번호 발송'}</Button>
                    </Flex>
                </Form.Item>
                <Form.Item
                    label="인증번호"
                    name="verificationCode"
                >
                    <Flex gap='small'>
                        <Input/>
                        <Button disabled={timer == 0} type='primary'
                                onClick={onClickVerificationButton}>인증하기</Button>
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
                    <Input/>
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