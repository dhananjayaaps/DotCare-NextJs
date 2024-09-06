'use client';
import { Inter } from "next/font/google";
import NavBar from '@/app/components/NavBar';
import Sidemenu from './sidemenu';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {

  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/auth/getUser`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.success) {
          setLoggedUser(data); // Set user if success is true
          setLoading(false);
        } else {
          router.push('/auth/login'); // Redirect if success is false
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/auth/login'); // Redirect on error
      } 
    };
    fetchData();
    
  }, [router]);

  if (loading) {
    return <div className="flex flex-col w-full h-screen bg-white text-black">Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full h-screen bg-white text-black">
    <NavBar />
    <div className="flex flex-row w-full h-screen bg-white">
      <Sidemenu highlightedItem={'Admin'} loggedUser={loggedUser}/>
      {children}
    </div>
  </div>
  );
}
