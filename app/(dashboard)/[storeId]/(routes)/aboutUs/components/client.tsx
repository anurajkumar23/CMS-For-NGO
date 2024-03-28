"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";


import { columns, AboutUsColumn } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface AboutUsClientProps {
  data: AboutUsColumn[];
}

export const AboutUsClient: React.FC<AboutUsClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`AboutUs (${data.length})`} description="Manage AboutUs for your store" />

      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for AboutUs" />
      <Separator />
      <ApiList entityName="aboutUs" entityIdName="aboutUsId" />
    </>
  );
};
