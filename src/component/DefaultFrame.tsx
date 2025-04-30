import AppLayout from "./AppLayout.tsx";
import {
    Header,
    MainContainer,
    MainFrame,
    MainFrameContainer,
    SideMenuContainer,
    SideTop,
    SideTopTitle
} from "./frame.main.css.ts";
import React, {useState} from "react";
import FontIcon from "./button/FontIcon.tsx";
import {faArrowRightFromBracket, faBars} from "@fortawesome/free-solid-svg-icons";
import {MenuList} from "./MenuList.tsx";
import {useNavigate} from "react-router-dom";
import {logout} from "../api.ts";

interface DefaultFrameProps {
    children: React.ReactNode,
}

export const DefaultFrame: React.FC<DefaultFrameProps> = ({children}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const navigate = useNavigate();
    const onClickLogout = async () => {
        const response = await logout();
        if (response.request.status === 200) {
            navigate('/login')
        }
    }
    return (
        <AppLayout>
            <MainContainer>
                <SideMenuContainer isOpen={isOpen}>
                    <SideTop>
                        <SideTopTitle>Menu</SideTopTitle>
                        <FontIcon onClick={() => setIsOpen(prev => !prev)} icon={faBars}/>
                    </SideTop>
                    <MenuList/>
                </SideMenuContainer>
                <MainFrameContainer>
                    <Header>
                        <FontIcon onClick={() => setIsOpen(prev => !prev)} icon={faBars}
                                  style={{display: isOpen ? 'none' : 'inline-block'}}/>
                        <FontIcon
                            onClick={onClickLogout}
                            icon={faArrowRightFromBracket}
                            style={{color: 'red'}}
                        />
                    </Header>
                    <MainFrame>
                        {children}
                    </MainFrame>
                </MainFrameContainer>
            </MainContainer>
        </AppLayout>
    )
}

