"use client";
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Meal {
  mealType : string;
  mealTime: string;
  food: string;
  rating: number;
  frequency: number;
}

// Zod schema for form validation
const habitSchema = z.object({
  mealTime: z.string().min(1, { message: 'Meal Time is required' }),
  food: z.string().min(1, { message: 'Food is required' }).regex(/[A-Za-z\s]+/, {
    message: 'Food must contain only letters and spaces',
  }),
  rating: z
    .number({ invalid_type_error: 'Rating is required' })
    .min(1, 'Rating must be at least 1')
    .max(10, 'Rating cannot exceed 10'),
});

// Form component for each meal
const MealForm = ({ mealType }: { mealType: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Meal>({
    resolver: zodResolver(habitSchema),
    defaultValues: {
      mealType: mealType,
      mealTime: '',
      food: '',
      rating: 1,
    },
  });

  const onSubmit = async (data: Meal) => {
    try {
      data.mealType=mealType
      console.log(data);
      toast.success(`${mealType} Added Successfully`);
      reset(); // Reset form after successful submission
    return
      const response = await fetch('/api/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to add meal');
      }
      const result = await response.json();
      
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error('Error adding meal:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mb-6">
      <h2 className='font-bold'>{mealType}</h2>
      
      {errors && Object.values(errors).map((err) => (
        <Alert key={err.message} variant="destructive" className="mb-4">
          {err.message}
        </Alert>
      ))}

      <div className="flex flex-col">
        <label htmlFor="mealTime" className="text-sm font-medium">Meal Time</label>
        <Input
          type="time"
          id="mealTime"
          {...register('mealTime')}
        />
        {errors.mealTime && <p className="text-red-500">{errors.mealTime.message}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="food" className="text-sm font-medium">Food</label>
        <Input
          type="text"
          id="food"
          {...register('food')}
          placeholder="Enter food"
        />
        {errors.food && <p className="text-red-500">{errors.food.message}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="rating" className="text-sm font-medium">Rating</label>
        <Input
          type="number"
          id="rating"
          {...register('rating', { valueAsNumber: true })}
          placeholder="Rate from 1 to 10"
        />
        {errors.rating && <p className="text-red-500">{errors.rating.message}</p>}
      </div>

      <Button type="submit" variant="default" className="mt-4" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : `Add ${mealType}`}
      </Button>
    </form>
  );
};

const TrackerForm = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-8'>
      <MealForm mealType="Breakfast" />
      <MealForm mealType="Lunch" />
      <MealForm mealType="Dinner" />
      <MealForm mealType="Snacks" />
      <ToastContainer/>
    </div>
  );
};

export default TrackerForm;
