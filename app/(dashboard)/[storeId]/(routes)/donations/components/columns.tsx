"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type DonationColumn = {
  id: string
  amount: string
  citizenship: string,
  fullName: string,
  email: string,
  campaign: string,
  phoneNumber: string,
  governmentId: string,
  address: string,
  pincode: string,
  state: string,
  city: string,
  isPaid: boolean,
}

export const columns: ColumnDef<DonationColumn>[] = [
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "citizenship",
    header: "Citizenship",
  },
  {
    accessorKey: "campaign",
    header: "Campaign",
  },
  {
    accessorKey: "fullName",
    header: "Name",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone no",
  },
  {
    accessorKey: "email",
    header: "Phone no",
  },
  {
    accessorKey: "pincode",
    header: "Pin Code",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "governmentId",
    header: "Pan card",
  },
  {
    accessorKey: "isPaid",
    header: "IsPaid",
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
