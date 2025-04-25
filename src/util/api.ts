import axios, {AxiosResponse} from 'axios'
import {ExpenseItem} from "../type.ts";
import dayjs from "dayjs";

interface GetMeResponse {
    name: string,
    role: string,
    email: string,
}

export const getMe = async (): Promise<AxiosResponse<GetMeResponse>> => {
    return await axios.get('/api/v1/me')
}


interface LoginRequest {
    email: string,
    password: string
}

export const login = async ({email, password}: LoginRequest) => {
    return await axios.post('/api/login', null, {params: {email, password}})
}

export const logout = async () => {
    return await axios.post('/api/logout')
}

interface ExpenseRequestCreateRequest {
    expenseItems: ExpenseItem[],
    requestDate: string,
}

export const createExpenseRequest = async ({expenseItems, requestDate}: ExpenseRequestCreateRequest) => {
    const formData = new FormData();

    const expenseRequest = {
        requestDate,
        expenseInfoList: expenseItems.map((item: any) => ({
            expenseDate: dayjs(item.expenseDate).format("YYYY-MM-DD"),
            subject: item.subject,
            purpose: item.purpose,
            amount: Number(item.amount),
            note: item.note || null,
        }))
    };

    formData.append(
        "data",
        new Blob([JSON.stringify(expenseRequest)], {type: "application/json"})
    );

    expenseItems.forEach((item: any) => {
        if (item.image && Array.isArray(item.image)) {
            item.image.forEach((fileObj: any) => {
                const file = fileObj.originFileObj;
                if (file instanceof File) {
                    formData.append("files", file);
                }
            });
        }
    });

    return axios.put('/api/v1/expense/submit', formData);
}

export const getExpenseRequestsForMe = async (pageNum: number = 0) => {
    const {data} = await axios.get('api/v1/expense', {params: {pageNum}})
    return data
}

export const downloadInvoice = async (invoiceId: string) => {
    try {
        const response = await axios.get(`/api/v1/invoice/${invoiceId}`, {
            responseType: 'blob',
        });

        // 🔍 파일명은 Content-Disposition 헤더에서 추출
        const disposition = response.headers['content-disposition'];
        let fileName = 'invoice.xlsx';
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
    } catch (error) {
        console.error('다운로드 실패:', error);
    }
};