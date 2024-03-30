import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { BillboardColumn } from "./components/columns"
import { BillboardClient } from "./components/client";

const BillboardsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label1: item.label1 ?? '', // Use an empty string as the default value if label1 is null
    label2: item.label2 ?? '', // Use an empty string as the default value if label2 is null
    linkUrl: item.linkUrl ?? '', // Use an empty string as the default value if linkUrl is null
    createdAt: format(new Date(item.createdAt), 'MMMM do, yyyy'), // Assuming `format` is a function that formats dates
  }));
  

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
