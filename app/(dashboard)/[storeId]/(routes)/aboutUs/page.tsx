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
    include: {
      trustees: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedAboutUs: AboutUsColumn[] = aboutUs.map((item) => ({
    id: item.id,
    ourMembersUrl: item.ourMembersUrl,
    phoneNo: item.phoneNo,
    address: item.address,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    trustees: item.trustees.map((trustee) => ({
      id: trustee.id,
      name: trustee.name,
      post: trustee.post,
      photoUrl: trustee.photoUrl
    }))
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
