import { Eyebrow } from "@/components/marketing/primitives"

type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  actions?: React.ReactNode
}

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-line pb-7 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? <Eyebrow tone="orange">{eyebrow}</Eyebrow> : null}
        <h1 className="mt-2 font-serif text-[28px] leading-[1.1] tracking-[-0.02em] text-ink sm:text-[34px]">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-[15px] leading-[1.6] text-cocoa">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  )
}
