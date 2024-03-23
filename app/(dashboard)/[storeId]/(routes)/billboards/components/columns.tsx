"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type BillboardColumn = {
  id: string
  label1: string,
  label2: string,
  linkUrl:  string,
  createdAt: string;
}

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label1",
    header: "First Label",
  },
  {
    accessorKey: "label2",
    header: "Second Label",
  },
  {
    accessorKey: "linkUrl",
    header: "Link Url",
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
