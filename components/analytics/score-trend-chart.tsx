"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import type { TrendPoint } from "@/lib/analytics-data"
import { CHART } from "@/components/analytics/chart-theme"

type Metric = "score" | "accuracy"

const META: Record<Metric, { label: string; eyebrow: string; suffix: string }> = {
  score: { label: "Score", eyebrow: "Score trend", suffix: "%" },
  accuracy: { label: "Accuracy", eyebrow: "Accuracy trend", suffix: "%" },
}

type TooltipPayload = { value: number; payload: TrendPoint }

function ChartTooltip({
  active,
  payload,
  metric,
}: {
  active?: boolean
  payload?: TooltipPayload[]
  metric: Metric
}) {
  if (!active || !payload?.length) return null
  const p = payload[0].payload
  return (
    <div className="rounded-[12px] bg-ink px-3 py-2 text-cream-text shadow-feature">
      <p className="font-data text-[13px] font-semibold tracking-[-0.02em]">
        {payload[0].value}
        {META[metric].suffix}
      </p>
      <p className="font-ui text-[11px] text-[#C9BCA6]">
        {p.label} · {p.percentile}th percentile
      </p>
    </div>
  )
}

export function ScoreTrendChart({
  data,
  metric = "score",
}: {
  data: TrendPoint[]
  metric?: Metric
}) {
  const latest = data[data.length - 1]?.[metric] ?? 0
  const first = data[0]?.[metric] ?? 0
  const delta = latest - first
  const gradId = `grad-${metric}`

  return (
    <div className="rounded-[20px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="eyebrow text-teal-deep">{META[metric].eyebrow}</p>
          <p className="mt-1 font-ui text-[13px] text-taupe">Last {data.length} attempts</p>
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

      <div className="mt-5 h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 6, left: -22, bottom: 0 }}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART.teal} stopOpacity={0.28} />
                <stop offset="100%" stopColor={CHART.teal} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART.line} strokeDasharray="3 4" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: CHART.taupe, fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: CHART.line }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: CHART.taupe, fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={40}
            />
            <Tooltip
              cursor={{ stroke: CHART.teal, strokeWidth: 1, strokeDasharray: "3 3" }}
              content={<ChartTooltip metric={metric} />}
            />
            <Area
              type="monotone"
              dataKey={metric}
              stroke={CHART.teal}
              strokeWidth={2.5}
              fill={`url(#${gradId})`}
              dot={{ fill: CHART.surface, stroke: CHART.teal, strokeWidth: 2, r: 3 }}
              activeDot={{ fill: CHART.teal, stroke: CHART.surface, strokeWidth: 2, r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
