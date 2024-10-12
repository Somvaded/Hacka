
import Image from 'next/image';
import React from 'react';
import image from '../app/assets/image.png'
import { Button } from './ui/button';
import Link from 'next/link';

const TopBanner: React.FC = () => {
  return (
    <div style={{height:400, width:'90%' , position:'relative',marginTop:'20px'}}>
      <Image src={image} className='rounded-xl' alt='Image' layout='fill' objectFit='fill'></Image>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-6 text-center">
            Track your child's mental health journey
          </h1>
          <p className="text-sm text-center mb-10 px-10">
            We help parents and kids understand their mental health and wellbeing. Our app makes it easy for kids to track how they feel, learn new coping skills, and get support when they need it.
          </p>
          {/* Buttons */}
          <div className="space-x-4">
            {/* <button className="bg-blue-600 text-white py-2 px-4 rounded-md">
              Sign up
            </button>
            <button className="bg-white text-black py-2 px-4 rounded-md">
              Log in
            </button> */}
            <Button variant='secondary' style={{backgroundColor:'blue', color:'White'}} className='rounded-3xl'><Link href='/signup'>Sign up</Link></Button>
            <Button variant='secondary'  className='rounded-3xl'><Link href='/login'>Log in</Link></Button>
          </div>
        </div>
    </div>
  );
};

export default TopBanner;
