import {Button, Flex, Form} from "antd";

interface CommonModalProps {
    message: string,
    onClickConfirm: () => void,
    onClickCancel: () => void,
}

export const CommonModal: React.FC<CommonModalProps> = ({message, onClickConfirm, onClickCancel}) => {
    return (
        <Form onFinish={onClickConfirm}
              layout={'vertical'}>
            <Form.Item>
                <Form.Item>
                    {message}
                </Form.Item>
                <Flex gap={'small'}>
                    <Button onClick={onClickCancel} style={{width: '100%'}}>취소</Button>
                    <Button htmlType={'submit'} type={'primary'} style={{width: '100%'}}>확인</Button>
                </Flex>
            </Form.Item>
        </Form>
    )
}