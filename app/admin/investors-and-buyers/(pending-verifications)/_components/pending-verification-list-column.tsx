import { DataTableColumnHeader } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import { verifyQRTransectionApi } from "@/lib/api/transection/qrTransectionApi";
import { formatDate } from "@/utils/formatDate";
import PendingVerificationAction from "./pending-verification-action";

export const getPendingVerificationTableColumns = (onActionComplete: () => void) =>[
  {
    id: "transactionId",
    accessorKey: "transactionId",
    header: () => {
      return (
        <DataTableColumnHeader title={"Transaction ID"} />
      )
    },
    cell: ({ row }: { row: any }) => {
      if (!row.original.transactionId) {
        return <span>-</span>;
      }
      return (
        <span className={" uppercase "}>
          {row.original.transactionId}
        </span>
      )
    }
  },
  {
    id: "firstName",
    accessorKey: "firstName",
    header: () => {
      return (
        <DataTableColumnHeader title={"Customer name"} />
      )
    },
    cell: ({ row }: { row: any }) => {
      if (!row.original?.userId?.firstName) {
        return <span>-</span>;
      }
      return (
        <span className={""}>
          {row.original.userId.firstName} {row.original.userId.lastName}
        </span>
      )
    }
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: () => {
      return (
        <DataTableColumnHeader title={"Date"} />
      )
    },
    cell: ({ row }: { row: any }) => {
      if (!row.original.createdAt) {
        return <span>-</span>;
      }
      return (
        <span className={""}>
          {formatDate(row.original.createdAt)}
        </span>
      )
    }
  },
  {
    id: "userType",
    accessorKey: "userType",
    header: () => {
      return (
        <DataTableColumnHeader title={"User Role"} />
      )
    },
    cell: ({ row }: { row: any }) => {
      if (!row.original.userType) {
        return <span>-</span>;
      }
      return (
        <span className={""}>
          {row.original.userType === "BUYER" ? 'Kitty User' : 'Gold Investor'}
        </span>
      )
    }
  },
  {
    id: "amount",
    accessorKey: "amount",
    header: () => {
      return (
        <DataTableColumnHeader title={"Amount"} />
      )
    },
    cell: ({ row }: { row: any }) => {
      if (!row.original.amount) {
        return <span>-</span>;
      }
      return (
        <span className={""}>
          {row.original.amount.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2,
          })}
        </span>
      )
    }
  },
  {
    id: "status",
    accessorKey: "status",
    header: () => {
      return (
        <DataTableColumnHeader title={"Status"} />
      )
    },
    cell: ({ row }: { row: any }) => {
      if (!row.original.status) {
        return <span>-</span>;
      }

      const color = row.original.status === 'SUCCESS' ? '#14863D' : row.original.status === 'PENDING' ? '#E8A83E' : '#FF0000'
      return (
        <span
          className={`flex items-center justify-center gap-1.5 border rounded-md`}
          style={{ color: color }}
        >
          {row.original.status || ""}
        </span>
      )
    }
  },

  {
    id: "action",
    accessorKey: "id",
    header: () => <DataTableColumnHeader title={"Action"} />,
    cell: ({ row }: { row: any }) => (
      <PendingVerificationAction
        id={row.original.id}
        // onActionComplete={fetchQRTransections}
      />
    ),
  },

]