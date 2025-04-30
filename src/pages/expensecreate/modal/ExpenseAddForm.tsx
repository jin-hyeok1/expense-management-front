import {Button, DatePicker, Flex, Form, FormInstance, Input, InputNumber, Select, Upload} from "antd";
import {useExpenseAddForm} from "../../../hooks/useExpenseAddForm.ts";
import {InboxOutlined} from '@ant-design/icons';

interface ExpenseAddFormProps {
    onFinish: (values: any) => Promise<void>
    onCancel: () => void,
    form: FormInstance
}

export const ExpenseAddForm: React.FC<ExpenseAddFormProps> = ({onFinish, onCancel, form}) => {
    const {subjects} = useExpenseAddForm()
    const widthFullStyle = {width: '100%'};
    return (
        <Form
            form={form}
            onFinish={values => onFinish({...values})}
            layout="vertical">
            <Form.Item
                label="지출월일"
                name="expenseDate"
                rules={[{required: true, message: "지출월일을 입력해주세요"}]}>
                <DatePicker format="YYYY-MM-DD" style={widthFullStyle}/>
            </Form.Item>
            <Form.Item
                label="계정과목"
                name="subject"
                rules={[{required: true, message: "계정과목을 선택해주세요"}]}>
                <Select placeholder="계정과목 선택" style={widthFullStyle}>
                    {subjects?.map((group, idx) => (
                        <Select.Option key={idx} value={group.name}>
                            {group.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="사용목적" name="content" rules={[{required: true, message: "사용목적을 입력해주세요"}]}>
                <Input.TextArea placeholder="사용목적" style={widthFullStyle}/>
            </Form.Item>
            <Form.Item label="사용금액" name="amount" rules={[{required: true, message: "사용 금액을 입력해주세요"}]}>
                <InputNumber
                    style={widthFullStyle}
                    placeholder="사용금액"
                    formatter={(value) => value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}
                    parser={(value) => value ? value.replace(/,/g, '') : ''}/>
            </Form.Item>
            <Form.Item label="비고(참석자/승인자)" name="note">
                <Input.TextArea placeholder="비고(참석자/승인자)" style={widthFullStyle} />
            </Form.Item>
            <Form.Item
                label="이미지 첨부"
                name="image"
                valuePropName="fileList"
                getValueFromEvent={e => Array.isArray(e) ? e : e?.fileList}
                rules={[{required: true, message: "영수증을 첨부해주세요"}]}
            >
                <Upload.Dragger
                    name="file"
                    beforeUpload={() => false}
                    accept=".jpg,.png"
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>
                    <p className="ant-upload-text">영수증을 이곳에 드래그하거나 클릭하여 업로드하세요.</p>
                    <p className="ant-upload-hint">JPG, PNG 파일을 업로드할 수 있습니다.</p>
                </Upload.Dragger>
            </Form.Item>
            <Form.Item>
                <Flex justify='space-between'>
                    <Button type="default" onClick={onCancel} style={{width: '100%'}}>
                        취소
                    </Button>
                    <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                        추가
                    </Button>
                </Flex>
            </Form.Item>
        </Form>
    )
}