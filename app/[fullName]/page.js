"use client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import Image from 'next/image';


export default function fullName() {

    const { isLoaded, isSignedIn, user } = useUser();
  
    if (!isLoaded || !isSignedIn) {
      return null;
    }

    const [activeTab, setActiveTab] = useState('workshops');

    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };

    const sampleWorkshop = Array(5).fill({ title: 'Workshop' , description: 'Sample description of the Workshops Attended' });
    const sampleProject = Array(5).fill({ title: 'Project', description: 'Sample description of the Projects made.' });


  
    return (
         <div className="min-h-screen bg-white flex flex-col items-center p-4 text-black">
         <div className="flex flex-col items-center">
           <div className="rounded-full overflow-hidden w-32 h-32">
           <Image
      src="https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small_2x/user-profile-icon-free-vector.jpg"
      width={500}
      height={500}
      alt="Picture of the author"
    />
           </div>
           <h1 className="mt-4 text-2xl font-bold">{user.fullName} </h1>
         </div>
   
         <div className="flex flex-wrap justify-center mt-4">
           {['0XWRKSHP', '0XPRJCT', '0XEVNT'].map((chip, index) => (
             <span key={index} className="m-1 px-4 py-1 rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
               {chip}
             </span>
           ))}
         </div>
   
         <div className="w-full max-w-2xl border-t border-gray-300 my-8"></div>
   
         <div className="w-full max-w-2xl">
           <div className="flex justify-center mb-4">
             <button
               className={`px-4 py-2 mx-2 ${activeTab === 'workshops' ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}
               onClick={() => handleTabClick('workshops')}
             >
               Workshops
             </button>
             <button
               className={`px-4 py-2 mx-2 ${activeTab === 'projects' ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}
               onClick={() => handleTabClick('projects')}
             >
               Projects
             </button>
           </div>
   
           {activeTab === 'workshops' && (
             <div className="grid grid-cols-1 gap-4">
               {sampleWorkshop.map((item, index) => (
                 <div key={index} className="p-4 border rounded-lg shadow-sm">
                   <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                   <p>{item.description}</p>
                 </div>
               ))}
             </div>
           )}
   
           {activeTab === 'projects' && (
             <div className="grid grid-cols-1 gap-4">
               {sampleProject.map((item, index) => (
                 <div key={index} className="p-4 border rounded-lg shadow-sm">
                   <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                   <p>{item.description}</p>
                 </div>
               ))}
             </div>
           )}
         </div>
       </div>
     );
    }
    