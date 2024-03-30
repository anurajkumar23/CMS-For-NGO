import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { UserColumn } from "./components/columns"
import { UserClient } from "./components/client";

const UserPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const user = await prismadb.user.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedUser: UserColumn[] = user.map((item) => ({
    id: item.id,
    phone: item.phone,
    name: item.name,
    email: item.email,
    address:item.address,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UserClient data={formattedUser} />
      </div>
    </div>
  );
};

export default UserPage;
