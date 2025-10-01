import { cn } from "@/utils/cn"
import { Column } from "./types"

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    title: string,
    column?: Column<TData, TValue>,
}

export default function DataTableColumnHeader<TData, TValue>({
    className,
    title,
    column,
}: DataTableColumnHeaderProps<TData, TValue>) {
    return (
        <div className={cn(className)}>
            {title}
        </div>
    )
}
