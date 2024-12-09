import {DefaultInput, InputDefaultProps} from "./InputStyle.ts";
import toCommonInput from "./Input.tsx";
import {faEye, faEyeSlash} from "@fortawesome/free-regular-svg-icons";
import FontIcon from "../button/FontIcon.tsx";
import {useState} from "react";

interface InputStringHiddenProps extends InputDefaultProps {
  onChange: (value: string) => void,
  value?: string,
}

const InputStringHiddenBuilder: React.FC<InputStringHiddenProps> =
    ({value, onChange,}) => {
      const [display, setDisplay] = useState<boolean>(false);
      return (
          <>
            <DefaultInput
                type={`${display ? 'text' : 'password'}`}
                value={value}
                onChange={e => onChange(e.target.value)}>
            </DefaultInput>
            <FontIcon icon={display ? faEyeSlash : faEye} onClick={() => setDisplay((prev) => !prev)}/>
          </>
      )
    }

const InputStringHidden = toCommonInput(InputStringHiddenBuilder)

export default InputStringHidden