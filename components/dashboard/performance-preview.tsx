/* Performance chart-style preview — teal bars (analytics). Pure CSS, no chart
   library; live recharts wiring lands in Phase 7. */
export function PerformancePreview({
  series,
  title = "Accuracy trend",
  caption = "Last 10 attempts",
}: {
  series: number[]
  title?: string
  caption?: string
}) {
  const max = Math.max(...series, 100)
  const latest = series[series.length - 1]
  const first = series[0]
  const delta = latest - first

  return (
    <div className="rounded-[20px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-teal-deep">{title}</p>
          <p className="mt-1 font-ui text-[13px] text-taupe">{caption}</p>
        </div>
        <div className="text-right">
          <p className="font-data text-[26px] font-semibold leading-none tracking-[-0.02em] text-teal-deep">
            {latest}%
          </p>
          <p className="mt-1 font-ui text-[12px] text-brand-success">
            {delta >= 0 ? "+" : ""}
            {delta}% over period
          </p>
        </div>
      </div>

      <div className="mt-6 flex h-36 items-end gap-1.5 sm:gap-2">
        {series.map((v, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <div
              className="w-full rounded-t-[6px] bg-teal/70 transition-colors hover:bg-teal"
              style={{ height: `${(v / max) * 100}%` }}
              title={`Attempt ${i + 1}: ${v}%`}
            />
            <span className="font-data text-[10px] text-taupe">{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
