import styled from "@emotion/styled";

export const ButtonContainer: React.FC<{ children: React.ReactNode }> = ({children}) => {
  return (
      <ButtonContainerStyle>
        {children}
      </ButtonContainerStyle>
  )
}

const ButtonContainerStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  width: 100%;
`
