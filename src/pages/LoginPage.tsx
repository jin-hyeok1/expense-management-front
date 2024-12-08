import AppLayout from "../component/AppLayout.tsx";
import MultiDisplay from "../component/MultiDisplay.tsx";
import Input from "../component/Input.tsx";
import {useState} from "react";

const LoginForm = () => {
    const [email, setEmail] = useState<string>('')
    const onChange = (value: string | number) => {
        if (typeof value === 'string') {
            console.log(value)
            setEmail(value)
        }
    }
    return (
        <div style={{margin: '75px auto'}}>
            <Input label={'email'} required value={email} onChange={onChange}/>
        </div>
    )
}

const LoginPage = () => {
    return (
        <AppLayout>
            <MultiDisplay direction={'row'}>
                <div
                    style={{width: '100%', alignItems: 'center', display: 'flex'}}>
                    <img src='/logo.png' alt={'logo'}/>
                </div>
                <div style={{width: '100%', alignItems: 'center', display: 'flex'}}>
                    <LoginForm/>
                </div>
            </MultiDisplay>
        </AppLayout>
    )
}

export default LoginPage