import {useUser} from "../../context/UserContext.tsx";
import {ButtonAction, User} from "../../type.ts";
import {useForm} from "antd/es/form/Form";
import {Button, DatePicker, Form, Input} from "antd";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {updateMe, updatePassword} from "../../api/user.ts";
import {DefaultFrame} from "../../component/DefaultFrame.tsx";
import ContentBox from "../../component/ContentBox.tsx";
import {PasswordUpdateModalByMe} from "./modal/PasswordUpdateModal.tsx";
import appStatusStore from "../../store/AppStatusStore.ts";
import {CommonConfirmModal} from "../../component/CommonConfirmModal.tsx";

type Modal = 'passwordUpdate'

export const MyInfoPage: React.FC = () => {
    const user: User = useUser()!;
    const [modalOpen, setModalOpen] = useState<boolean>()
    const [modalFlag, setModalFalg] = useState<Modal | 'default'>()
    const [confirmMessage, setConfirmMessage] = useState<string>('')
    const [form] = useForm()
    const onSubmit = async (values: any) => {
        appStatusStore.callApi()
        try {
            await updateMe({
                ...values,
                birthDate: dayjs(values.birthDate).format('YYYY-MM-DD')
            })
            appStatusStore.completeApi()
            setConfirmMessage('정보 변경이 완료되었습니다')
            openConfirmModal()
        } catch (e) {
            appStatusStore.completeApi()
            setConfirmMessage('정보 변경에 실패했습니다\n 관리자에게 문의하세요')
            openConfirmModal()
        }
    }

    const openConfirmModal = () => {
        setModalFalg('default')
        setModalOpen(true)
    }
    const onClickModalClose = () => {
        setModalOpen(false)
    }
    const buttonFunctions: Record<Modal, Record<ButtonAction, (value?: any) => void>> = {
        passwordUpdate: {
            click: () => {
                setModalFalg('passwordUpdate')
                setModalOpen(true)
            },
            confirm: async (values: any) => {
                onClickModalClose()
                appStatusStore.callApi()
                try {
                    await updatePassword({...values})
                    appStatusStore.completeApi()
                    setConfirmMessage('비밀번호 변경이 완료되었습니다')
                    openConfirmModal()
                } catch (_) {
                    appStatusStore.completeApi()
                    setConfirmMessage('비밀번호 변경이 실패했습니다\n관리자에게 문의하세요')
                    openConfirmModal()
                }
            },
            cancel: onClickModalClose
        }
    }

    const renderModal = () => {
        switch (modalFlag) {
            case 'passwordUpdate':
                return <PasswordUpdateModalByMe
                    onFinish={buttonFunctions.passwordUpdate.confirm}
                    onCancel={buttonFunctions.passwordUpdate.cancel}
                />
            case 'default':
                return <CommonConfirmModal message={confirmMessage} onClickConfirm={onClickModalClose} />
            default:
                return null
        }
    }

    useEffect(() => {
        const transformedUser = {
            ...user,
            birthDate: dayjs(user.birthDate), // string → dayjs 객체
        };
        form.setFieldsValue(transformedUser)
    }, [user, form]);
    return (
        <DefaultFrame>
            <ContentBox
                title={'회원정보 수정'}
                modalOpen={modalOpen}
                modal={renderModal()}
                onCloseModal={onClickModalClose}
            >
                <Form
                    form={form}
                    layout={'vertical'}
                    onFinish={onSubmit}
                >
                    <Form.Item
                        label={'이메일'}
                        name={'email'}
                        tooltip={'고유값이므로 수정할 수 없습니다'}
                    >
                        <Input disabled={true}/>
                    </Form.Item>
                    <Form.Item
                        label={'비밀번호'}
                    >
                        <Button onClick={buttonFunctions.passwordUpdate.click} type={'primary'} style={{width: '100%'}}>비밀번호
                            변경</Button>
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
                        <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                            확인
                        </Button>
                    </Form.Item>
                </Form>
            </ContentBox>
        </DefaultFrame>
    )
}