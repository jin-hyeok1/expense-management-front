import styled from "@emotion/styled";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

type InputWay = {
  'typing': 0,
  'click': 1
}

interface InputValue {
  value: string | number,
  display: string | number
}

interface InputProps {
  value: InputValue,
  label: string,
  required?: boolean,
  inputWay: keyof InputWay,
  icon?: IconDefinition,
}

const Input: React.FC<InputProps> = ({value, inputWay, required, icon, label}) => {
  const [isFocusOn, setFocusOn] = useState<boolean>(false);
  return (
      <InputBoxStyle isFocusOn={isFocusOn}>
        <input type="text" value={value.display}
               onFocus={() => setFocusOn(true)}
               onBlur={() => setFocusOn(false)}/>
        {icon && <FontAwesomeIcon icon={icon  } />}
      </InputBoxStyle>
  )
}

interface InputBoxStyleProps {
  isFocusOn: boolean
}

const InputBoxStyle = styled.div<InputBoxStyleProps>`
  border: 1px solid ${({isFocusOn}) => isFocusOn ? '#1677D9' : '#B9B4B4'};
  border-radius: 5px;
  font-size: 20px;
  width: 100%;
`

export default Input