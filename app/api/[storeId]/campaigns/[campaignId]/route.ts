import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { campaignId: string } }
) {
  try {
    if (!params.campaignId) {
      return new NextResponse("Campaign id is required", { status: 400 });
    }

    const campaign = await prismadb.campaign.findUnique({
      where: {
        id: params.campaignId
      }
    });
  
    return NextResponse.json(campaign);
  } catch (error) {
    console.log('[CAMPAIGN_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { campaignId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.campaignId) {
      return new NextResponse("Campaign id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const campaign = await prismadb.campaign.delete({
      where: {
        id: params.campaignId,
      }
    });
  
    return NextResponse.json(campaign);
  } catch (error) {
    console.log('[CAMPAIGN_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { campaignId: string, storeId: string } }
) {
  try {   
    const { userId } = auth();

    const body = await req.json();
    
    const { campaign,
      heading,
      imageUrl,
      descriptions,
      goalAmount,
      raisedAmount } = body;
    
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
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
    if (!params.campaignId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const campaigns = await prismadb.campaign.update({
      where: {
        id: params.campaignId,
      },
      data: {
        campaign,
        heading,
        imageUrl,
        descriptions,
        goalAmount,
        raisedAmount,
      }
    });
  
    return NextResponse.json(campaigns);
  } catch (error) {
    console.log('[CAMPAIGN_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
