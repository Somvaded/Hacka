'use client'
import { useState } from 'react';
import HabitTable from '../(components)/habitTable';
import TrackerForm from '../(components)/trackerForm';


interface Habit {
  mealTime: string;
  food: string;
  rating: number;
  frequency : number;
}
const habits1 : Habit[] =[
  {
    mealTime : '2:11',
    food : "Khaono",
    rating : 1,
    frequency:1,
  },
  {
    mealTime : '4:11',
    food : "Khaono",
    rating : 5,
    frequency : 5,
  },
] 
const Home: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  
  const addHabit = (habit: Habit) => {
    setHabits([...habits, habit]);
  };

  return (
    <div className="container mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold mb-6">What are you eating right now?</h2>
      <TrackerForm addHabit={addHabit} />
      <h2 className="text-3xl font-bold mb-6">Top Eating Habits</h2>

      <HabitTable habits={habits1} />
    </div>
  );
};

export default Home;

