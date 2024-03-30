import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { AboutUsColumn } from "./components/columns"
import { AboutUsClient } from "./components/client";

const AboutUsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const aboutUs = await prismadb.aboutUs.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

 const formattedAboutUs: AboutUsColumn[] = aboutUs.map((item) => ({
  id: item.id,
  ourMembersUrl: item.ourMembersUrl,
  phoneNo: item.phoneNo ?? '', // Use an empty string as the default value if phoneNo is null
  address: item.address ?? '', // Similarly, use an empty string as the default value for address if null
  createdAt: format(new Date(item.createdAt), 'MMMM do, yyyy'), // Assuming `format` is a function that formats dates
}));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AboutUsClient data={formattedAboutUs} />
      </div>
    </div>
  );
};

export default AboutUsPage;
