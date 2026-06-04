"use client"

import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import type { SectionAgg } from "@/lib/analytics-data"
import { CHART } from "@/components/analytics/chart-theme"

function barColor(pct: number) {
  if (pct >= 70) return CHART.teal
  if (pct >= 55) return CHART.gold
  return CHART.orange
}

type TooltipPayload = { payload: SectionAgg }

function ChartTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) return null
  const s = payload[0].payload
  return (
    <div className="rounded-[12px] bg-ink px-3 py-2 text-cream-text shadow-feature">
      <p className="font-ui text-[12px] font-semibold">{s.name}</p>
      <p className="font-data text-[12px] text-[#C9BCA6]">
        {s.accuracyPct}% · {s.correct}/{s.attempted} correct
      </p>
    </div>
  )
}

export function SectionPerformanceChart({ sections }: { sections: SectionAgg[] }) {
  const height = Math.max(160, sections.length * 52)

  return (
    <div className="rounded-[20px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-6">
      <p className="eyebrow text-teal-deep">Section-wise performance</p>
      <p className="mt-1 font-ui text-[13px] text-taupe">Accuracy across all attempts</p>

      <div className="mt-5 w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={sections}
            margin={{ top: 0, right: 36, left: 0, bottom: 0 }}
            barCategoryGap={14}
          >
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: CHART.cocoa, fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={150}
            />
            <Tooltip cursor={{ fill: CHART.tealSoft, opacity: 0.4 }} content={<ChartTooltip />} />
            <Bar dataKey="accuracyPct" radius={[6, 6, 6, 6]} barSize={16} background={{ fill: CHART.cream, radius: 6 }}>
              {sections.map((s) => (
                <Cell key={s.name} fill={barColor(s.accuracyPct)} />
              ))}
              <LabelList
                dataKey="accuracyPct"
                position="right"
                formatter={(v) => `${v}%`}
                style={{ fill: CHART.ink, fontSize: 12, fontWeight: 600 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
