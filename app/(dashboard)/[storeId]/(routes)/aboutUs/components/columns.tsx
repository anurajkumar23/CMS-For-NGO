"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type AboutUsColumn = {
  id: string
  phoneNo: string
  address: string
  trustees: Trustee[]
}


export type Trustee = {
  id: string;
  name: string;
  post: string;
  photoUrl: string;
};

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
    id: "trustees", // Assuming trustee data will be rendered in a separate column
    header: "Trustees",
    cell: ({ value }) => (
      <ul>
        {value.map((trustee: Trustee) => (
          <li key={trustee.id}>{trustee.name} - {trustee.post}</li>
        ))}
      </ul>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
