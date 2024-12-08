import styled from "@emotion/styled";

type InputWay = {
    'typing': 0,
    'click': 1
}

interface InputProps {
    value: string | number,
    inputWay?: keyof InputWay,
    icon?: React.ReactNode,
    label?: string,
    required?: boolean,
    onChange: (param: string | number) => void
}

const Input: React.FC<InputProps> = ({value, onChange, inputWay = 'typing', label, icon, required = false}) => {
    return (
        <InputContainerStyle>
            <LabelContainer>
                <LabelContent>
                    {label}
                </LabelContent>
                {required && <LabelRequired>
                *
            </LabelRequired>}
            </LabelContainer>
            <InputBoxStyle isFocusOn inputWay={inputWay}>
                <InputContent type='text' value={value} onChange={(e) => onChange(e.target.value)}/>
                {icon}
            </InputBoxStyle>
        </InputContainerStyle>
    )
}

interface InputBoxStyleProps {
    isFocusOn: boolean,
    inputWay: keyof InputWay,
}

const InputBoxStyle = styled.div<InputBoxStyleProps>`
    border: 1px solid ${({isFocusOn}) => isFocusOn ? '#1677D9' : '#B9B4B4'};
    cursor: ${({inputWay}) => inputWay === 'click' ? 'pointer' : 'default'};
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 8px;
`

const InputContainerStyle = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: column;
`

const LabelContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 24px;
    margin-left: 8px;
    margin-right: 8px;
    margin-bottom: 1px;
`

const LabelContent = styled.span`
    height: 24px;
    font-size: 20px
`

const LabelRequired = styled.span`
    height: 24px;
    font-size: 20px;
    color: red;
`

const InputContent = styled.input`
    width: calc(100% - 32px);
    height: 24px;
    font-size: 20px;
    outline: none;
    border: none;
`

export default Input