export interface ExpenseRequest {
    id: string,
    year: number,
    month: number,
    writer: User,
    totalAmount: number,
    status: ExpenseStatus,
    count: number,
    modifiedDate: string,
}

export interface ExpenseRequestDetailResponse extends ExpenseRequest {
    expenseList: ExpenseResponse[],
}

export interface ExpenseStatus {
    name: "CREATED" | "SUBMITTED" | "REVIEWING" | "APPROVED" | "REJECTED";
    displayValue: string;
}

export interface User {
    name: string,
    email: string,
    role: string,
}

export interface Expense {
    amount: number,
    expenseDate: string,
    subject: string,
    content: string,
    note?: string,
    image?: File[],
}
export interface ExpenseResponse {
    amount: number,
    expenseDate: string,
    subject: string,
    content: string,
    note?: string,
    imageBase64: string,
    originFileName: string,
}

export interface Subject {
    name: string,
    createdDate: string,
    modifiedDate: string,
}

export interface PageResponse<T> {
    content: T[];
    totalPages: number,
    totalElements: number,
    pageSize: number,
    pageNumber: number,
}

export interface Pageable {
    totalItems?: number,
    currentPage?: number,
    pageSize?: number,
    onChangePage?: (page: number, pageSize: number) => void,
}

export interface SubjectCreateRequest {
    name: string,
}

export const getPageable = (response: PageResponse<any>) => {
    return {
        totalItems: response.totalElements,
        currentPage: response.pageNumber + 1,
        pageSize: response.pageSize,
    }
}