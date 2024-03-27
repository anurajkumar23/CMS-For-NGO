import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    if (!params.blogId) {
      return new NextResponse("Blog id is required", { status: 400 });
    }

    const blog = await prismadb.blog.findUnique({
      where: {
        id: params.blogId
      }
    });
  
    return NextResponse.json(blog);
  } catch (error) {
    console.log('[BLOG_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { blogId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.blogId) {
      return new NextResponse("Blog id is required", { status: 400 });
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

    const blog = await prismadb.blog.delete({
      where: {
        id: params.blogId,
      }
    });
  
    return NextResponse.json(blog);
  } catch (error) {
    console.log('[CAMPAIGN_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { blogId: string, storeId: string } }
) {
  try {   
    const { userId } = auth();

    const body = await req.json();
    
    const { campaign,
      heading,
      imageUrl,
      descriptions,
      author, } = body;
    
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
  
      if (!imageUrl ) {
        return new NextResponse("Image is required", { status: 400 });
      }
  
      if (!heading) {
        return new NextResponse("Heading is required", { status: 400 });
      }
  
      if (!descriptions) {
        return new NextResponse("Descriptions is required", { status: 400 });
      }
    if (!params.blogId) {
      return new NextResponse("Blog id is required", { status: 400 });
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

    const blogs = await prismadb.blog.update({
      where: {
        id: params.blogId,
      },
      data: {
        heading,
        imageUrl,
        descriptions,
        author,
      }
    });
  
    return NextResponse.json(blogs);
  } catch (error) {
    console.log('[CAMPAIGN_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
