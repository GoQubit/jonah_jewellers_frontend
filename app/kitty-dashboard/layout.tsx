import CustomPageHeader from "@/components/ui/CustomHeader";

export default function KittyDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <CustomPageHeader title="Kitty Dashboard" />
      <main>{children}</main>
    </div>
  );
}