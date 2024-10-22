import { NetworkIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { redirect } from 'next/navigation';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-3 px-6 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <NetworkIcon height={15}/>
          <h1 className="text-lg font-bold text-gray-800">Mindful Kids</h1>
        </div>
        <div className="flex space-x-4 items-center">
          {/* <Link href="/">
            <div className="text-gray-800 hover:text-blue-600 font-medium">Sign up</div>
          </Link>
          <Link href="/">
            <div className="text-gray-800 hover:text-blue-600 font-medium">Log in</div>
          </Link> */}
          
          <Button variant='ghost' size='sm'><Link href='/dashboard'>DashBoard</Link></Button>
          <div className="flex items-center space-x-2">
            <UserIcon height={15}/>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
