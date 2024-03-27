"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type BlogColumn = {
  id: string
  heading:   String
  descriptions: String
  author: String
  createdAt: string;
}

export const columns: ColumnDef<BlogColumn>[] = [
  {
    accessorKey: "heading",
    header: "Heading",
  },
  {
    accessorKey: "descriptions",
    header: "Descriptions",
  },
  {
    accessorKey: "author",
    header: "Author",
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
