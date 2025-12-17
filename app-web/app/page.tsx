import { HeroSection } from "./components/sections/hero-section"
import { PhilosophySection } from "./components/sections/philosophy-section"
import { ProblemSection } from "./components/sections/problem-section"
import { CommonSolutionSection } from "./components/sections/common-solution-section"
import { TrueCauseSection } from "./components/sections/true-cause-section"
import { HeavenSection } from "./components/sections/heaven-section"
import { HellSection } from "./components/sections/hell-section"
import { ProofSection } from "./components/sections/proof-section"
import { ConsultationCtaSection } from "./components/sections/consultation-cta-section"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <HeroSection />
      <PhilosophySection />
      <ProblemSection />
      <CommonSolutionSection />
      <TrueCauseSection />
      <HeavenSection />
      <HellSection />
      <ProofSection />
      <ConsultationCtaSection />
    </main>
  )
}
