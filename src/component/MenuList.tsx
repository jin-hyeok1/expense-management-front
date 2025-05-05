import {FirstMenuContainer, MenuContainer, SecondMenuContainer} from "./frame.main.css.ts";
import {Menu, MenuCard} from "./MenuCard.tsx";
import {useState} from "react";
import {useUser} from "../context/UserContext.tsx";

export const MenuList: React.FC = () => {
    const user = useUser();
    const menus: Menu[] = [
        {
            name: '경비',
            childMenu: [
                {name: '경비 등록 현황', url: '/expenses'},
                {name: '경비 등록', url: '/expense/new'}
            ]
        }, {
            name: '관리자',
            childMenu: [
                {name: '회원 관리', url: '/admin/members'},
                {name: '계정값 관리', url: '/admin/subjects'},
                {name: '경비 요청 관리', url: '/admin/expenses'}
            ]
        }, {
            name: '마이페이지',
            childMenu: [
                {name: '회원정보 수정', url: '/my-info'}
            ]
        }
    ]

    const [firstMenuIdx, setFirstMenuIdx] = useState<number>(0);
    const onClickFirstMenu = (idx: number) => {
        setFirstMenuIdx(idx);
    }
    return (
        <MenuContainer>
            <FirstMenuContainer>
                {menus.map((menu, idx) => {
                    if (menu.name === '관리자' && user?.role !== 'ADMIN') {
                        return null;
                    }

                    return (
                        <MenuCard
                            key={idx}
                            name={menu.name}
                            selected={idx === firstMenuIdx}
                            onClick={() => onClickFirstMenu(idx)}
                        />
                    );
                })}
            </FirstMenuContainer>
            <SecondMenuContainer>
                {menus[firstMenuIdx]?.childMenu?.map((menu, idx) => (
                    <MenuCard
                        key={idx}
                        name={menu.name} url={menu.url}
                    />
                ))}
            </SecondMenuContainer>
        </MenuContainer>
    )
}