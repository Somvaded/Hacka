"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { signOut, useSession } from 'next-auth/react';
import { User } from '@/model/User';
import { UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';


const UserProfilePage = () => {
//  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const {data : session} = useSession();
  let userId;
  if(session){
	userId = session.user._id
	console.log(session.user._id)
  }
  else{
	// router.push('/')
	console.log("no session")
  }
  // Get userId from route params

  // Fetch user data using axios
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`api/profile?userId=${userId}`);
	//   console.log(response)
      setUser(response.data.data);
	//   console.log(user)
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <div className="flex flex-col mt-8 items-center justify-center">
      <Card className="w-full max-w-md bg-white shadow-xl rounded-lg m-6 ">
        <CardHeader>
          <CardTitle className='flex flex-row'><UserIcon className='m-3 font-bold text-2xl' /><div className='m-3'>User Profile</div></CardTitle>
        </CardHeader>
        <CardContent >
          <div className='flex flex-row my-3'><h2 className='px-4 font-bold text-xl'>Username:</h2><h2 className='font-semibold text-lg'>{user.username}</h2></div>
          <div className='flex flex-row my-3'><h2 className='px-4 font-bold text-xl'>Email:</h2><h2 className='font-semibold text-lg'>{user.email}</h2></div>
          <div className='flex flex-row my-3 '><h2 className='px-4 font-bold text-xl'>Age:</h2><h2 className='font-semibold text-lg'>{user.age}</h2></div>
          <div className='flex flex-row my-3'><h2 className='px-4 font-bold text-xl'>Role:</h2><h2 className='font-semibold text-lg'>{user.role}</h2></div>
          <div className='flex flex-row my-3'><h2 className='px-4 font-bold text-xl'>Gender:</h2><h2 className='font-semibold text-lg'>{user.gender}</h2></div>
          <div className='flex flex-row my-3'><h2 className='px-4 font-bold text-xl'>Is Verified:</h2><h2 className='font-semibold text-lg'>{user.isVerified == true ? "True" : "False" }</h2></div>
	    </CardContent>
      </Card>
	  <Button className='shadow-xl rounded-lg text-lg font-extrabold text-white' onClick={() => signOut({ callbackUrl: '/' })}>Log out</Button>
    </div>
  );
};

export default UserProfilePage;
