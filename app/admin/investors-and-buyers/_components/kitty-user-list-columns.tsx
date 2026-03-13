import { DataTableColumnHeader } from "@/components/data-table";
import { formatDate } from "@/utils/formatDate";

export const kittyUserListColumns = [
  {
    id: "name",
    accessorKey: "firstName",
    header: () => <DataTableColumnHeader title={"Customer Name"} />,
    cell: ({ row }: { row: any }) => {
      const firstName = row.original.firstName;
      const lastName = row.original.lastName;
      if (!firstName && !lastName) return <span>-</span>;
      return (
        <span>
          {firstName} {lastName || ""}
        </span>
      );
    },
  },
  {
    id: "mobileNumber",
    accessorKey: "mobileNumber",
    header: () => <DataTableColumnHeader title={"Mobile Number"} />,
    cell: ({ row }: { row: any }) =>
      row.original.mobileNumber ? <span>{row.original.mobileNumber}</span> : <span>-</span>,
  },
  {
    id: "email",
    accessorKey: "email",
    header: () => <DataTableColumnHeader title={"Email"} />,
    cell: ({ row }: { row: any }) =>
      row.original.email ? <span>{row.original.email}</span> : <span>-</span>,
  },
  {
    id: "city",
    accessorKey: "address.city",
    header: () => <DataTableColumnHeader title={"City"} />,
    cell: ({ row }: { row: any }) =>
      row.original.address?.city ? <span>{row.original.address.city}</span> : <span>-</span>,
  },
  {
    id: "state",
    accessorKey: "address.state",
    header: () => <DataTableColumnHeader title={"State"} />,
    cell: ({ row }: { row: any }) =>
      row.original.address?.state ? <span>{row.original.address.state}</span> : <span>-</span>,
  },
  {
    id: "pinCode",
    accessorKey: "address.pinCode",
    header: () => <DataTableColumnHeader title={"PIN Code"} />,
    cell: ({ row }: { row: any }) =>
      row.original.address?.pinCode ? <span>{row.original.address.pinCode}</span> : <span>-</span>,
  },
  {
    id: "role",
    accessorKey: "role",
    header: () => <DataTableColumnHeader title={"User Role"} />,
    cell: ({ row }: { row: any }) =>
      row.original.role ? <span>{row.original.role}</span> : <span>-</span>,
  },
  {
    id: "status",
    accessorKey: "isApproved",
    header: () => <DataTableColumnHeader title={"Status"} />,
    cell: ({ row }: { row: any }) => {
      const approved = row.original.isApproved;
      const label = approved ? "Approved" : "Pending";
      const color = approved ? "#14863D" : "#E8A83E";
      return (
        <span className="border rounded-md px-2 py-1 text-xs" style={{ color }}>
          {label}
        </span>
      );
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: () => <DataTableColumnHeader title={"Created At"} />,
    cell: ({ row }: { row: any }) =>
      row.original.createdAt ? <span>{formatDate(row.original.createdAt)}</span> : <span>-</span>,
  },
];

