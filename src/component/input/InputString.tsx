import {DefaultInput, InputDefaultProps} from "./InputStyle.ts";
import toCommonInput from "./Input.tsx";

interface InputStringProps extends InputDefaultProps {
  onChange: (value: string) => void,
  value?: string,
}

const InputStringBuilder: React.FC<InputStringProps> = ({value, onChange}) => {

  return (
      <DefaultInput value={value} onChange={e => onChange(e.target.value)}/>
  )
}

const InputString = toCommonInput(InputStringBuilder)

export default InputString;