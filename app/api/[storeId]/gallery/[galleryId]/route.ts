import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { galleryId: string } }
) {
  try {
    if (!params.galleryId) {
      return new NextResponse("Gallery id is required", { status: 400 });
    }

    const gallery = await prismadb.gallery.findUnique({
      where: {
        id: params.galleryId
      },
      include: {
        images: true,
      }
    });
  
    return NextResponse.json(gallery);
  } catch (error) {
    console.log('[GALLERY_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { galleryId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.galleryId) {
      return new NextResponse("Gallery id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const gallery = await prismadb.gallery.delete({
      where: {
        id: params.galleryId
      },
    });
  
    return NextResponse.json(gallery);
  } catch (error) {
    console.log('[GALLERY_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { galleryId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { images } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.galleryId) {
      return new NextResponse("Gallery id is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    await prismadb.gallery.update({
      where: {
        id: params.galleryId
      },
      data: {
        images: {
          deleteMany: {},
        },
      },
    });

    const gallery = await prismadb.gallery.update({
      where: {
        id: params.galleryId
      },
      data: {
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image),
            ],
          },
        },
      },
    })
  
    return NextResponse.json(gallery);
  } catch (error) {
    console.log('[GALLERY_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
