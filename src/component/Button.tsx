import styled from "@emotion/styled";

const Button = ({children, callback, kind}: {
  children: React.ReactNode,
  callback: () => void | Promise<void>,
  kind: keyof typeof backgroundColor
}) => {
  const onClick = async () => {
    await callback()
  }

  return (
      <ButtonStyle color={kind} onClick={onClick}>
        {children}
      </ButtonStyle>
  )
}

const backgroundColor = {
  active: '#1677D9',
  nonActive: '#B9B4B4',
  default: '#FFFFFF'
} as const

const ButtonStyle = styled.div<{ color: keyof typeof backgroundColor }>`
  background-color: ${({color}) => backgroundColor[color]};
  color: ${({color}) => color === 'default' ? '#000000' : '#ffffff'}
  border-radius: 10px;
  width: 135px;
  height: 40px;
  border: 1px solid #B9B4B4;
`
export default Button
