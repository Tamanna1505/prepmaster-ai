import type { Metadata } from "next"
import { LegalPage } from "@/components/marketing/legal-page"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using PrepMaster AI.",
}

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms of Service" updated="June 2026">
      <p>
        These terms outline how PrepMaster AI may be used. By creating an account you would agree to
        use the platform for personal exam preparation in line with the terms below. This prototype
        runs on sample data and is provided for demonstration purposes.
      </p>

      <h2>Using the platform</h2>
      <p>
        PrepMaster AI provides structured courses, mock tests, and AI-generated performance feedback.
        You agree to use the service for lawful, personal study and not to redistribute paid content
        or attempt to disrupt the platform for other learners.
      </p>

      <h2>Accounts</h2>
      <p>
        You are responsible for keeping your account credentials secure. During the MVP, access is
        free and accounts are created via email and password. We may suspend accounts that abuse the
        service.
      </p>

      <h2>Content and intellectual property</h2>
      <p>
        Courses, questions, explanations, and articles on PrepMaster AI are provided for your own
        preparation. They may not be copied, resold, or republished without permission.
      </p>

      <h2>Pricing</h2>
      <p>
        The platform is free during the MVP. Paid tiers shown on the pricing page are a preview of
        what is planned and are not billable. Anyone using the platform now keeps free access to the
        courses and tests available today.
      </p>

      <h2>Disclaimer</h2>
      <p>
        PrepMaster AI is a study aid. Performance on practice tests and AI feedback are guidance, not
        guarantees of any exam outcome. The service is provided “as is” during the prototype phase.
      </p>

      <h2>Contact</h2>
      <p>For questions about these terms, write to hello@prepmaster.ai.</p>
    </LegalPage>
  )
}
