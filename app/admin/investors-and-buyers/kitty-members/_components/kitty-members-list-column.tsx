import { DataTableColumnHeader } from "@/components/data-table";
import { formatDate } from "@/utils/formatDate";
import BuyerDetailAction from "./buyer-detail-action";

export const getKittyMembersTableColumns = () => [
  {
    id: "name",
    accessorKey: "firstName",
    header: () => <DataTableColumnHeader title={"Name"} />,
    cell: ({ row }: { row: any }) => {
      const name = [row.original.firstName, row.original.lastName]
        .filter(Boolean)
        .join(" ");
      if (!name) return <span>-</span>;
      return <span className="font-medium">{name}</span>;
    },
  },
  {
    id: "mobileNumber",
    accessorKey: "mobileNumber",
    header: () => <DataTableColumnHeader title={"Mobile Number"} />,
    cell: ({ row }: { row: any }) => {
      if (!row.original.mobileNumber) return <span>-</span>;
      return <span>{row.original.mobileNumber}</span>;
    },
  },
  {
    id: "email",
    accessorKey: "email",
    header: () => <DataTableColumnHeader title={"Email"} />,
    cell: ({ row }: { row: any }) => {
      if (!row.original.email) return <span>-</span>;
      return <span>{row.original.email}</span>;
    },
  },
  {
    id: "location",
    accessorKey: "address",
    header: () => <DataTableColumnHeader title={"City / State"} />,
    cell: ({ row }: { row: any }) => {
      const city = row.original.address?.city;
      const state = row.original.address?.state;
      const location = [city, state].filter(Boolean).join(", ");
      if (!location) return <span>-</span>;
      return <span>{location}</span>;
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: () => <DataTableColumnHeader title={"Joined On"} />,
    cell: ({ row }: { row: any }) => {
      if (!row.original.createdAt) return <span>-</span>;
      return <span>{formatDate(row.original.createdAt)}</span>;
    },
  },
  {
    id: "action",
    accessorKey: "id",
    header: () => <DataTableColumnHeader title={"Action"} />,
    cell: ({ row }: { row: any }) => <BuyerDetailAction id={row.original.id} />,
  },
];
