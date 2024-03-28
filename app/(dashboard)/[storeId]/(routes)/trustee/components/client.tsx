"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";


import { columns, TrusteeColumn } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface TrusteeClientProps {
  data: TrusteeColumn[];
}

export const TrusteeClient: React.FC<TrusteeClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Trustee (${data.length})`} description="Manage Trustee for your store" />
        <Button onClick={() => router.push(`/${params.storeId}/trustee/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Trustee" />
      <Separator />
      <ApiList entityName="trustee" entityIdName="trusteeId" />
    </>
  );
};
