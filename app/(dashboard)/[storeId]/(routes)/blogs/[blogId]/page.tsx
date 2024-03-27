import prismadb from "@/lib/prismadb";

import { BlogForm } from "./components/blog-form";

const BlogPage = async ({
  params
}: {
  params: { blogId: string, storeId: string }
}) => {
  const blog = await prismadb.blog.findUnique({
    where: {
      id: params.blogId
    }
  });



  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BlogForm initialData={blog} />
      </div>
    </div>
  );
}

export default BlogPage;
