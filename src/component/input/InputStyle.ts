import styled from "@emotion/styled";

interface InputBoxStyleProps {
  isFocusOn: boolean,
}
interface InputDefaultProps {
  required?: boolean,
  label: string,
  displayWarn?: boolean,
  warn?: string
}
const InputBoxStyle = styled.div<InputBoxStyleProps>`
  border: 1px solid ${({isFocusOn}) => isFocusOn ? '#1677D9' : '#B9B4B4'};
  border-radius: 5px;
  display: flex;
  height: 40px;
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
  margin-bottom: 2px;
`

const LabelContent = styled.span`
  height: 24px;
  font-size: 18px
`

const LabelRequired = styled.span`
  height: 24px;
  font-size: 20px;
  color: red;
`

const DefaultInput = styled.input`
  width: calc(100% - 32px);
  height: 24px;
  font-size: 20px;
  outline: none;
  border: none;
`

export {
  InputBoxStyle,
  InputContainerStyle,
  LabelContainer,
  LabelContent,
  LabelRequired,
  DefaultInput,
}
export type {InputDefaultProps};