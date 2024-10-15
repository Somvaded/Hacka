import { MoodAreaChart } from "./(components)/MoodAreaChart";
import  MoodBar  from "./(components)/moodbar";


const chartData = [                            // excited - 6
	// happy - 5
{ day: "Sun", mood: 30 },              //calm -4
{day: "Mon", mood: 30},                 //neutral 3
{ day: "Tue", mood: 20},             //anxious - 2
{ day: "Wed", mood: 10 },                //sad - 1                                        
{ day: "Thur", mood: 0 },               //angry - 0
{ day: "Fri", mood: 40},
{ day: "Sat", mood: 60 },
]
let moodData=0;
for (let index = 0; index < chartData.length; index++) {
	moodData += chartData[index].mood;
}
const averageMood = moodData/7;
export default function Home() {
	return (
		<div className="flex flex-col justify-start mx-11">
			<div className="relative">
				<h2 className="font-extrabold text-2xl py-4">Your Mood dashboard</h2>
				<h1 className="font-bold text-xl pb-6">Mood</h1>
				<div>
					<MoodAreaChart/>
				</div>
				<h1 className="font-bold text-xl pt-7 ">Your are currently feeling</h1>
				<div className="py-3">
				<MoodBar val={averageMood} />
				</div>
				<h3>{Math.floor((averageMood/60)*100)}% Happy and {100-Math.floor((averageMood/60)*100)}% Sad </h3>
				<h2 className="font-extrabold text-xl py-4">Insights</h2>
			</div>
		</div>
	);
  }
  