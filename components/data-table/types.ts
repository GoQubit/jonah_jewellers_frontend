import { Column, ColumnDef, Table } from "@tanstack/react-table";

export type { ColumnDef as ColumnDefinition, Table, Column };

export interface TDataTableType<TData> {
    table: Table<TData>
}

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}