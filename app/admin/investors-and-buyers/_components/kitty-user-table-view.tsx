"use client"

import React, { useEffect, useState } from "react";
import DataTable, { useDataTable } from "@/components/data-table";
import { kittyUserListColumns } from "./kitty-user-list-columns";
import { getKittyUserListApi } from "@/lib/api/admin/kittyUserApi";
import { useSearchParams } from "next/navigation";

type InitialState = { isLoading: boolean; data: any | null; error: string | null };
const initialState: InitialState = { isLoading: false, data: null, error: null };

type Props = {};

const KittyUserTableView = (props: Props) => {
  const searchParams = useSearchParams();
  const [state, setState] = useState<InitialState>(initialState);

  const fetchKittyUsers = async () => {
    setState({ ...initialState, isLoading: true });

    try {
      const queryParams = {
        limit: 20,
        page: Number(searchParams.get("page") || "1"),
        q: searchParams.get("search") || "",
      };

      const response = await getKittyUserListApi(queryParams);
      if (response && response.status === 200) {
        setState((s) => ({ ...s, data: response.data, error: null }));
      } else {
        throw new Error(response?.data?.message || response?.data?.error || "Users not found!");
      }
    } catch (e: any) {
      setState((s) => ({ ...s, error: e?.message || "Something went wrong!", data: null }));
    } finally {
      setState((s) => ({ ...s, isLoading: false }));
    }
  };

  useEffect(() => {
    fetchKittyUsers();
  }, [searchParams]);

  const { table } = useDataTable({
    data: state?.data?.results || [],
    columns: kittyUserListColumns,
    pageCount: state?.data?.totalPages || 1,
    state: {
      pagination: { pageIndex: 0, pageSize: 10 },
    },
  });

  return (
    <DataTable
      table={table}
      message={"No users found"}
      className={"w-full flex flex-col border-b-4 rounded"}
    />
  );
};

export default KittyUserTableView;

