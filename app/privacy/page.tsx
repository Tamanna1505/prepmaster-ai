import type { Metadata } from "next"
import { LegalPage } from "@/components/marketing/legal-page"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How PrepMaster AI handles your data.",
}

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updated="June 2026">
      <p>
        PrepMaster AI is built to help students prepare for competitive exams. This policy explains,
        in plain language, what information the platform would collect and how it would be used once
        live. During this prototype phase, the application runs on sample data only and does not
        collect real personal information.
      </p>

      <h2>Information we collect</h2>
      <p>
        In production, PrepMaster AI would store the details you provide when you create an account —
        your name, email, and target exam — along with your learning activity such as course progress,
        test attempts, and performance analytics. We would not sell this data.
      </p>

      <h2>How we use your information</h2>
      <p>
        Your data would be used to personalise your study experience: to track progress, generate
        performance analytics, and produce AI feedback that recommends what to revise next. Aggregate,
        anonymised statistics may be used to improve the platform.
      </p>

      <h2>AI-generated feedback</h2>
      <p>
        Performance feedback would be generated from a summary of your attempt — topic accuracy, time
        management, and weak areas. Raw answer keys are never shared with the model, and feedback is
        cached against your attempt rather than regenerated on every view.
      </p>

      <h2>Your choices</h2>
      <p>
        You would be able to view and edit your profile, and request deletion of your account and
        associated data at any time. Email is used only for authentication and essential service
        messages in the MVP.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about privacy can be sent to hello@prepmaster.ai. We will update this policy as the
        platform evolves and note the date of the most recent change above.
      </p>
    </LegalPage>
  )
}
