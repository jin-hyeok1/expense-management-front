import styled from "@emotion/styled";
import {CSSProperties} from "react";

export interface ButtonProps {
  children: string,
  callback: () => void | Promise<void>,
  kind: keyof typeof backgroundColor
  style?: CSSProperties
}

const Button: React.FC<ButtonProps> = ({children, callback, kind, style}) => {
  const onClick = async () => {
    if (kind === 'nonActive') {
      return
    }
    await callback()
  }

  return (
      <ButtonStyle kind={kind} onClick={onClick} style={style}>
        {children}
      </ButtonStyle>
  )
}

const backgroundColor = {
  active: '#1677D9',
  nonActive: '#B9B4B4',
  default: '#FFFFFF'
} as const

const ButtonStyle = styled.div<{ kind: keyof typeof backgroundColor }>`
  background-color: ${({kind}) => backgroundColor[kind]};
  color: ${({color}) => color === 'default' ? '#000000' : '#ffffff'};
  border-radius: 10px;
  font-size: 20px;
  align-content: center;
  text-align: center;
  width: 140px;
  min-width: 140px;
  height: 40px;
  border: 1px solid #B9B4B4;
  cursor: ${({kind}) => kind ==='nonActive' ? 'default' : 'pointer'};
`
export default Button
