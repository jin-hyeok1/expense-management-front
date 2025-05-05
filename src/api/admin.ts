import {ExpenseRequest, PageResponse, PasswordUpdateByAdminRequest, User, UserUpdateRequest} from "../type.ts";
import api from "./config.ts";
import {AxiosResponse} from "axios";

export const getAllExpense = async (pageNum: number, pageSize: number): Promise<PageResponse<ExpenseRequest>> => {
    const {data} = await api.get('/admin/expenses', {params: {pageNum: pageNum - 1, pageSize}})
    return data
}

export const reviewExpenseRequest = async (id: string) => {
    await api.patch(`/admin/expense/review/${id}`)
}

export const approveExpenseRequest = async (id: string) => {
    await api.patch(`/admin/expense/approve/${id}`)
}

export const rejectExpenseRequest = async (id: string) => {
    await api.patch(`/admin/expense/reject/${id}`)
}

export const cancelApproveOfExpenseRequest = async (id: string) => {
    await api.patch(`/admin/expense/cancel-approve/${id}`)
}

export const deleteExpenseRequestByAdmin = async (id: string) => {
    await api.delete('/admin/expense', {params: {id}})
}

export const getUsers = async (pageNum: number, pageSize: number): Promise<PageResponse<User>> => {
    const {data} = await api.get('/admin/users', {params: {pageNum: pageNum - 1, pageSize}})
    return data
}

export const deleteUser = async (email: string) => {
    await api.delete('/admin/user', {params: {email}})
}

export const updateUser = async (request: UserUpdateRequest) => {
    await api.put('/admin/user', request)
}

export const updatePasswordByAdmin = async (request: PasswordUpdateByAdminRequest) => {
    await api.patch('/admin/user/update-password', request)
}

export const downloadExpenseImages = async (id: string) => {
    downloadFileFromResponse(await api.get(`/admin/expense/images/${id}`, {
        responseType: 'blob'
    }))
}

const downloadFileFromResponse = (response: AxiosResponse<any, any>) => {
    const disposition = response.headers['content-disposition'];
    let fileName = 'invoice.zip';
    if (disposition) {
        const match = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (match && match[1]) {
            fileName = decodeURIComponent(match[1].replace(/['"]/g, ''));
        }
    }

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName); // ✅ 파일 이름 설정
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
}