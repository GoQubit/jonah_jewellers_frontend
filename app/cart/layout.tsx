import { CartHeader } from "./layout/Header";

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div className="flex-1">
        <CartHeader />
        <main>{children}</main>
      </div>
    </div>
  )
}