'use client'
import Image from 'next/image'
// import image from '@/app/assets/mood.png'
import MoodSearchBar from '../(components)/moodSearch'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { MentalHealthTracking } from '@/model/mentalHealthTracking'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast, ToastContainer } from 'react-toastify'
import { useSession } from 'next-auth/react'




const res = {
  "assessments": [
    {
      "date": "2024-10-10T12:34:56Z",
      "mood": "happy",
      "anxietyLevel": 3,
      "stressLevel": 5
    },
    // ... other mock data
  ]
}

export default function EmotionTracker () {
  const {data : session} = useSession();
  const [anxietyLevel, setAnxietyLevel] = useState(0);
  const [stressLevel, setStressLevel] = useState(0);
  const [mood, setMood] = useState(undefined);
  const [logData, setLogData] = useState([{}]); 
  const [error, setError] = useState(null);
  const [sleepQuality, setSleepQuality] = useState(undefined); 
  const [socialInteraction, setSocialInteraction] = useState(undefined); 
  const [isFeelingSafe, setIsFeelingSafe] = useState(true);
  const [additionalNotes, setAdditionalNotes] = useState("");  
  const emotions = ['Happy', 'Sad', 'Angry', 'Neutral'];


  useEffect(() => {
    const fetchData = async () => {
      setLogData(res.assessments); // If the response is not OK, set log data
      return;
      try {
        const response = await axios.get('/api/mental-health-tracking', {
          params: { last7Days: true } // Query parameter for the last 7 days
        });
  
        if (response.status !== 200) {
          console.log("error")
          return;
        }
  
        setLogData(response.data.assessments); // Store the array of assessments
      } catch (err) {
        setError(err.message); // Set error if the request fails
      }
    };
  
    fetchData();
  }, []);
  const postMentalHealthData = async (updatedData) => {
    try {
      const response = await axios.post('/api/posthabit', updatedData, {
        headers: { 'Content-Type': 'application/json' }
      });
      toast.success("Data successfully sent")
      console.log('Data successfully posted', response.data);
    } catch (err) {
      console.error('Failed to post data:', err.message);
    }
  };
  const LogButtonHandler = () => {
    const id = session?.user._id
    console.log(session)
    const updatedData : MentalHealthTracking = {
      userId: id, 
      assessments: [
        {
          date: new Date(), 
          mood : mood.toLowerCase(), // Must be lowercase as per your schema
          anxietyLevel,
          stressLevel,
          socialInteraction : socialInteraction?.toLowerCase(), // Must be lowercase
          sleepQuality : sleepQuality?.toLowerCase(), // Must be lowercase
          isFeelingSafe,
          additionalNotes, // String as needed
        }
      ],
      // createdAt: new Date(),
      // updatedAt: new Date(),
    }
    
    postMentalHealthData(updatedData);
  };
  // Function to handle mood change
  const handleMoodChange = (newMood) => {
    setMood(newMood);
  };

  // Function to handle anxiety level change
  const handleAnxietyChange = (value) => {
    setAnxietyLevel(value[0]);
  };

  // Function to handle stress level change
  const handleStressChange = (value) => {
    setStressLevel(value[0]);
  };

  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h2 className="my-6 mx-4 font-bold text-xl text-gray-800">Mood Log</h2>
      <div className="rounded-md border shadow-md overflow-hidden my-6 bg-white">
        <Table className="w-full text-left">
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Mood</TableHead>
              <TableHead>Anxiety Level</TableHead>
              <TableHead>Stress Level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logData.length > 0 ? (
              logData.map((assessment, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(assessment.date).toLocaleDateString('en-GB')}</TableCell>
                  <TableCell>{assessment.mood}</TableCell>
                  <TableCell>{assessment.anxietyLevel}</TableCell>
                  <TableCell>{assessment.stressLevel}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex flex-col justify-start px-6 mb-6'>
        <h2 className='my-6 font-bold text-xl text-gray-800'>Today's Mood</h2>
        <div className='flex flex-row'>
          {emotions.map((emotion, index) => (
            <Button
              key={index}
              className={`mx-2 rounded-3xl p-4 ${mood === emotion ? 'bg-blue-600 text-white' : 'bg-gray-400'} hover:bg-blue-600`}
              variant='default'
              onClick={() => handleMoodChange(emotion)}
            >
             <h2  className={`${mood === emotion ? 'text-white' : 'text-black'}`}
             > {emotion} </h2>
            </Button>
          ))}
        </div>

        <h2 className='my-6 font-bold text-xl text-gray-800'>Select Anxiety Level</h2>
        <div className='w-full flex items-center '>
          <Slider
            value={[anxietyLevel]}
            min={0}
            max={10}
            step={1}
            onValueChange={handleAnxietyChange}
            className="w-1/2"
          />
          <span className='ml-4 text-lg'>{anxietyLevel}/10</span>
        </div>

        <h2 className='my-6 font-bold text-xl text-gray-800'>Select Stress Level</h2>
        <div className='w-full flex items-center'>
          <Slider
            value={[stressLevel]}
            min={0}
            max={10}
            step={1}
            onValueChange={handleStressChange}
            className="w-1/2"
            
          />
          <span className='ml-4 text-lg'>{stressLevel}/10</span>
        </div>   
        <h2 className='my-6 font-bold text-xl text-gray-800'>Select Sleep Quality</h2>
        <Select  onValueChange={(value) => setSleepQuality(value)} value={sleepQuality}>
          <SelectTrigger  className='shadow w-[280px]'>
            <SelectValue placeholder="Select sleep quality" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="very good">Very Good</SelectItem>
            <SelectItem value="good">Good</SelectItem>
            <SelectItem value="average">Average</SelectItem>
            <SelectItem value="poor">Poor</SelectItem>
          </SelectContent>
        </Select>

        {/* Social Interaction Selector using Select from shadcn */}
        <h2 className='my-6 font-bold text-xl text-gray-800'>Select Social Interaction</h2>
        <div >
        <Select onValueChange={(value) => setSocialInteraction(value)} value={socialInteraction} >
          <SelectTrigger className='shadow w-[280px]'>
            <SelectValue placeholder="Select social interaction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="very social">Very Social</SelectItem>
            <SelectItem value="neutral">Neutral</SelectItem>
            <SelectItem value="withdrawn">Withdrawn</SelectItem>
          </SelectContent>
        </Select>
        </div>
        {/* Feeling Safe Toggle using Switch from shadcn */}
        <h2 className='my-6 font-bold text-xl text-gray-800'>Do you feel safe?</h2>
        <div className="flex items-center space-x-3 ">
          <Label>Yes</Label>
          <Switch checked={isFeelingSafe} onCheckedChange={setIsFeelingSafe} />
          <Label>No</Label>
        </div> 
        <div className="flex flex-col my-4">
        <h2 className='font-bold text-xl text-gray-800 my-2'>Additional Notes</h2>
        <Textarea
          rows={4} // Set the number of rows for the textarea
          className="border rounded-md p-2 w-full" // Add styles as necessary
          placeholder="Write your additional notes here..."
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
        />
    </div>
    <div className='flex justify-center'>
    <Button 
          className="mt-4 bg-blue-600 w-[50%] text-white rounded-lg px-4 py-2" 
          onClick={LogButtonHandler}
        >
         <h2 className='font-bold' >Log</h2> 
        </Button>
        </div>
      </div>
    </div>
  );
}
