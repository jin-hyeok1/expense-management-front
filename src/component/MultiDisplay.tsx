import styled from "@emotion/styled";
import React from "react";

interface MultiDisplayProps {
  children: React.ReactNode,
  direction: string
}

const MultiDisplay: React.FC<MultiDisplayProps> = ({children, direction}) => {
  const modifiedChildren = React.Children.map(children, (child) => {
    return (
        <ChildContainer>
          {React.isValidElement(child) ? React.cloneElement(child) : child}
        </ChildContainer>
    )
  })
  return (
      <Display direction={direction}>
        {modifiedChildren}
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

const ChildContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`