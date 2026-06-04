import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

/* Shared chrome for the login / register screens. */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle: string
  children: ReactNode
  footer: ReactNode
}) {
  return (
    <div className="grid min-h-screen place-items-center bg-cream-100 px-5 py-12 font-ui text-ink">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="focus-ring mx-auto flex w-fit items-center gap-2.5 rounded-lg"
          aria-label="PrepMaster AI — home"
        >
          <Image src="/mark.svg" alt="" width={36} height={36} className="size-9" priority />
          <span className="font-serif text-[20px] tracking-[-0.02em] text-ink">
            PrepMaster <span className="text-orange">AI</span>
          </span>
        </Link>

        <div className="mt-8 rounded-[24px] bg-surface p-7 shadow-card shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-8">
          <div className="text-center">
            <h1 className="font-serif text-[28px] leading-[1.1] tracking-[-0.02em] text-ink">
              {title}
            </h1>
            <p className="mt-2 text-[15px] leading-[1.55] text-cocoa">{subtitle}</p>
          </div>
          <div className="mt-7">{children}</div>
        </div>

        <div className="mt-6 text-center text-[14px] text-cocoa">{footer}</div>
      </div>
    </div>
  )
}

export const fieldLabelClass = "block font-ui text-[12px] font-semibold text-cocoa"
export const fieldClass =
  "focus-ring w-full rounded-[14px] bg-surface px-4 py-3 font-ui text-[15px] text-ink shadow-[inset_0_0_0_1px_var(--color-line)] placeholder:text-taupe"

export function Field({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  className,
}: {
  id: string
  label: string
  type?: string
  placeholder?: string
  autoComplete?: string
  className?: string
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={id} className={fieldLabelClass}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={fieldClass}
      />
    </div>
  )
}
