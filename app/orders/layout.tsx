import CustomPageHeader from "@/components/ui/CustomHeader";

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <CustomPageHeader title="My Orders" />
      <main>{children}</main>
    </div>
  );
}