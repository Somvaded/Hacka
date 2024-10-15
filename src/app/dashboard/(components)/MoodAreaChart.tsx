"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartData = [                            // excited - 70
	                                        // happy - 60
  { day: "Sun", mood: 40 },              //calm -50
  {day: "Mon", mood: 40},                 //neutral 40
  { day: "Tue", mood: 30},             //anxious - 30
  { day: "Wed", mood: 20 },                //sad - 20                                        
  { day: "Thur", mood: 5 },               //angry - 10
  { day: "Fri", mood: 50},
  { day: "Sat", mood: 70 },
]

const chartConfig = {
  mood: {
    label: "Mood",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function MoodAreaChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mood Chart</CardTitle>
        <CardDescription>
          Mood changes over past week
        </CardDescription>
      </CardHeader>
      <CardContent >
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
		   style={{}}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line"  />}
            />
            <Area
              dataKey="mood"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}
