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
    <div className="flex-1 flex-col overflow-auto p-6">
      <RegForm />
    </div>
);
}
