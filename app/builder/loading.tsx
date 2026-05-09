import { BuilderSkeleton } from "../../components/builder/builder-skeleton";
import { SiteHeader } from "../../components/site-header";

export default function Loading() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <BuilderSkeleton />
    </main>
  );
}
