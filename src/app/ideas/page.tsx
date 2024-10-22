import React from 'react';
import { UserCircle, MessageSquare, ArrowDown, ArrowUp } from 'lucide-react';

const page: React.FC = () => {
  return (
    <div className="flex bg-neutral-800 text-gray-300 min-h-screen">
      <div className="w-64 p-4 border-r border-gray-800">
        <div className="flex items-center space-x-2 mb-6">
          <UserCircle size={32} />
          <span className="text-lg font-semibold">User_NAME</span>
        </div>
        <button className="w-full bg-neutral-600 hover:bg-gray-700 text-gray-300 font-bold py-2 px-4 rounded">
          Feel Lucky
        </button>
      </div>

      <div className="flex-grow p-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="bg-neutral-600 rounded-lg p-4 mb-4">
            <h2 className="text-xl font-bold mb-2">Title: Lorem LOREM LOREMLOREM LOREM LOREM</h2>
            <p className="text-sm text-gray-400 mb-2">
              Description: A random test can refer to a variety of tests, including a software testing
              technique, a data analysis test, and a drug testing policy:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-400 mb-2">
              <li>Software testing</li>
              <li>A random test is a software testing technique that involves</li>
            </ul>
            <div className="flex justify-end space-x-4">
              <button className="flex items-center space-x-1 text-gray-500">
                <ArrowDown size={16} />
                <span>56</span>
              </button>
              <button className="text-gray-500">
                <MessageSquare size={16} />
              </button>
              <button className="flex items-center space-x-1 text-gray-500">
                <ArrowUp size={16} />
                <span>65</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="w-64 p-4 border-l border-gray-800">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Filters</h3>
          <div className="flex flex-wrap gap-2">
            <button className="bg-neutral-600 hover:bg-gray-700 text-sm py-1 px-2 rounded">Newest</button>
            <button className="bg-neutral-600 hover:bg-gray-700 text-sm py-1 px-2 rounded">Most Upvote</button>
            <button className="bg-neutral-600 hover:bg-gray-700 text-sm py-1 px-2 rounded">Most Commented</button>
          </div>
        </div>
        <div>
          <h3 className="text-lg bg-neutral-600 text-center rounded font-semibold mb-2">Announcements</h3>
          <p className="text-sm">New Idea Approved Just now, Go check GitHub 🚀</p>
        </div>
      </div>
    </div>
  );
};

export default page;
