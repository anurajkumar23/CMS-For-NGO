import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
  
    const body = await req.json();

    const {
      campaign,
      amount,
      citizenship,
      fullName,
      email,
      phoneNumber,
      governmentId,
      address,
      pincode,
      state,
      city,
      isPaid,
    } = body;

    if (!amount) {
      return new NextResponse("Amount is required", { status: 403 });
    }

    
    if (!campaign) {
      return new NextResponse("Campaign is required", { status: 403 });
    }
    // if (!citizenship) {
    //   return new NextResponse("citizenship is required", { status: 403 });
    // }

    if (!fullName) {
      return new NextResponse("Full Name is required", { status: 403 });
    }

    if (!email) {
      return new NextResponse("email ID is required", { status: 403 });
    }

    if (!phoneNumber) {
      return new NextResponse("Phone Number is required", { status: 403 });
    }

    if (!governmentId) {
      return new NextResponse("GovernmentId is required", { status: 403 });
    }

    if (!address) {
      return new NextResponse("Address is required", { status: 403 });
    }

    if (!pincode) {
      return new NextResponse("pincode is required", { status: 403 });
    }

    if (!state) {
      return new NextResponse("state is required", { status: 403 });
    }

    if (!city) {
      return new NextResponse("city is required", { status: 403 });
    }

    // if (!isPaid) {
    //   return new NextResponse("isPaid is required", { status: 403 });
    // }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const donation = await prismadb.donation.create({
      data: {
        campaign,
        amount,
        citizenship,
        fullName,
        email,
        phoneNumber,
        governmentId,
        address,
        pincode,
        state,
        city,
        isPaid,
        store: {
          connect: {
            id: params.storeId, // Connect to the Store by its ID
          },
        },
      },
    });

    return NextResponse.json(donation);
  } catch (error) {
    console.log("[DONATION_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // const { userId } = auth();
    
    // if (!userId) {
    //   return new NextResponse("Unauthenticated", { status: 403 });
    // }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }


    const donation = await prismadb.donation.findMany({
      where: {
        storeId: params.storeId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(donation);
  } catch (error) {
    console.log("[DONATION_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
