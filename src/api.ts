import axios, {AxiosResponse} from 'axios'
import {
    Expense,
    ExpenseRequest,
    ExpenseRequestDetailResponse,
    PageResponse,
    Subject,
    SubjectCreateRequest
} from "./type.ts";
import dayjs from "dayjs";

interface GetMeResponse {
    name: string,
    role: string,
    email: string,
}

export const getMe = async (): Promise<AxiosResponse<GetMeResponse>> => {
    return await axios.get('/api/v1/me')
}

interface SignupRequest {
    email: string,
    name: string,
    password: string,
    phone: string,
    birthDate: string,
}

export const signup = async (signupRequest: SignupRequest) => {
    await axios.post('/api/user', signupRequest)
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

export const sendVerificationCodeMail = async (email: string) => {
    await axios.post('/api/send-verification-code', {email})
}

interface VerifyCodeRequest {
    email: string,
    verificationCode: string,
}

export const verifyCode = async (request: VerifyCodeRequest) => {
    await axios.post('/api/verify-code', request)
}

interface ExpenseRequestCreateRequest {
    id?: string,
    expenseList: Expense[],
    requestDate: string,
}

export const createExpenseRequest = async ({id, expenseList, requestDate}: ExpenseRequestCreateRequest) => {
    const formData = new FormData();

    const expenseRequest = {
        id,
        requestDate,
        expenseInfoList: expenseList.map((item: Expense) => ({
            expenseDate: dayjs(item.expenseDate).format("YYYY-MM-DD"),
            subject: item.subject,
            content: item.content,
            amount: Number(item.amount),
            note: item.note || null,
        }))
    };

    formData.append(
        "data",
        new Blob([JSON.stringify(expenseRequest)], {type: "application/json"})
    );

    expenseList.forEach((item: any) => {
        console.log(item)
        const flag = item.image && Array.isArray(item.image);
        console.log('flag: ', flag)
        if (flag) {
            item.image.forEach((fileObj: any) => {
                if (fileObj instanceof File) {
                    formData.append("files", fileObj);
                    return
                }
                const file = fileObj.originFileObj;
                if (file instanceof File) {
                    formData.append("files", file);
                }
            });
        }
    });
    for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
    }

    return axios.post('/api/v1/expense', formData);
}

export const submitExpenseRequest = async (id: string) => {
    await axios.patch(`api/v1/expense/submit/${id}`)
}

export const submitCancelExpenseRequest = async (id: string) => {
    await axios.patch(`api/v1/expense/submit-cancel/${id}`)
}

export const getExpenseRequestsForMe = async (pageNum: number, pageSize: number = 5): Promise<PageResponse<ExpenseRequest>> => {
    const {data} = await axios.get('api/v1/expense', {params: {pageNum: pageNum - 1, pageSize}})
    return data
}

export const downloadInvoice = async (invoiceId: string) => {
    try {
        const response = await axios.get(`/api/v1/expense/invoice/${invoiceId}`, {
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

export const getSubjects = async (pageNum: number, pageSize: number = 5): Promise<PageResponse<Subject>> => {
    const {data} = await axios.get('/api/v1/subject', {params: {pageNum: pageNum - 1, pageSize}})
    return data
}

export const getAllSubject = async (): Promise<Subject[]> => {
    const {data} = await axios.get('/api/v1/subject/all')
    return data
}

export const addSubject = async (request: SubjectCreateRequest) => {
    await axios.post('/api/admin/subjects', request)
}


export const getExpenseByRequestId = async (id: string) => {
    const response = await axios.get(`/api/v1/expense/detail/${id}`)
    const data: ExpenseRequestDetailResponse = response.data
    const base64ToFile = (base64: string, fileName: string, mimeType: string): File => {
        const byteString = atob(base64);
        const array = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            array[i] = byteString.charCodeAt(i);
        }
        return new File([array], fileName, {type: mimeType});
    };
    const converted: Expense[] = data.expenseList.map(item => {
        const extension = item.originFileName.split('.').pop()?.toLowerCase() || 'png';
        const file = base64ToFile(item.imageBase64, item.originFileName, `image/${extension}`);
        return {
            amount: item.amount,
            expenseDate: item.expenseDate,
            subject: item.subject,
            content: item.content,
            note: item.note,
            image: [file]
        }
    })
    return converted
}

export const deleteExpense = async (id: string) => {
    await axios.delete('/api/vi/expense', {params: {id}})
}