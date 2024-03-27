import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { GalleryClient } from "./components/client";
import { GalleryColumn } from "./components/columns";

const GalleryPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const gallery = await prismadb.gallery.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedGallery: GalleryColumn[] = gallery.map((item) => ({
    id: item.id,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));


  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <GalleryClient data={formattedGallery} />
      </div>
    </div>
  );
};

export default GalleryPage;
