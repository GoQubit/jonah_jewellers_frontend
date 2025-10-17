import CustomPageHeader from "@/components/ui/CustomHeader";

export default function SellerDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <CustomPageHeader title="Seller Dashboard" />
      <main>{children}</main>
    </div>
  );
}