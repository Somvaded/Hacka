"use client"
import { TableHeader, TableRow, TableCell, TableBody, Table, TableHead } from "@/components/ui/table";
import { useEffect, useState } from "react";

interface Habit {
  mealType: string,
  mealTime: string;
  food: string;
  rating: number;
  frequency: number;
}
interface HabitTableProps {
	habits1: Habit[];
  }
const HabitTable: React.FC<HabitTableProps> = ({habits1}) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Fetch habits from the API
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetch("/api/habits"); // Update the URL as per your API endpoint
        if (!response.ok) {
			setHabits(habits1)
			return
          throw new Error("Failed to fetch habits");
        }
        const data: Habit[] = await response.json();
        setHabits(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
    setMounted(true);
  }, []);

  // Sort habits by frequency in descending order and get top 5
  const sortedHabits = [...habits].sort((a, b) => b.frequency - a.frequency);
  const topHabits = sortedHabits.slice(0, 5);

  // Ensuring that the component is mounted before rendering to avoid hydration errors
  if (!mounted) {
    return null;
  }

  if (loading) {
    return <div>Loading habits...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="rounded-md border shadow-md overflow-hidden">
      <Table className="min-w-full bg-white">
        <TableHeader>
          <TableRow>
          <TableHead className="font-semibold ml-6">Meal Type</TableHead>
            <TableHead className="font-semibold ml-6">Meal Time</TableHead>
            <TableHead className="font-semibold">Food</TableHead>
            <TableHead className="font-semibold text-right mr-6">Rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topHabits.length > 0 ? (
            topHabits.map((habit, index) => (
              <TableRow key={index} className="border-t">
                <TableCell className="ml-6">{habit.mealType}</TableCell>
                <TableCell>{habit.mealTime}</TableCell>
                <TableCell>{habit.food}</TableCell>
                <TableCell className="text-right mr-6">{habit.rating}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-4">
                No habits tracked yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default HabitTable;
