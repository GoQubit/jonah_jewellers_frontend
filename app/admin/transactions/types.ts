export type TransactionType = '' | 'credit' | 'debit'

export type TransactionListFilters = {
    search: string,
    transactionType: TransactionType,
    transactionStatus: TransactionStatus,
    fromDate: undefined | Date,
    toDate: undefined | Date,
}

export type TransactionTypeOptions = {
    value: TransactionType,
    label: string,
    light_color: string,
    dark_color: string,
    icon?: React.ComponentType<any> | undefined,
}

export type TransactionStatus = '' | 'SUCCESS' | 'PENDING' | 'FAILED'

export type TransactionStatusOptions = {
    value: TransactionStatus,
    label: string,
    light_color: string,
    dark_color: string,
    icon?: React.ComponentType<any> | undefined,
}