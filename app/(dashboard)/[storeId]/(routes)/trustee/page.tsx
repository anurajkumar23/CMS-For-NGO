import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { TrusteeColumn } from "./components/columns"
import { TrusteeClient } from "./components/client";

const TrusteePage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const trustee = await prismadb.trustee.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedTrustee: TrusteeColumn[] = trustee.map((item) => ({
    id: item.id,
    photoUrl: item.photoUrl ?? '',
    name: item.name ?? '',
    post: item.post ?? '',
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TrusteeClient data={formattedTrustee} />
      </div>
    </div>
  );
};

export default TrusteePage;
