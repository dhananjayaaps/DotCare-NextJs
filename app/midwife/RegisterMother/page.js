'use client';
import React, { useState } from 'react';
import Sidemenu from '../../components/sidemenu';
import NavBar from '@/app/components/NavBar';
import { Button } from '@nextui-org/react';
import RegForm from './regForm';

export default function Mother() {

  const [userData, setUserData] = useState(null);

  const handleCheckUser = () => {
    // Dummy data for demonstration
    const dummyData = {
      name: "John Doe",
      nic: "123456789V",
      email: "john.doe@example.com",
    };
    setUserData(dummyData);
  };

  return (
    <div className="flex flex-col w-full h-screen bg-white text-black">
      <NavBar />
      <div className="flex flex-row w-full h-screen bg-white">
        <Sidemenu highlightedItem={'mother'} />
        <div className="flex-1 flex-col overflow-auto p-6">
          <RegForm />
          
        </div>
      </div>
    </div>
  );
}
