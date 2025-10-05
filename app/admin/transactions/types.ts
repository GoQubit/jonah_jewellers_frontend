export type TransactionType = '' | 'credit' | 'debit'

export type TransactionListFilters = {
    search: string,
    transactionType: TransactionType,
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