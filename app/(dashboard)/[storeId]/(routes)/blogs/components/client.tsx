"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiAlert } from "@/components/ui/api-alert";

import { columns, BlogColumn } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface BlogsClientProps {
  data: BlogColumn[];
}

export const BlogsClient: React.FC<BlogsClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Blogs (${data.length})`} description="Manage blogs for your store" />
        <Button onClick={() => router.push(`/${params.storeId}/blogs/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Blogs" />
      <Separator />
      <ApiList entityName="blogs" entityIdName="BlogId" />
    </>
  );
};
