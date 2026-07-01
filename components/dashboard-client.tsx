"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Activity, Banknote, Gauge, PiggyBank, RadioTower, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currency, numberFormat } from "@/lib/utils";
import type { AiRequestLog } from "@/lib/types";

type DashboardPayload = {
  totals: {
    requests: number;
    tokens: number;
    spend: number;
    savings: number;
    cacheHitRate: number;
    avgCost: number;
  };
  charts: {
    requestSeries: { day: string; requests: number; spend: number }[];
    spendByModel: { model: string; spend: number }[];
    usageByModel: { model: string; requests: number }[];
  };
  recentRequests: AiRequestLog[];
};

const colors = ["#3b82f6", "#14b8a6", "#94a3b8"];

export function DashboardClient() {
  const [payload, setPayload] = useState<DashboardPayload | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((response) => response.json())
      .then(setPayload)
      .catch(() => setPayload(null));
  }, []);

  if (!payload) {
    return <div className="rounded-lg border border-white/10 bg-white/5 p-10 text-muted-foreground">Loading dashboard...</div>;
  }

  const widgets = [
    [RadioTower, "Total Requests", numberFormat(payload.totals.requests)],
    [Activity, "Total Tokens", numberFormat(payload.totals.tokens)],
    [Banknote, "Estimated Spend", currency(payload.totals.spend)],
    [PiggyBank, "Estimated Savings", currency(payload.totals.savings)],
    [Gauge, "Cache Hit Rate", `${payload.totals.cacheHitRate}%`],
    [Timer, "Avg Cost / Request", currency(payload.totals.avgCost)]
  ];

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        {widgets.map(([Icon, label, value]) => (
          <Card key={label as string}>
            <CardHeader className="pb-3">
              <Icon className="h-5 w-5 text-blue-300" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-white">{value as string}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">{label as string}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Requests over time</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={payload.charts.requestSeries}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: "#0b111d", border: "1px solid rgba(255,255,255,.12)" }} />
                <Line type="monotone" dataKey="requests" stroke="#3b82f6" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Spend by model</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={payload.charts.spendByModel} dataKey="spend" nameKey="model" innerRadius={70} outerRadius={105} paddingAngle={4}>
                  {payload.charts.spendByModel.map((entry, index) => (
                    <Cell key={entry.model} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#0b111d", border: "1px solid rgba(255,255,255,.12)" }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <Card>
          <CardHeader>
            <CardTitle>Model Usage</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={payload.charts.usageByModel}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="model" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: "#0b111d", border: "1px solid rgba(255,255,255,.12)" }} />
                <Bar dataKey="requests" fill="#14b8a6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Requests</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                <tr className="border-b border-white/10">
                  <th className="py-3">Timestamp</th>
                  <th>Task</th>
                  <th>Model</th>
                  <th>Tokens</th>
                  <th>Cost</th>
                  <th>Cache</th>
                </tr>
              </thead>
              <tbody>
                {payload.recentRequests.map((request) => (
                  <tr key={request.id} className="border-b border-white/8 text-slate-200">
                    <td className="py-3 text-muted-foreground">{new Date(request.created_at).toLocaleTimeString()}</td>
                    <td>{request.task_type}</td>
                    <td>{request.model}</td>
                    <td>{numberFormat(request.total_tokens)}</td>
                    <td>{currency(request.estimated_cost)}</td>
                    <td>
                      <Badge className={request.cache_hit ? "text-emerald-200" : ""}>{request.cache_hit ? "hit" : "miss"}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
