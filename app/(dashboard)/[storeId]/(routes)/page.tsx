// import { CreditCard, IndianRupee, Package } from "lucide-react";

// import { Separator } from "@/components/ui/separator";
// import { Overview } from "@/components/overview";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Heading } from "@/components/ui/heading";
// import { getTotalRevenue } from "@/actions/get-total-revenue";
// import { getSalesCount } from "@/actions/get-sales-count";
// import { getGraphRevenue } from "@/actions/get-graph-revenue";
// import { getStockCount } from "@/actions/get-stock-count";
// import { formatter } from "@/lib/utils";

interface DashboardPageProps {
  params: {
    storeId: string;
  };
};

const DashboardPage: React.FC<DashboardPageProps> = async ({ 
  params
}) => {
  // const totalRevenue = await getTotalRevenue(params.storeId);
  // const graphRevenue = await getGraphRevenue(params.storeId);
  // const salesCount = await getSalesCount(params.storeId);
  // const stockCount = await getStockCount(params.storeId);

  return (
    <div className="flex-col">
     
    </div>
  );
};

export default DashboardPage;
