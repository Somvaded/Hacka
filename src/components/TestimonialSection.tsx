import React from 'react';
import { ThumbsUpIcon , ThumbsDownIcon, Icon } from 'lucide-react';
interface Testimonial {
  name: string;
  date: string;
  review: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Debbie H.',
    date: 'Apr 3, 2022',
    review: "Mindful Kids is fantastic! My daughter loves the activities and I love the parent dashboard. It's so easy to see how she's doing and what she's learning. I've already recommended it to all my friends!",
    rating: 5,
  },
  {
    name: 'Drew S.',
    date: 'Mar 25, 2022',
    review: "This app has been a game changer for our family. My son is more aware of his emotions and better able to express himself. The content is top-notch and the user experience is great. Highly recommend!",
    rating: 5,
  },
  {
    name: 'Jessica T.',
    date: 'Mar 14, 2022',
    review: "My kids have been using Mindful Kids for a few weeks and it's been amazing to see their progress. The activities are engaging and the tracker helps them understand how their emotions change throughout the day.",
    rating: 5,
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4 mt-2">
       <h2 className="ms-8 text-2xl font-bold mb-10">Why parents and kids love Mindful Kids</h2>
       <h2 className="ms-8 text-xl font-bold">What parents are saying</h2>
      {testimonials.map((testimonial, index) => (
        <div className="p-8 mb-6 rounded-lg " key={index}>
          <div className="flex mb-2">
            <h2 className="font-bold text-lg">{testimonial.name}</h2>
            
          </div>
          <div className="flex mb-2">
            
            <h3 className="text-sm text-gray-500">{testimonial.date}</h3>
          </div>
          <div className="flex text-yellow-500 mb-2">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <span key={i}>⭐</span>
            ))}
          </div>
          <div className='text-left '><h2 className='text-lg'>{testimonial.review}</h2></div>
          {/* <div className='flex mt-2'>
          <button className='mr-7'><ThumbsUpIcon size={20}></ThumbsUpIcon></button>
          <button><ThumbsDownIcon size={20}></ThumbsDownIcon></button>
        </div> */}
        </div>
      ))}
    </div>
  );
};

export default TestimonialsSection;
