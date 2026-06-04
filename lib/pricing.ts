import type { PricingTier } from "@/components/marketing/pricing-card"

/* Sample pricing only — payments are out of scope for the MVP (PRD §6, §15).
   Paid tiers are a preview; all access is free during the MVP. */
export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Everything you need to start preparing seriously.",
    features: [
      "Full access to all courses during MVP",
      "Unlimited mock tests",
      "AI feedback after every attempt",
      "Personal analytics dashboard",
    ],
    cta: { href: "/register", label: "Start free trial" },
  },
  {
    name: "Pro",
    price: "₹499",
    period: "/ month",
    description: "For serious aspirants who want an edge in the final stretch.",
    features: [
      "Everything in Free",
      "Priority AI feedback with deeper analysis",
      "Adaptive revision plans",
      "Topic mastery heatmaps",
      "Downloadable performance reports",
    ],
    cta: { href: "/register", label: "Choose Pro" },
    featured: true,
    badge: "Most popular",
  },
  {
    name: "Mentor",
    price: "₹1,299",
    period: "/ month",
    description: "Guided preparation with human mentorship on top of AI.",
    features: [
      "Everything in Pro",
      "Monthly 1:1 mentor sessions",
      "Personalised study roadmap",
      "Mock interview practice",
    ],
    cta: { href: "/contact", label: "Talk to us" },
  },
]
