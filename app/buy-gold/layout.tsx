export default function BuyGoldLayout({ children }: { children: React.ReactNode }) {
  // Public marketing page - uses the normal site header/footer via the root layout,
  // so this just passes children through (mirrors app/jonah-seller, which has no layout.tsx either).
  return <>{children}</>;
}
