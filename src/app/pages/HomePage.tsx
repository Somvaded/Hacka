import React from 'react';
import TopBanner from '../../components/topBanner';
import TestimonialsSection from '../../components/TestimonialSection';
import Navbar from '../../components/navbar';


const MindfulKidsPage: React.FC = () => {
  return (
    <div>
    <Navbar/>
    <div className="eight">
      <div className='flex justify-center mt-16'><TopBanner /></div>
      <div className="py-8 text-left">     
        <TestimonialsSection />
      </div>
    </div>
    </div>
  );
};

export default MindfulKidsPage;
