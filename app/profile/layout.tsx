import CustomPageHeader from "@/components/ui/CustomHeader";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <CustomPageHeader title="Back" />
      <main>{children}</main>
    </div>
  );
}