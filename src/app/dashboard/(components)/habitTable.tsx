import { TableHeader, TableRow, TableCell, TableBody, Table, TableHead } from "@/components/ui/table";
import { useEffect, useState } from "react";



interface Habit {
  mealTime: string;
  food: string;
  rating: number;
  frequency: number;
}

interface HabitTableProps {
  habits: Habit[];
}

const HabitTable: React.FC<HabitTableProps> = ({ habits }) => {
	const [mounted, setMounted] = useState(false);
    // Sort habits by rating in descending order (highest rating first)
	const sortedHabits = [...habits].sort((a, b) => b.frequency - a.frequency);

	// Get only the top 5 habits
	const topHabits = sortedHabits.slice(0, 5);
	// Ensuring that the component is mounted before rendering to avoid hydration errors
	useEffect(() => {
	  setMounted(true);
	}, []);
  
	if (!mounted) {
	  return null;
	}
  
	return (
	  <div className="rounded-md border shadow-md overflow-hidden">
		<Table className="min-w-full bg-white">
		  <TableHeader>
			<TableRow>
			  <TableHead  className="font-semibold ml-6">Meal Time</TableHead>
			  <TableHead  className="font-semibold ">Food</TableHead>
			  <TableHead  className="font-semibold text-right mr-6">Rating</TableHead>

			</TableRow>
		  </TableHeader>
		  <TableBody >
			{topHabits.length > 0 ? (
			  topHabits.map((habit, index) => (
				<TableRow key={index} className="border-t" >
				  <TableCell className="ml-6">{habit.mealTime}</TableCell>
				  <TableCell>{habit.food}</TableCell>
				  <TableCell className="text-right mr-6">{habit.rating}</TableCell>
				</TableRow>
			  ))
			) : (
			  <TableRow>
				<TableCell colSpan={3} className="text-center py-4">No habits tracked yet</TableCell>
			  </TableRow>
			)}
		  </TableBody>
		</Table>
	  </div>
	);
  };
export default HabitTable;
