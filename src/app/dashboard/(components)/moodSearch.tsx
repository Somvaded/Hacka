'use client';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';

export default function MoodSearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Define available moods
  const moods = [
    { mood: 'Happy', icon: '😊' },
    { mood: 'Sad', icon: '😢' },
    { mood: 'Excited', icon: '😄' },
    { mood: 'Angry', icon: '😡' },
    { mood: 'Loved', icon: '❤️' },
    { mood: 'Anxious', icon: '😰' },
    { mood: 'Neutral', icon: '😐' },
  ];

  const filteredMoods = moods.filter(({ mood }) =>
    mood.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const formRef = useRef<HTMLDivElement | null>(null); 
  useEffect(()=>{
	
    function handleClick(event: MouseEvent) {
		if(formRef.current && !formRef.current.contains(event.target as Node)){
			setIsDropdownOpen(false);
		}
    }
	window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  },[formRef])
  
  return (
    <div className="flex justify-center">
      <div className="relative w-full max-w-md" ref={formRef}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsDropdownOpen(true)}
          placeholder="Select your mood"
          className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
		  
        />

        {isDropdownOpen && filteredMoods.length > 0 && (
          <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredMoods.map(({ mood, icon }) => (
              <li
                key={mood}
                className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setSearchTerm(mood); 
                  setIsDropdownOpen(false); 
                }}
              >
                <span className="mr-2 text-black">{icon}{mood}</span>
              </li>
            ))}
          </ul>
        )}

        {/* If no moods match */}
        {isDropdownOpen && filteredMoods.length === 0 && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg p-4 text-center text-gray-500">
            No moods found.
          </div>
        )}
      </div>
	  <Button variant='default' className='ml-2 rounded-lg bg-blue-500 text-white' onClick={()=>setSearchTerm('')}>Log</Button>
    </div>
  );
}
