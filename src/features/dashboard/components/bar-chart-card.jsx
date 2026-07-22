import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/utils/utils";

export function BarChartCard({
  title,
  data = [],
  config,
  dataKey,
  nameKey = "monthName",
  height = 300,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {data?.length === 0 ? (
          <div
            className="flex items-center justify-center text-sm text-muted-foreground"
            style={{ height }}
          >
            No data available
          </div>
        ) : (
          <ChartContainer
            config={config}
            className={cn("aspect-auto w-full", `h-${height}px`)}
            style={{ height }}
          >
            <BarChart
              data={data}
              accessibilityLayer
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={nameKey}
                tickMargin={8}
                tickLine={false}
                axisLine={false}
                minTickGap={32}
              />
              <YAxis tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey={dataKey} radius={4} fill="var(--color-chart-1)" />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
