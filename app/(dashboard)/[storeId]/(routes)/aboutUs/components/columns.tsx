"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type AboutUsColumn = {
  id: string
  phoneNo: string
  address: string
}

export const columns: ColumnDef<AboutUsColumn>[] = [
  {
    accessorKey: "phoneNo",
    header: "PhoneNo",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
