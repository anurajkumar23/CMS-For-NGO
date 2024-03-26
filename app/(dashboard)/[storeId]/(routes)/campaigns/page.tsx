import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { CampaignColumn } from "./components/columns"
import { CampaignsClient } from "./components/client";

const CampaignPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const campaigns = await prismadb.campaign.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedCampaigns: CampaignColumn[] = campaigns.map((item) => ({
    id: item.id,
    campaign: item.campaign,
    heading: item.heading,
    descriptions: item.descriptions,
    goalAmount: item.goalAmount,
    raisedAmount: item.raisedAmount,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CampaignsClient data={formattedCampaigns} />
      </div>
    </div>
  );
};

export default CampaignPage;
