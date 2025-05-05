import {useCallback, useEffect, useState} from "react";
import {Pageable, User} from "../../type.ts";
import {Button} from "antd";
import {CommonModal} from "../../component/CommonModal.tsx";
import {DefaultFrame} from "../../component/DefaultFrame.tsx";
import ContentBox from "../../component/ContentBox.tsx";
import DataGrid from "../../component/DataGrid.tsx";
import dayjs from "dayjs";
import {UserUpdateModal} from "./modal/UserUpdateModal.tsx";
import {PasswordUpdateModal} from "./modal/PasswordUpdateModal.tsx";
import {getPageable} from "../../util.ts";
import {deleteUser, getUsers, updatePasswordByAdmin, updateUser} from "../../api/admin.ts";

type Modal = 'delete' | 'update' | 'passwordUpdate'

export const UserManagePage: React.FC = () => {
    const [data, setData] = useState<User[]>([])
    const [pageable, setPageable] = useState<Pageable>({currentPage: 1})
    const [selected, setSelected] = useState<User>()
    const [modalFlag, setModalFlag] = useState<Modal | 'default'>()
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const initData = useCallback(async () => {
        const response = await getUsers(pageable.currentPage, 8)
        setData(response.content)
        setPageable(getPageable(response))
        setSelected(undefined)
    }, [pageable.currentPage])
    const onChangePage = async (page: number) => {
        setPageable({...pageable, currentPage: page})
    }
    const onSelect = async (value: any, _: number | undefined) => {
        setSelected(value)
    }

    // button 설정
    const onClickDeleteButton = () => {
        setModalFlag('delete')
        setModalOpen(true)
    }
    const onClickUpdateButton = () => {
        setModalFlag('update')
        setModalOpen(true)
    }

    const onClickPasswordUpdateButton = () => {
        setModalFlag('passwordUpdate')
        setModalOpen(true)
    }

    const buttons = [
        <Button disabled={!selected || selected?.role === 'ADMIN'} type={'primary'}
                onClick={onClickUpdateButton}>수정</Button>,
        <Button disabled={!selected || selected?.role === 'ADMIN'} type={'primary'}
                onClick={onClickPasswordUpdateButton}>비밀번호 변경</Button>,
        <Button disabled={!selected || selected?.role === 'ADMIN'} type={'default'}
                onClick={onClickDeleteButton}>삭제</Button>,
    ]

    const onClickDeleteConfirmButton = async () => {
        await deleteUser(selected!.email)
        await initData()
        onClickModalClose()
    }
    const onClickUpdateConfirmButton = async (values: any) => {
        if (!selected) {
            alert('항목 선택이 필요합니다')
            return
        }
        await updateUser({
            ...values,
            email: selected.email,
            birthDate: dayjs(values.birthDate).format('YYYY-MM-DD')
        })
        await initData()
        onClickModalClose()
    }
    const onClickPasswordUpdateConfirmButton = async (values: any) => {
        if (!selected) return
        await updatePasswordByAdmin({...values, email: selected.email})
        await initData()
        onClickModalClose()
    }
    const onClickModalClose = () => {
        setModalOpen(false)
        setModalFlag(undefined)
    }

    const renderModal = () => {
        switch (modalFlag) {
            case 'delete':
                return <CommonModal
                    message={'회원을 삭제하시겠습니까?'}
                    onClickConfirm={onClickDeleteConfirmButton}
                    onClickCancel={onClickModalClose}
                />
            case 'update':
                return <UserUpdateModal
                    user={selected!}
                    onFinish={onClickUpdateConfirmButton}
                    onClose={onClickModalClose}/>
            case 'passwordUpdate':
                return <PasswordUpdateModal
                    onFinish={onClickPasswordUpdateConfirmButton}
                    onClose={onClickModalClose}/>
            default:
                return null
        }
    }

    useEffect(() => {
        initData()
    }, [initData]);
    return (
        <DefaultFrame>
            <ContentBox
                title={'회원정보 조회'}
                modalOpen={modalOpen}
                modal={renderModal()}
                onCloseModal={onClickModalClose}
            >
                <DataGrid
                    rowKey={'email'}
                    selected={selected}
                    data={data}
                    headers={[
                        {key: 'email', displayValue: '이메일'},
                        {key: 'name', displayValue: '이름'},
                        {key: 'role', displayValue: '권한'},
                        {key: 'phone', displayValue: '연락처'},
                        {
                            key: 'birthDate',
                            displayValue: '생년월일',
                            render: (value: string) => dayjs(value).format('YYYY년 MM월 DD일')
                        },
                        {
                            key: 'createdDate',
                            displayValue: '가입일시',
                            render: (value: string) => dayjs(value).format('YYYY년 MM월 DD일'),
                        },
                    ]}
                    buttons={buttons}
                    {...pageable}
                    onChangePage={onChangePage}
                    onSelect={onSelect}
                />
            </ContentBox>
        </DefaultFrame>
    )
}