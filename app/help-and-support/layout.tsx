import CustomPageHeader from "@/components/ui/CustomHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <CustomPageHeader title="Help & Support" />
      <main>{children}</main>
    </div>
  );
}