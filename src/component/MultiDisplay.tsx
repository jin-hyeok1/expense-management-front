import styled from "@emotion/styled";
import React from "react";

interface MultiDisplayProps {
  children: React.ReactNode,
  direction: string
}

const MultiDisplay: React.FC<MultiDisplayProps> = ({children, direction}) => {
  return (
      <Display direction={direction}>
        {children}
      </Display>
  )
}

export default MultiDisplay

const Display = styled.div<{ direction: string }>`
  display: flex;
  flex-direction: ${({direction}) => direction};
  height: 100%;
  width: 100%;
`;