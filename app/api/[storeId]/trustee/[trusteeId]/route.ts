import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { trusteeId: string } }
) {
  try {
    if (!params.trusteeId) {
      return new NextResponse("Trustee id is required", { status: 400 });
    }

    const trustee = await prismadb.trustee.findUnique({
      where: {
        id: params.trusteeId,
      },
    });

    return NextResponse.json(trustee);
  } catch (error) {
    console.log("[AboutUs_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { trusteeId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.trusteeId || !params.storeId) {
      return new NextResponse("trustee id and storeId are required", { status: 400 });
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

    const trustee = await prismadb.trustee.delete({
      where: {
        id: params.trusteeId,
      },
    });

    return NextResponse.json(trustee);
  } catch (error) {
    console.log("[TRUSTEE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}


export async function PATCH(
  req: Request,
  { params }: { params: { trusteeId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, post, photoUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.trusteeId) {
      return new NextResponse("trustee id is required", { status: 400 });
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

    const trustee = await prismadb.trustee.update({
      where: {
        id: params.trusteeId,
      },
      data: {
        name, post, photoUrl,
      },
    });

    return NextResponse.json(trustee);
  } catch (error) {
    console.log("[AboutUs_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

