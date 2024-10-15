import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';


interface Habit {
  mealTime: string;
  food: string;
  rating: number;
  frequency:number;
}

interface TrackerFormProps {
  addHabit: (habit: Habit) => void;
}

const TrackerForm: React.FC<TrackerFormProps> = ({ addHabit }) => {
  const [mealTime, setMealTime] = useState('');
  const [food, setFood] = useState('');
  const [rating, setRating] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [frequency,setFrequency] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!mealTime || !food || rating === '') {
      setError('Please fill out all fields');
      return;
    }

    addHabit({ mealTime, food, rating: Number(rating), frequency});
    setMealTime('');
    setFood('');
    setRating('');
    setSuccess('Habit successfully added!');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
      {error && <Alert variant="destructive" className="mb-4">{error}</Alert>}
      {success && <Alert variant="default" className="mb-4">{success}</Alert>}

      <div className="flex flex-col">
        <label htmlFor="mealTime" className="text-sm font-medium">Meal Time</label>
        <Input
          type="time"
          id="mealTime"
          value={mealTime}
          onChange={(e) => setMealTime(e.target.value)}
          placeholder="Enter the Meal Time"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="food" className="text-sm font-medium">Food</label>
        <Input
          type="text"
          id="food"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          placeholder="Enter food"
		  pattern="[A-Za-z\s]+"
		  title='Please provide only the name of the food'
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="rating" className="text-sm font-medium">Rating</label>
        <Input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) =>setRating(e.target.value === '' ? '' : (Number(e.target.value)<=10 && Number(e.target.value)>=0 ? Number(e.target.value) : ""))}
          placeholder="Rate from 1 to 10"
		  inputMode='numeric'
        />
      </div>

      <Button type="submit" variant="default" className="mt-4" >Add Meal</Button>
    </form>
  );
};

export default TrackerForm;
