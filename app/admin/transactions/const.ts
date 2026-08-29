import { TransactionListFilters, TransactionStatusOptions, TransactionTypeOptions } from "./types";
import { TrendingDown, TrendingUp } from "lucide-react";


export const transactionListFilters: TransactionListFilters = {
    search: '',
    transactionType: '',
    transactionStatus: '',
    startDate: undefined,
    endDate: undefined,
}

export const transactionTypeOptions: TransactionTypeOptions[] = [
    {
        value: "credit",
        label: "Credit",
        light_color: "#f0fdf4",
        dark_color: "#22c55e",
        icon: TrendingUp,
    },
    {
        value: "debit",
        label: "Debit",
        light_color: "#fefce8",
        dark_color: "#eab308",
        icon: TrendingDown
    },
]

export const transactionStatusOptions: TransactionStatusOptions[] = [
    {
        value: "SUCCESS",
        label: "Success",
        light_color: "#f0fdf4",
        dark_color: "#22c55e",
        icon: TrendingUp,
    },
    {
        value: "PENDING",
        label: "Pending",
        light_color: "#fefce8",
        dark_color: "#eab308",
        icon: TrendingDown
    },
    {
        value: "FAILED",
        label: "Failed",
        light_color: "#FF0000/20",
        dark_color: "#FF0000",
        icon: TrendingDown
    },
]