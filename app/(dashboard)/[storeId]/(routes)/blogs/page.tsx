import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { BlogColumn } from "./components/columns"
import { BlogsClient } from "./components/client";

const BlogPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const blogs = await prismadb.blog.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedBlogs: BlogColumn[] = blogs.map((item) => ({
    id: item.id,
    heading: item.heading ?? '', // Use an empty string as the default value if heading is null
    descriptions: item.descriptions ?? '', // Use an empty string as the default value if descriptions is null
    author: item.author ?? '', // Use an empty string as the default value if author is null
    createdAt: format(item.createdAt, 'MMMM do, yyyy'), // Assuming `format` is a function that formats dates
  }));
  

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BlogsClient data={formattedBlogs} />
      </div>
    </div>
  );
};

export default BlogPage;
