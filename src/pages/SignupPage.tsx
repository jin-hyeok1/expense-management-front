import AppLayout from "../component/AppLayout.tsx";
import ContentBox from "../component/ContentBox.tsx";
import MultiDisplay from "../component/MultiDisplay.tsx";
import InputString from "../component/input/InputString.tsx";
import {useState} from "react";
import {ButtonContainer} from "../component/button/ButtonContainer.tsx";
import Button from "../component/button/Button.tsx";
import {useNavigate} from "react-router-dom";
import InputStringHidden from "../component/input/InputStringHidden.tsx";
import InputStringTimer from "../component/input/InputStringTimer.tsx";

const SignupForm = () => {
  const {
    name, setName,
    email, setEmail,
    authNumber, setAuthNumber,
    password, setPassword,
    passwordCheck, setPasswordCheck,
  } = useSignupForm();
  const [timer, setTimer] = useState<number>(0);
  const navigate = useNavigate();

  const sendAuthMail = async () => {
    setTimer(180);
    const timerInterval = setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(timerInterval)
          return prev
        }
      })
    }, 1000);
  }
  return (
      <ContentBox title={'회원가입'} flexDirection={'column'}>
        <InputString required label={'이름'} value={name} onChange={setName}/>
        <div style={{display: "flex", flexDirection: 'row'}}>
          <InputString required label={'이메일'} value={email} onChange={setEmail}/>
          <Button
              callback={sendAuthMail} kind={'active'}
              style={{position: 'relative', top: '25px'}}>인증번호 발송</Button>
        </div>
        <div style={{display: "flex", flexDirection: 'row'}}>
          <InputStringTimer
              required label={'인증번호'}
              value={authNumber} onChange={setAuthNumber}
              time={timer}/>
          <Button
              callback={() => console.log('발송')} kind={'active'}
              style={{position: 'relative', top: '25px'}}>인증번호 확인</Button>
        </div>
        <InputStringHidden required label={'비밀번호'} value={password} onChange={setPassword}/>
        <InputStringHidden required label={'비밀번호 확인'} value={passwordCheck}
                           onChange={setPasswordCheck}/>
        <ButtonContainer>
          <Button callback={() => navigate('/')} kind={'active'}>뒤로가기</Button>
          <Button callback={() => console.log('회원가입')} kind={'active'}>회원가입</Button>
        </ButtonContainer>
      </ContentBox>
  )
}

const useSignupForm = () => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [authNumber, setAuthNumber] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordCheck, setPasswordCheck] = useState<string>();
  return {
    name, setName,
    email, setEmail,
    authNumber, setAuthNumber,
    password, setPassword,
    passwordCheck, setPasswordCheck,
  }
}

const SignupPage = () => {
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
            width: '100%', alignItems: 'center', display: 'flex', padding: '40px',
            height: '100%',
          }}>
            <SignupForm/>
          </div>
        </MultiDisplay>
      </AppLayout>
  )
}

export default SignupPage