import styled from "@emotion/styled";

export interface ContentBoxPros {
    children: React.ReactNode,
    modal?: React.ReactNode,
    modalOpen?: boolean,
    onCloseModal?: () => void,
    title?: string
    flexDirection?: string,
    popupWidth?: string | number
}

const ContentBox: React.FC<ContentBoxPros> =
    ({
         children,
         modal,
         modalOpen,
         title,
         onCloseModal,
         flexDirection = 'row',
         popupWidth
     }) => {
        const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
            // 팝업 영역 클릭 시 오버레이 클릭으로 처리되지 않도록 중단
            if (e.target === e.currentTarget && onCloseModal) {
                onCloseModal();
            }
        };

        return (
            <ContentBoxContainer>
                <Title>{title}</Title>
                <InnerContentBoxContainer direction={flexDirection}>
                    {children}
                </InnerContentBoxContainer>
                {modalOpen && modal && (
                    <PopupOverlay onClick={handleOverlayClick}>
                        <PopupBox style={{width: popupWidth}}>{modal}</PopupBox>
                    </PopupOverlay>
                )}
            </ContentBoxContainer>
        )
    }

const PopupOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
`;

const PopupBox = styled.div`
    background: white;
    max-height: 80vh;
    overflow-y: auto;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
`;

const InnerContentBoxContainer = styled.div<{ direction: string }>`
    width: 100%;
    height: calc(100% - 40px);
    display: flex;
    flex-direction: ${({direction}) => direction};
    overflow: auto;
`

const ContentBoxContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 30px
`

const Title = styled.div`
    height: 40px;
    margin-bottom: 10px;
    font-size: 32px;
    width: calc(100% - 2px);
    user-select: none;
`

export default ContentBox