import {keyframes} from "@emotion/react";
import styled from "@emotion/styled";

export const LoadingSpinner: React.FC = () => {
  return (
      <Overlay>
        <Box>
          <Spinner />
        </Box>
      </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.4); // 반투명 회색
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Box = styled.div`
  width: 120px;
  height: 120px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #999;
  border-top: 4px solid #1890ff; // 메인 컬러 강조
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;