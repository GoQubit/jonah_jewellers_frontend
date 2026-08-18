import { redirect } from "next/navigation";

// This page moved to /jonah-seller. Kept as a redirect so old links/bookmarks still work.
export default function InvestInGoldRedirect() {
  redirect("/jonah-seller");
}
