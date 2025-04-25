import styled from "@emotion/styled";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`

export const MainFrameContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`
export const MainFrame = styled.div`
  padding: 0 65px;
  width: 100%;
  height: calc(100% - 50px);
`

export const Header = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 13px
`

export const SideMenuContainer = styled.div<{isOpen: boolean}>`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  width: 25%;
  flex-direction: column;
  border-right: 1px solid black;
`

export const SideTop = styled.div`
  height: 50px;
  padding: 13px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #D9D9D9;
`

export const SideTopTitle = styled.div`
  width: calc(100% - 40px);
  font-size: 20px;
  height: 24px;
`

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`

export const FirstMenuContainer = styled.div`
  align-items: center;
  justify-content: start;
  display: flex;
  flex: 0.4;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-right: 1px solid black;
`

export const SecondMenuContainer = styled.div`
  align-items: center;
  justify-content: start;
  display: flex;
  flex: 0.6;
  flex-direction: column;
  width: 100%;
  height: 100%;
`