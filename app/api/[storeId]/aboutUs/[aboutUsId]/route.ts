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

    const { ourMembersUrl, phoneNo, address } = body;

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

    const aboutUs = await prismadb.aboutUs.update({
      where: {
        id: params.aboutUsId,
      },
      data: {
        ourMembersUrl,
        phoneNo,
        address,
      },
    });

    return NextResponse.json(aboutUs);
  } catch (error) {
    console.log("[AboutUs_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

