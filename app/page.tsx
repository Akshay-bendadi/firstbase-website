import dynamic from "next/dynamic";

import { HeroSection } from "../components/landing/hero-section";
import { TelemetryBar } from "../components/landing/telemetry-bar";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

const StackSection = dynamic(
  () => import("../components/landing/stack-section").then((m) => m.StackSection),
  { ssr: true },
);
const PipelineSection = dynamic(
  () => import("../components/landing/pipeline-section").then((m) => m.PipelineSection),
  { ssr: true },
);
const SupportSection = dynamic(
  () => import("../components/landing/support-section").then((m) => m.SupportSection),
  { ssr: true },
);
const SecuritySection = dynamic(
  () => import("../components/landing/security-section").then((m) => m.SecuritySection),
  { ssr: true },
);

export default function Page() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <SiteHeader />
      <HeroSection />
      <TelemetryBar />
      <StackSection />
      <PipelineSection />
      <SupportSection />
      <SecuritySection />
      <SiteFooter />
    </main>
  );
}
