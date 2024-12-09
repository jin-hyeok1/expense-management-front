import {DefaultInput, InputDefaultProps} from "./InputStyle.ts";
import toCommonInput from "./Input.tsx";
import styled from "@emotion/styled";

interface InputStringTimerProps extends InputDefaultProps {
  onChange: (value: string) => void,
  value?: string
  time?: number,
}

const InputStringBuilder: React.FC<InputStringTimerProps> = ({value, onChange, time}) => {
  const timeFormat = (seconds: number | undefined) => {
    if (!seconds) {
      return '';
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  }
  return (
      <>
        <DefaultInput value={value} onChange={e => onChange(e.target.value)}/>
        <Timer>
          {timeFormat(time)}
        </Timer>
      </>
  )
}

const Timer = styled.div`
  height: 24px;
  font-size: 20px;
  color: red;
  position: relative;
  right: 8px;
`

const InputStringTimer = toCommonInput(InputStringBuilder)

export default InputStringTimer;