import {DefaultFrame} from "../../component/DefaultFrame.tsx";
import ContentBox from "../../component/ContentBox.tsx";
import {useEffect, useState} from "react";
import {addSubject, getSubjects} from "../../api.ts";
import {getPageable, Pageable, Subject} from "../../type.ts";
import DataGrid from "../../component/DataGrid.tsx";
import {Button} from "antd";
import {SubjectAddForm} from "./modal/SubjectAddForm.tsx";
import dayjs from "dayjs";

const SubjectManagePage = () => {

    const [data, setData] = useState<Subject[]>([])
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [selected, setSelected] = useState<Subject>()
    const [pageable, setPageable] = useState<Pageable>()

    const initData = async () => {
        const response = await getSubjects(pageable?.currentPage ?? 1, 8)
        setData(response.content)
        setPageable(getPageable(response))
        setSelected(undefined)
    }
    const onChangePage = async (page: number, pageSize: number) => {
        const response = await getSubjects(page, pageSize);
        setData(response.content);
        setPageable(getPageable(response));
    }
    const onSelect = (value: any, _: number | undefined) => {
        setSelected(value)
    }
    const buttons = [
        <Button type={'primary'} onClick={() => setModalOpen(true)}>추가</Button>,
        <Button disabled={!selected} onClick={() => console.log('삭제 클릭')}>삭제</Button>,
    ]
    const onSubjectAdd = async (values: any) => {
        await addSubject(values)
        await initData()
        onClickModalClose()
    }
    const onClickModalClose = () => {
        setModalOpen(false)
    }
    useEffect(() => {
        initData()
    }, []);
    return (
        <DefaultFrame>
            <ContentBox
                title={'계정값 관리'}
                modalOpen={modalOpen}
                modal={<SubjectAddForm
                    onFinish={onSubjectAdd}
                    onCancel={onClickModalClose}
                />}
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
                    buttons={buttons}
                    {...pageable}
                    onChangePage={onChangePage}
                    onSelect={onSelect}
                />
            </ContentBox>
        </DefaultFrame>
    )
}

export default SubjectManagePage