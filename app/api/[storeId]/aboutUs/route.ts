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

    const {ourMembersUrl, phoneNo, address, trustees } = body;

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

    const aboutUs = await prismadb.aboutUs.create({
      data: {
        ourMembersUrl, 
        phoneNo, 
        address,
        storeId: params.storeId,
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

    const aboutUs = await prismadb.aboutUs.findMany({
      where: {
        storeId: params.storeId,
      },
      include: {
        trustees: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
  
    return NextResponse.json(aboutUs);
  } catch (error) {
    console.log('[AboutUs_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
