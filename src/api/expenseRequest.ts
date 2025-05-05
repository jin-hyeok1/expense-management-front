import api from "./config.ts";
import {AxiosResponse} from "axios";
import {
    Expense,
    ExpenseRequest,
    ExpenseRequestCreateRequest,
    ExpenseRequestDetailResponse,
    PageResponse
} from "../type.ts";
import dayjs from "dayjs";

export const getExpenseByRequestId = async (id: string): Promise<Expense[]> => {
    const response = await api.get(`/v1/expense/detail/${id}`)
    const data: ExpenseRequestDetailResponse = response.data
    const base64ToFile = (base64: string, fileName: string, mimeType: string): File => {
        const byteString = atob(base64);
        const array = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            array[i] = byteString.charCodeAt(i);
        }
        return new File([array], fileName, {type: mimeType});
    };
    return data.expenseList.map(item => {
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
        if (item.image && Array.isArray(item.image)) {
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

    return api.post('/v1/expense', formData);
}

export const submitExpenseRequest = async (id: string) => {
    await api.patch(`/v1/expense/submit/${id}`)
}

export const submitCancelExpenseRequest = async (id: string) => {
    await api.patch(`/v1/expense/submit-cancel/${id}`)
}

export const getExpenseRequestsForMe = async (pageNum: number, pageSize: number = 5): Promise<PageResponse<ExpenseRequest>> => {
    const {data} = await api.get('/v1/expense', {params: {pageNum: pageNum - 1, pageSize}})
    return data
}

export const downloadReportInvoice = async (id: string) => {
    const response = await api.get(`/v1/expense/invoice-report/${id}`, {
        responseType: 'blob'
    })

    downloadFileFromResponse(response)
}

export const deleteExpense = async (id: string) => {
    await api.delete('/vi/expense', {params: {id}})
}

export const downloadInvoice = async (id: string) => {
    const response = await api.get(`/v1/expense/invoice/${id}`, {
        responseType: 'blob',
    });

    downloadFileFromResponse(response)
};

const downloadFileFromResponse = (response: AxiosResponse<any, any>) => {
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
}
