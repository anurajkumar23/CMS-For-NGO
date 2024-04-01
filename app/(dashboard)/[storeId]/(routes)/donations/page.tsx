import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { DonationColumn } from "./components/columns"
import { DonationClient } from "./components/client";

const DonationPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const donation = await prismadb.donation.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedDonation: DonationColumn[] = donation.map((item) => ({
    id: item.id,
    amount: item.amount !== null ? String(item.amount) : '',
    citizenship: item.citizenship,
    fullName: item.fullName,
    email: item.email,
    campaign: item.campaign,
    phoneNumber: item.phoneNumber,
    governmentId: item.governmentId,
    address: item.address,
    pincode: item.pincode,
    state: item.state,
    city: item.city,
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DonationClient data={formattedDonation} />
      </div>
    </div>
  );
};

export default DonationPage;
