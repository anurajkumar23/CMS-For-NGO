import prismadb from "@/lib/prismadb";

import { TrusteeForm } from "./components/trustee-form";

const TrusteePage = async ({
  params
}: {
  params: { trusteeId: string, storeId: string }
}) => {
  const trustee = await prismadb.trustee.findUnique({
    where: {
      id: params.trusteeId
    }
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TrusteeForm initialData={trustee} />
      </div>
    </div>
  );
}

export default TrusteePage;
