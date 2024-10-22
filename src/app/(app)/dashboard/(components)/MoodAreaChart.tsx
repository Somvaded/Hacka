"use client"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
import { useState, useEffect } from "react";

interface MoodAreaChartProps {
  apiData: {
    date: string;
    mood: string;
  }[];
}

// Define full week structure (Sun-Sat)
const fullWeek: { date: string; mood: number | null }[] = [
  { date: "", mood: null }, // Placeholder for Sunday
  { date: "", mood: null }, // Placeholder for Monday
  { date: "", mood: null }, // Placeholder for Tuesday
  { date: "", mood: null }, // Placeholder for Wednesday
  { date: "", mood: null }, // Placeholder for Thursday
  { date: "", mood: null }, // Placeholder for Friday
  { date: "", mood: null }, // Placeholder for Saturday
];

// Convert mood to a numerical value for the chart
const convertMoodToValue = (mood: string) => {
  switch (mood.toLowerCase()) {
    case "happy":
      return 40;
    case "neutral":
      return 30;
    case "sad":
      return 20;
    case "angry":
      return 10;
    default:
      return 0;
  }
};

export function MoodAreaChart({ apiData }: MoodAreaChartProps) {
  const [chartData, setChartData] = useState(fullWeek);

  useEffect(() => {
    // Process the data to fill the full week and merge the mood values
    const processedData = apiData.map((assessment) => {
      const dateObj = new Date(assessment.date);
      return {
        date: dateObj.toLocaleDateString("en-GB", { day: '2-digit', month: 'long' }),
        mood: convertMoodToValue(assessment.mood),
      };
    });

    // Merge API data into the full week structure
    const mergedData = fullWeek.map((weekDay, index) => {
      const match = processedData[index]; // Match the index for each day of the week
      return match ? { ...weekDay, date: match.date, mood: match.mood } : { ...weekDay, date: weekDay.date };
    });

    setChartData(mergedData);
  }, [apiData]); // Dependency on apiData

  const chartConfig = {
    mood: {
      label: "Mood",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mood Chart</CardTitle>
        <CardDescription>Mood changes over the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 30,
              right: 12,
              top: 10,
            }}

          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date" // Changed from "day" to "date"
              // tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 6)} 
            />
    
            <ChartTooltip cursor={false} content={<ChartTooltipContent className="bg-white" indicator="line" />} />
            <Area
              dataKey="mood"
              type="natural"
              fill="var(--color-mood)"
              fillOpacity={0.4}
              stroke="var(--color-mood)"          
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
