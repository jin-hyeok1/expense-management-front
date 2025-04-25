import AppLayout from "../component/AppLayout.tsx";
import MultiDisplay from "../component/MultiDisplay.tsx";
import {useState} from "react";
import ContentBox from "../component/ContentBox.tsx";
import Button from "../component/button/Button.tsx";
import InputString from "../component/input/InputString.tsx";
import InputStringHidden from "../component/input/InputStringHidden.tsx";
import {ButtonContainer} from "../component/button/ButtonContainer.tsx";
import {useNavigate} from "react-router-dom";
import {login} from "../util/api.ts";

const LoginForm = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const onChangeEmail = (value: string) => {
    setEmail(value)
  }
  const onChangePassword = (value: string) => {
    setPassword(value)
  }

  const onClickLogin = async () => {
      const response = await login({email, password});
      console.log(response)
      if (response.request?.status === 200) {
          navigate('/expenses')
      }
  }
  return (
      <ContentBox padding='30px' title={'로그인'} flexDirection={'column'}>

        <InputString label={'email'} required value={email} onChange={onChangeEmail}/>
        <InputStringHidden label={'password'} required value={password}
                           onChange={onChangePassword}/>
        <ButtonContainer>
          <Button
              callback={onClickLogin}
              kind={'active'}>
            로그인
          </Button>
          <Button callback={() => navigate('/signup')} kind={'active'}>회원가입</Button>
        </ButtonContainer>
      </ContentBox>
  )
}

const LoginPage = () => {
  return (
      <AppLayout>
        <MultiDisplay direction={'row'}>
          <div
              style={{
                width: '100%',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                height: '100%',
                boxShadow: '4px 0 rgba(0, 0, 0, 0.1)',
                borderRadius: '10px'
              }}>
            <img src='/logo.png' alt={'logo'}
                 style={{display: 'block', width: '350px', height: 'auto'}}/>
          </div>
          <div style={{
            width: '100%', alignItems: 'center', display: 'flex', padding: '75px',
            height: '100%',
          }}>
            <LoginForm/>
          </div>
        </MultiDisplay>
      </AppLayout>
  )
}

export default LoginPage