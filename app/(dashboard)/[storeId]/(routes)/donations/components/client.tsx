"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";


import { columns, DonationColumn } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface DonationClientProps {
  data: DonationColumn[];
}

export const DonationClient: React.FC<DonationClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Donation (${data.length})`} description="Manage Donation for your store" />
        {/* <Button onClick={() => router.push(`/${params.storeId}/users/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button> */}
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Donation" />
      <Separator />
      <ApiList entityName="user" entityIdName="userId" />
    </>
  );
};
