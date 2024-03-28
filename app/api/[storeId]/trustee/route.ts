import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const {name, post, photoUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
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

    const trustee = await prismadb.trustee.create({
      data: {
        name, post, photoUrl,
        storeId: params.storeId,

      },
    });
  
    return NextResponse.json(trustee);
  } catch (error) {
    console.log('[AboutUs_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const trustee = await prismadb.trustee.findMany({
      where: {
        storeId: params.storeId,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
  
    return NextResponse.json(trustee);
  } catch (error) {
    console.log('[AboutUs_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
