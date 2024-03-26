import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const {
      campaign,
      heading,
      imageUrl,
      descriptions,
      goalAmount,
      raisedAmount,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!campaign) {
      return new NextResponse("Campaign is required", { status: 400 });
    }

    if (!imageUrl ) {
      return new NextResponse("Image is required", { status: 400 });
    }

    if (!heading) {
      return new NextResponse("Heading is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
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

    const Campaign = await prismadb.campaign.create({
      data: {
      campaign,
      heading,
      imageUrl,
      descriptions,
      goalAmount,
      raisedAmount,
      storeId: params.storeId,
      },
    });

    return NextResponse.json(Campaign);
  } catch (error) {
    console.log("[CAMPAIGNS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const campaigns = await prismadb.campaign.findMany({
      where: {
        storeId: params.storeId,
      }
    });

    return NextResponse.json(campaigns);
  } catch (error) {
    console.log("[CAMPAIGNS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
