"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Full week structure (Sun-Sat)
const fullWeek: { date: string; stressValue: number | null; anxietyValue: number | null }[] = [
  { date: "", stressValue: null, anxietyValue: null }, // Placeholder for Sunday
  { date: "", stressValue: null, anxietyValue: null }, // Placeholder for Monday
  { date: "", stressValue: null, anxietyValue: null }, // Placeholder for Tuesday
  { date: "", stressValue: null, anxietyValue: null }, // Placeholder for Wednesday
  { date: "", stressValue: null, anxietyValue: null }, // Placeholder for Thursday
  { date: "", stressValue: null, anxietyValue: null }, // Placeholder for Friday
  { date: "", stressValue: null, anxietyValue: null }, // Placeholder for Saturday
];

// Define the prop type for the API data
interface StressAnxietyBarChartProps {
  data: {
    date: string;
    stressLevel: number;
    anxietyLevel: number;
  }[];
}

export function StressAnxietyBarChart({ data }: StressAnxietyBarChartProps) {
  // Process the data to fill the full week and merge the stress and anxiety values
  const apiData = data.map((assessment) => {
    const dateObj = new Date(assessment.date);
    return {
      date: dateObj.toLocaleDateString("en-GB", { day: '2-digit', month: 'long' }), // Format to "01 October"
      stressValue: assessment.stressLevel,
      anxietyValue: assessment.anxietyLevel,
    };
  });

  // Merge API data into the full week structure
  const mergedData = fullWeek.map((weekDay, index) => {
    const match = apiData[index]; // Match the index for each day of the week
    return match ? { ...weekDay, date: match.date, stressValue: match.stressValue, anxietyValue: match.anxietyValue } : { ...weekDay, date: weekDay.date };
  });

  const chartConfig = {
    stressValue: {
      label: "Stress",
      color: "hsl(var(--chart-1))",
    },
    anxietyValue: {
      label: "Anxiety",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Stress & Anxiety</CardTitle>
        <CardDescription>Stress and Anxiety levels over the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={mergedData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date" // Changed from "day" to "date"
         
              tickMargin={10}
              axisLine={false}
              // Optional: Customize tick formatting further if needed
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="bg-white" indicator="dashed" />}
            />
            <Bar dataKey="stressValue" fill="var(--color-stressValue)" radius={4} />
            <Bar dataKey="anxietyValue" fill="var(--color-anxietyValue)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
