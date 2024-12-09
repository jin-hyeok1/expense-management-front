import styled from "@emotion/styled";

export interface ContentBoxPros {
  children: React.ReactNode,
  title?: string
  padding?: string,
}

const ContentBox: React.FC<ContentBoxPros> = ({children, padding = '30px', title}) => {
  return (
      <ContentBoxContainer padding={padding}>
        <Title>{title}</Title>
        {children}
      </ContentBoxContainer>
  )
}

const ContentBoxContainer = styled.div<{padding:string}>`
  width: 100%;
  height: 100%;
  padding: ${({padding}) => padding};
`

const Title = styled.div`
  height: 39px;
  margin-bottom: 10px;
  font-size: 32px;
  width: 100%;
`

export default ContentBox