import prismadb from "@/lib/prismadb";

import { GalleryForm } from "./components/gallery-form";

const GalleryPage = async ({
  params
}: {
  params: { galleryId: string, storeId: string }
}) => {
  const gallery = await prismadb.gallery.findUnique({
    where: {
      id: params.galleryId,
    },
    include: {
      images: true,
    }
  });



  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <GalleryForm 
          initialData={gallery}
        />
      </div>
    </div>
  );
}

export default GalleryPage;
