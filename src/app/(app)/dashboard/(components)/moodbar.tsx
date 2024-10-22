"use client"
import { Progress } from '@/components/ui/progress';
import React from 'react'

export default function MoodBar({val}:{val:number}){
  return (
	<div >
		<Progress value={val} className='bg-blue-200'/>
	</div>
  );
}
