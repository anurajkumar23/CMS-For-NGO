import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { aboutUsId: string } }
) {
  try {
    if (!params.aboutUsId) {
      return new NextResponse("AboutUs id is required", { status: 400 });
    }

    const aboutUs = await prismadb.aboutUs.findUnique({
      where: {
        id: params.aboutUsId,
      },
      include: {
        trustees: true,
      },
    });

    return NextResponse.json(aboutUs);
  } catch (error) {
    console.log("[AboutUs_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { aboutUsId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.aboutUsId || !params.storeId) {
      return new NextResponse("aboutUs id and storeId are required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const aboutUs = await prismadb.aboutUs.delete({
      where: {
        id: params.aboutUsId,
      },
    });

    return NextResponse.json(aboutUs);
  } catch (error) {
    console.log("[aboutUs_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}


export async function PATCH(
  req: Request,
  { params }: { params: { aboutUsId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { ourMembersUrl, phoneNo, address, trustees } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.aboutUsId) {
      return new NextResponse("aboutUs id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    await prismadb.aboutUs.update({
      where: {
        id: params.aboutUsId,
      },
      data: {
        ourMembersUrl,
        phoneNo,
        address,
        trustees: {
          deleteMany: {}, // Delete existing trustees
        },
      },
    });

    const aboutUs = await prismadb.aboutUs.update({
      where: {
        id: params.aboutUsId,
      },
      data: {
        trustees: {
          createMany: {
            data: trustees.map((trustee: {name: string, post: string, photoUrl: string}) => ({
              name: trustee.name,
              post: trustee.post,
              photoUrl: trustee.photoUrl,
            })),
          },
        },
      },
    });

    return NextResponse.json(aboutUs);
  } catch (error) {
    console.log("[AboutUs_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

