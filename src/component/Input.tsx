import styled from "@emotion/styled";

type InputWay = {
  'typing': 0,
  'click': 1
}

interface InputValue {
  value: string | number,
  display: string | number
}

interface InputProps {
  value: InputValue,
  inputWay: keyof InputWay,
  icon: React.ReactNode,

}

const Input: React.FC<InputProps> = ({value, inputWay}) => {
  return (
      <InputBoxStyle isFocusOn>

      </InputBoxStyle>
  )
}

interface InputBoxStyleProps {
  isFocusOn: boolean
}

const InputBoxStyle = styled.div<InputBoxStyleProps>`
  border: 1px solid ${({isFocusOn}) => isFocusOn ? '#1677D9' : '#B9B4B4'};
  border-radius: 5px;
  font-size: 20px;
  width: 100%;
`

export default Input