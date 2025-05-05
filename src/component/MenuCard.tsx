import styled from "@emotion/styled";
import {useNavigate} from "react-router-dom";

interface MenuCardProps {
  url?: string;
  onClick?: () => void;
  selected?: boolean;
  name: string
}

export type Menu = {
  name: string;
  url?: string;
  childMenu?: Menu[]
}

export const MenuCard: React.FC<MenuCardProps> = ({url, onClick, selected = false, name}) => {
  const navigate = useNavigate();
  const onMenuClick = () => {
    if (url) {
      navigate(url)
    }
    if (onClick) {
      onClick();
    }
  }

  return (
      <MenuCardStyle
          selected={selected}
          onClick={onMenuClick}
      >
        {name}
      </MenuCardStyle>
  )
}

const MenuCardStyle = styled.div<{ selected: boolean }>`
  align-items: center;
  justify-content: center;
  display: flex;
  user-select: none;
  background-color: ${(props) => props.selected ? '#B9B4B4' : '#FFFFFF'};
  color: black;
  width: 100%;
  height: 100px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${(props) => props.selected ? '0 8px 16px rgba(0, 0, 0, 0.3' : '0 4px 8px rgba(0, 0, 0, 0.2%)'};
  &:hover {
    background-color: #B9B4B4;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`