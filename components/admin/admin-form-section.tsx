import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { fieldClass, fieldLabelClass } from "@/components/auth/auth-shell"

/* Card section that groups related form fields (CMS-style organised forms). */
export function AdminFormSection({
  title,
  description,
  children,
  cols = 2,
}: {
  title: string
  description?: string
  children: ReactNode
  cols?: 1 | 2
}) {
  return (
    <section className="rounded-[20px] bg-surface p-6 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-7">
      <h2 className="font-serif text-[20px] tracking-[-0.02em] text-ink">{title}</h2>
      {description ? <p className="mt-1 text-[14px] text-cocoa">{description}</p> : null}
      <div className={cn("mt-5 grid gap-5", cols === 2 ? "sm:grid-cols-2" : "")}>{children}</div>
    </section>
  )
}

function FieldShell({
  id,
  label,
  hint,
  full,
  children,
}: {
  id: string
  label: string
  hint?: string
  full?: boolean
  children: ReactNode
}) {
  return (
    <div className={cn("space-y-1.5", full && "sm:col-span-2")}>
      <label htmlFor={id} className={fieldLabelClass}>
        {label}
      </label>
      {children}
      {hint ? <p className="font-ui text-[12px] text-taupe">{hint}</p> : null}
    </div>
  )
}

export function AdminInput({
  id,
  label,
  type = "text",
  placeholder,
  defaultValue,
  hint,
  full,
}: {
  id: string
  label: string
  type?: string
  placeholder?: string
  defaultValue?: string | number
  hint?: string
  full?: boolean
}) {
  return (
    <FieldShell id={id} label={label} hint={hint} full={full}>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={fieldClass}
      />
    </FieldShell>
  )
}

export function AdminSelect({
  id,
  label,
  options,
  defaultValue,
  hint,
  full,
}: {
  id: string
  label: string
  options: string[]
  defaultValue?: string
  hint?: string
  full?: boolean
}) {
  return (
    <FieldShell id={id} label={label} hint={hint} full={full}>
      <select id={id} name={id} defaultValue={defaultValue ?? options[0]} className={fieldClass}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </FieldShell>
  )
}

export function AdminTextarea({
  id,
  label,
  rows = 4,
  placeholder,
  defaultValue,
  hint,
  full = true,
  mono = false,
}: {
  id: string
  label: string
  rows?: number
  placeholder?: string
  defaultValue?: string
  hint?: string
  full?: boolean
  mono?: boolean
}) {
  return (
    <FieldShell id={id} label={label} hint={hint} full={full}>
      <textarea
        id={id}
        name={id}
        rows={rows}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={cn(fieldClass, "resize-y", mono && "font-data text-[14px] leading-[1.6]")}
      />
    </FieldShell>
  )
}

/* Controlled publish/feature toggle (parent owns the state). */
export function AdminToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description?: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[14px] bg-surface-muted px-4 py-3 sm:col-span-2">
      <div>
        <p className="font-ui text-[14px] font-semibold text-ink">{label}</p>
        {description ? <p className="font-ui text-[12px] text-taupe">{description}</p> : null}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={onChange}
        className={cn(
          "focus-ring relative h-6 w-11 shrink-0 rounded-full transition-colors",
          checked ? "bg-teal" : "bg-cream-300"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-5 rounded-full bg-surface shadow-card transition-all",
            checked ? "left-[22px]" : "left-0.5"
          )}
        />
      </button>
    </div>
  )
}
