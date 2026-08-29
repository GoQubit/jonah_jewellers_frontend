import { DataTableColumnHeader } from "@/components/data-table";
import { formatDate } from "@/utils/formatDate";
import GoldWithdrawalAction from "./gold-withdrawal-action";

export const getGoldWithdrawalsTableColumns = (onActionComplete: () => void) => [
  {
    id: "userId",
    accessorKey: "userId",
    header: () => <DataTableColumnHeader title={"User ID"} />,
    cell: ({ row }: { row: any }) => {
      if (!row.original.userId) return <span>-</span>;
      return <span>{row.original.userId}</span>;
    },
  },
  {
    id: "goldWeight",
    accessorKey: "goldWeight",
    header: () => <DataTableColumnHeader title={"Gold Weight"} />,
    cell: ({ row }: { row: any }) => {
      if (row.original.goldWeight === undefined) return <span>-</span>;
      return <span className="font-medium">{row.original.goldWeight}g</span>;
    },
  },
  {
    id: "reason",
    accessorKey: "reason",
    header: () => <DataTableColumnHeader title={"Reason"} />,
    cell: ({ row }: { row: any }) => {
      if (!row.original.reason) return <span>-</span>;
      return <span className="line-clamp-1 max-w-[220px]">{row.original.reason}</span>;
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: () => <DataTableColumnHeader title={"Requested On"} />,
    cell: ({ row }: { row: any }) => {
      if (!row.original.createdAt) return <span>-</span>;
      return <span>{formatDate(row.original.createdAt)}</span>;
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: () => <DataTableColumnHeader title={"Status"} />,
    cell: ({ row }: { row: any }) => {
      if (!row.original.status) return <span>-</span>;

      const color =
        row.original.status === "SUCCESS"
          ? "#14863D"
          : row.original.status === "PENDING_ADMIN"
            ? "#E8A83E"
            : row.original.status === "PENDING_USER"
              ? "#2568C0"
              : "#FF0000";

      return (
        <span
          className="flex items-center justify-center gap-1.5 border rounded-md"
          style={{ color: color }}
        >
          {row.original.status}
        </span>
      );
    },
  },
  {
    id: "action",
    accessorKey: "id",
    header: () => <DataTableColumnHeader title={"Action"} />,
    cell: ({ row }: { row: any }) => (
      <GoldWithdrawalAction id={row.original.id} onActionComplete={onActionComplete} />
    ),
  },
];
