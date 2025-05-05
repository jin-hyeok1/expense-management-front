import React from "react";
import styled from "@emotion/styled";
import {observer} from "mobx-react";
import appStatusStore from "../store/AppStatusStore.ts";
import {LoadingSpinner} from "./LoadingSpinner.tsx";

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = observer(({children}) => {
  return (
      <App>
        {appStatusStore.isLoading && <LoadingSpinner/>}
        <AppFrame>
          {children}
        </AppFrame>
      </App>
  )
})

export default AppLayout

const App = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const AppFrame = styled.div`
  width: 1000px;
  height: 800px;
  box-sizing: content-box;
  border: 1px solid black;
  padding: 0;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  overflow: hidden;
`