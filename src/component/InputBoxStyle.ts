import styled from "@emotion/styled";

interface InputBoxStyleProps {
  isFocusOn: boolean
}

const InputBoxStyle = styled.input<InputBoxStyleProps>`
  border: 1px solid ${({isFocusOn}) => isFocusOn ? '#1677D9' : '#B9B4B4'};
  border-radius: 5px;
  font-size: 20px;
  width: 100%;
`

export default InputBoxStyle;