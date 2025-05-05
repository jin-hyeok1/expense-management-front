import type {ButtonType} from "antd/es/button/buttonHelpers";

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
    email: string,
    name: string,
    role: string,
    phone: string,
    birthDate: string,
    createdDate: string
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
    currentPage: number,
    pageSize?: number,
}

export interface SubjectCreateRequest {
    name: string,
}

export interface VerifyCodeRequest {
    email: string,
    verificationCode: string,
}

export interface LoginRequest {
    email: string,
    password: string
}

export interface SignupRequest {
    email: string,
    name: string,
    password: string,
    phone: string,
    birthDate: string,
}

export interface ExpenseRequestCreateRequest {
    id?: string,
    expenseList: Expense[],
    requestDate: string,
}

export type ButtonAction = 'click' | 'confirm' | 'cancel'

export interface ButtonSetting {
    disabled: boolean,
    type: ButtonType,
    onClick: () => void,
    content: string,
}

export interface MeUpdateRequest {
    name: string,
    phone: string,
    birthDate: string
}

export interface UserUpdateRequest extends MeUpdateRequest {
    email: string
}

export interface PasswordUpdateRequest {
    currentPassword: string,
    newPassword: string,
}

export interface PasswordUpdateByAdminRequest {
    email: string,
    password: string,
}