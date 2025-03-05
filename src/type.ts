export interface SearchFilter {
    fromDate: Date,
}

export interface Expense {
    targetDate: string,
    status: string,
    createAt: string,
    updateAt: string,
    expenseItems: ExpenseItem[],
}

export interface ExpenseItem {
    expenseDate: string,
    group: string,
    purpose: string,
    amount: number,
    description?: string,
    image?: ExpenseItemImage
    createAt: string,
    updateAt: string,
}

export interface ExpenseItemImage {
    path: string,
    name: string,
    file: Blob
}

export interface LoginRequest {
    email: string,
    password: string
}

export interface SimpleMessage {
    message: string,
}

export interface Group {
    index: number,
    name: string,
    createAt: Date
}