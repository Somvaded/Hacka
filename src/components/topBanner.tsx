import Image from 'next/image';
import React from 'react';
import image from '../app/assets/image.png';
import { Button } from './ui/button';
import Link from 'next/link';

const TopBanner: React.FC = () => {
  return (
    <div style={{ height: 400, width: '90%', position: 'relative', marginTop: '20px' }}>
      <Image
        src={image}
        className={`rounded-xl animate-fade-in-up `} // Use animation class for image
        alt='Image'
        layout='fill'
        objectFit='fill'
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h2 className={`m-4 text-2xl lg:text-5xl md:text-2xl font-bold mb-6 text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] animate-fade-in-down `}>
          Track your child's mental health journey
        </h2>
        <div className="space-x-4">
          <Button variant='secondary' style={{ backgroundColor: 'blue', color: 'White' }} className='rounded-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] animate-fade-in-down '>
            <Link href='/signup'>Sign up</Link>
          </Button>
          <Button variant='secondary' className='rounded-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] animate-fade-in-down '>
            <Link href='/login'>Log in</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
