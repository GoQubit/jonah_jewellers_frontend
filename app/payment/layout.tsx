import CustomPageHeader from "@/components/ui/CustomHeader";

export default function PaymenyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <CustomPageHeader title="Payment Gateway" />
      <main>{children}</main>
    </div>
  );
}