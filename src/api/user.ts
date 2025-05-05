import {LoginRequest, MeUpdateRequest, PasswordUpdateRequest, SignupRequest, User, VerifyCodeRequest} from "../type.ts";
import {AxiosResponse} from "axios";
import api from "./config.ts";

export const login = async ({email, password}: LoginRequest) => {
    return await api.post('/login', null, {params: {email, password}})
}

export const signup = async (signupRequest: SignupRequest) => {
    await api.post('/user', signupRequest)
}

export const sendVerificationCodeMail = async (email: string) => {
    await api.post('/send-verification-code', {email})
}

export const verifyCode = async (request: VerifyCodeRequest) => {
    await api.post('/verify-code', request)
}

export const getMe = async (): Promise<AxiosResponse<User>> => {
    return await api.get('/v1/me')
}

export const updateMe = async (request: MeUpdateRequest) => {
    await api.put('/v1/me', request)
}

export const updatePassword = async (request: PasswordUpdateRequest) => {
    await api.patch('/v1/update-password', request)
}

export const logout = async () => {
    return await api.post('/logout')
}