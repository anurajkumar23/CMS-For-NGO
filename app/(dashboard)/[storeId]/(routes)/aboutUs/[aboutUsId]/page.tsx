import prismadb from "@/lib/prismadb";

import { AboutUsForm } from "./components/aboutUs-form";

const AboutUsPage = async ({
  params
}: {
  params: { aboutUsId: string, storeId: string }
}) => {
  const aboutUs = await prismadb.aboutUs.findUnique({
    where: {
      id: params.aboutUsId
    }
  });



  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AboutUsForm initialData={aboutUs} />
      </div>
    </div>
  );
}

export default AboutUsPage;
