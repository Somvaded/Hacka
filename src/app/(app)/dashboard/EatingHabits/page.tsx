'use client'
import { useState } from 'react';
import HabitTable from '../(components)/habitTable';
import TrackerForm from '../(components)/trackerForm';


interface Habit {
  mealType: string,
  mealTime: string;
  food: string;
  rating: number;
  frequency : number;
}
const habits1 : Habit[]  =[
  {
    mealType: 'BreakFast',
    mealTime : '2:11',
    food : "Khaono",
    rating : 1,
    frequency:1,
  },
  {
    mealType: 'BreakFast',
    mealTime : '4:11',
    food : "Khaono",
    rating : 5,
    frequency : 5,
  },
] 


const Home: React.FC = () => {

  return (
    <div className="container mx-auto py-10 px-6">
      <div className='mb-6'><h2 className="text-3xl font-bold mb-6">Top Eating Habits</h2>
      <HabitTable habits1={habits1} />
      </div>
      <h2 className="text-3xl font-bold mb-6">What are you eating right now?</h2>
      <TrackerForm  />
    </div>
  );
};

export default Home;

