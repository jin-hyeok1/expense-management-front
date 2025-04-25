import styled from "@emotion/styled";

export interface ContentBoxPros {
    children: React.ReactNode,
    popup?: React.ReactNode,
    popupOpen?: boolean,
    title?: string
    padding?: string,
    flexDirection?: string,
}

const ContentBox: React.FC<ContentBoxPros> = ({
                                                  children,
                                                  popup,
                                                  popupOpen,
                                                  padding = '30px',
                                                  title,
                                                  flexDirection = 'row'
                                              }) => {
    return (
        <ContentBoxContainer padding={padding}>
            <Title>{title}</Title>
            <InnerContentBoxContainer direction={flexDirection}>
                {children}
                {popupOpen && popup ? (<PopupBox>
                    {popup}
                </PopupBox>) : <></>}
            </InnerContentBoxContainer>
        </ContentBoxContainer>
    )
}

const PopupBox = styled.div`
    width: 45%;
    padding: 10px;
    height: 100%;
    border-radius: 10px;
    box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.4);
    border: 1px black solid;
    margin-left: 10px;
    overflow: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`

const InnerContentBoxContainer = styled.div<{ direction: string }>`
    width: 100%;
    height: calc(100% - 40px);
    display: flex;
    flex-direction: ${({direction}) => direction};
    overflow: auto;
`

const ContentBoxContainer = styled.div<{ padding: string }>`
    width: 100%;
    height: 100%;
    padding: ${({padding}) => padding};
`

const Title = styled.div`
    height: 40px;
    margin-bottom: 10px;
    font-size: 32px;
    width: calc(100% - 2px);
`

export default ContentBox