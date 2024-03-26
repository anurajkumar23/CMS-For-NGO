"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type CampaignColumn = {
  id: string
  campaign: String
  heading:   String
  descriptions: String
  goalAmount: String
  raisedAmount: String
  createdAt: string;
}

export const columns: ColumnDef<CampaignColumn>[] = [
  {
    accessorKey: "campaign",
    header: "Campaign",
  },
  {
    accessorKey: "heading",
    header: "Heading",
  },
  {
    accessorKey: "descriptions",
    header: "Descriptions",
  },
  {
    accessorKey: "goalAmount",
    header: "GoalAmount",
  },
  {
    accessorKey: "raisedAmount",
    header: "RaisedAmount",
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
