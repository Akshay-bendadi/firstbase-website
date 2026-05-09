import dynamic from "next/dynamic";

import { BuilderSkeleton } from "../../components/builder/builder-skeleton";
import { SiteHeader } from "../../components/site-header";

const BuilderExperience = dynamic(
  () => import("../../components/builder/builder-experience").then((mod) => mod.BuilderExperience),
  {
    loading: () => <BuilderSkeleton />,
  },
);

export default function BuilderPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <BuilderExperience />
    </main>
  );
}
