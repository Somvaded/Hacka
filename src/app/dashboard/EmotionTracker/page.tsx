'use client'
import Image from 'next/image'
import image from '@/app/assets/image.png'
import MoodSearchBar from '../(components)/moodSearch'
import { Button } from '@/components/ui/button'
import { Smile } from 'lucide-react'

const emotions = [
	"Happy",
	"Sad",
	"Anxious",
	"Calm",
	"Angry"
]
const previousEmotiontrack=[
	{first:"Today",second:"Happy"},
	{first:"Yesterday" , second:"Sad"},
	{first:"10:00",second: "Anxious" }
]

export default function EmotionTracker (){
  return (
	<div>
	<div className='flex justify-center' >
		<div style={{height:400 , width:'80%' , position:'relative'}}>
		<Image src={image} alt='emotion tracker image' className='rounded-xl'  layout='fill' objectFit='fill'>
		</Image>
		<div style={{position:'absolute' , left:'5%' , bottom:'20%', color:'white' }}>
				<h2 className='font-bold text-5xl'>Hi, Isabella</h2>
				<h2 className='my-4'>How are you feeling today?</h2>
			   <MoodSearchBar/>
			</div>
		<div>

		</div>
	</div>
	</div>
	<div className='flex flex-col justify-start' style={{marginLeft:'10%'}}>
	<h2 className='my-6 font-bold text-xl'>Today's Mood</h2>
	<div className='flex flex-row'>
		{emotions.map((x , index) =>(
			<Button  className='mx-2 bg-gray-300 text-black rounded-3xl p-4 hover:text-white' key={index} variant='default'>{x}</Button>
		))}
	</div>
	<h2 className='my-6 font-bold text-xl'>
		Daily Log
	</h2>
	<div className='flex flex-col'>
		{
			previousEmotiontrack.map((x)=>(
				<div className='flex flex-col mb-6'>
					<div className='flex flex-row'><Smile size={20} className='mr-9 mt-2'/> <h2 className='text-lg font-medium'>{x.first}</h2></div>
					<div className='ml-14'><h3 className='text-sm'>{x.second}</h3></div>
				</div>
			))
		}
	</div>
</div>
</div>
  )
}
