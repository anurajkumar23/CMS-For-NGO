import prismadb from "@/lib/prismadb";

import { CampaignForm } from "./components/campaign-form";

const CampaignPage = async ({
  params
}: {
  params: { campaignId: string, storeId: string }
}) => {
  const category = await prismadb.campaign.findUnique({
    where: {
      id: params.campaignId
    }
  });



  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CampaignForm initialData={category} />
      </div>
    </div>
  );
}

export default CampaignPage;
