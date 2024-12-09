import axios from "axios";
import {Expense, LoginRequest, SearchFilter, SimpleMessage} from "./type.ts";

export const http = axios.create({
    withCredentials: true,
})

http.interceptors.response.use(response => response,
    error => {
        if (error.response?.status === 403) {
            window.location.href = '/login'
        }
        return Promise.reject(error);
    })

const signin = async (request: LoginRequest): Promise<SimpleMessage> => {
    const response = await http
        .post('/api/auth/signin', request);
    return response.data;
}

const createExpense = async (request: Expense): Promise<SimpleMessage> => {
    const response = await http
        .post('/api/expense', request)
    return response.data
}

const getExpensesForMe = async (request: SearchFilter): Promise<Expense[]> => {
    const response = await http
        .get('/api/expense', {params: request})
    return response.data
}

export const api = {
    signin,
    createExpense,
    getExpensesForMe,
}