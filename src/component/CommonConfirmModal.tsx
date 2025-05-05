import {Button, Form} from "antd";

interface CommonConfirmModalProps {
    message: string,
    onClickConfirm: () => void,
}

export const CommonConfirmModal: React.FC<CommonConfirmModalProps> = ({onClickConfirm, message}) => {
    return (
        <Form onFinish={onClickConfirm}
              layout={'vertical'}>
            <Form.Item>
                <Form.Item>
                    {message}
                </Form.Item>
                <Button htmlType={'submit'} type={'primary'} style={{width: '100%'}}>확인</Button>
            </Form.Item>
        </Form>
    )
}