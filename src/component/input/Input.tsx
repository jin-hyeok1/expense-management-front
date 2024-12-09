import React from "react";
import {
  InputBoxStyle,
  InputContainerStyle,
  LabelContainer,
  LabelContent,
  LabelRequired,
  InputDefaultProps,
} from "./InputStyle.ts";


const toCommonInput = <P extends InputDefaultProps>(InputComponent: React.ComponentType<P>) => {
  return (props: P) => {
    return (
        <InputContainerStyle>
          <LabelContainer>
            <LabelContent>{props.label}</LabelContent>
            {props.required && <LabelRequired>*</LabelRequired>}
          </LabelContainer>
          <InputBoxStyle isFocusOn>
            <InputComponent {...props} />
          </InputBoxStyle>
        </InputContainerStyle>
    );
  }
}

export default toCommonInput