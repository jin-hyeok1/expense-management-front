import {DefaultFrame} from "../../component/DefaultFrame.tsx";
import ContentBox from "../../component/ContentBox.tsx";
import {useCallback, useEffect, useState} from "react";
import {Pageable, Subject} from "../../type.ts";
import DataGrid from "../../component/DataGrid.tsx";
import {Button} from "antd";
import {SubjectAddForm} from "./modal/SubjectAddForm.tsx";
import dayjs from "dayjs";
import {CommonModal} from "../../component/CommonModal.tsx";
import {getPageable} from "../../util.ts";
import {addSubject, deleteSubject, getSubjects} from "../../api/subject.ts";
import appStatusStore from "../../store/AppStatusStore.ts";

type Modal = '추가' | '삭제'

const SubjectManagePage = () => {

    const [data, setData] = useState<Subject[]>([])
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [selected, setSelected] = useState<Subject>()
    const [pageable, setPageable] = useState<Pageable>({currentPage: 1})
    const [modalFlag, setModalFlag] = useState<Modal>()

    const initData = useCallback(async () => {
        const response = await getSubjects(pageable.currentPage, 5)
        setData(response.content)
        setPageable(getPageable(response))
        setSelected(undefined)
    }, [pageable.currentPage])
    const onSelect = (value: any, _: number | undefined) => {
        setSelected(value)
    }
    const onChangePage = (page: number) => {
        setPageable({...pageable, currentPage: page})
    }

    //button 설정
    const onClickAddButton = () => {
        setModalFlag('추가')
        setModalOpen(true)
    }
    const onClickDeleteButton = () => {
        setModalFlag('삭제')
        setModalOpen(true)
    }
    const buttons = [
        <Button type={'primary'} onClick={onClickAddButton}>추가</Button>,
        <Button disabled={!selected} onClick={onClickDeleteButton}>삭제</Button>,
    ]

    //modal 설정
    const onClickSubjectAddConfirm = async (values: any) => {
        appStatusStore.callApi()
        onClickModalClose()
        await addSubject(values)
        await initData()
        appStatusStore.completeApi()
    }
    const onClickSubjectDeleteConfirm = async () => {
        if (selected) {
            await deleteSubject(selected.name)
            await initData()
        }
        onClickModalClose()
    }
    const onClickModalClose = () => {
        setModalOpen(false)
        setModalFlag(undefined)
    }

    const renderModal = () => {
        switch (modalFlag) {
            case '추가':
                return <SubjectAddForm
                    onFinish={onClickSubjectAddConfirm}
                    onCancel={onClickModalClose}
                />
            case '삭제':
                return <CommonModal
                    message={'계정과목을 삭제하시겠습니까?'}
                    onClickConfirm={onClickSubjectDeleteConfirm}
                    onClickCancel={onClickModalClose}
                />
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
                title={'계정값 관리'}
                modalOpen={modalOpen}
                modal={renderModal()}
                onCloseModal={onClickModalClose}
            >
                <DataGrid
                    rowKey={'name'}
                    data={data}
                    headers={[
                        {key: 'name', displayValue: '이름'},
                        {
                            key: 'createdDate',
                            displayValue: '생성일시',
                            render: (value: string) => dayjs(value).format("YYYY년 MM월 DD일 HH시 mm분"),
                        },
                        {
                            key: 'modifiedDate',
                            displayValue: '수정일시',
                            render: (value: string) => dayjs(value).format("YYYY년 MM월 DD일 HH시 mm분"),
                        },
                    ]}
                    onChangePage={onChangePage}
                    buttons={buttons}
                    {...pageable}
                    onSelect={onSelect}
                    selected={selected}
                />
            </ContentBox>
        </DefaultFrame>
    )
}

export default SubjectManagePage