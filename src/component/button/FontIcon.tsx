import {FontAwesomeIcon, FontAwesomeIconProps} from "@fortawesome/react-fontawesome";
import styled from "@emotion/styled";

interface FontIconProps extends FontAwesomeIconProps {
  onClick: () => void
}

const FontIcon: React.FC<FontIconProps> = ({icon, onClick, style}) => {
  return (
      <IconContainer onClick={onClick}>
        <FontAwesomeIcon icon={icon} style={style}/>
      </IconContainer>
  )
}

const IconContainer = styled.div<{display?: string}>`
  display: flex;
  cursor: pointer;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;

export default FontIcon