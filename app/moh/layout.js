'use client';
import { Inter } from "next/font/google";
import NavBar from '@/app/components/NavBar';
import Sidemenu from './sidemenu';
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {

  const [isLogged, setIsLogged] = useState(false);


  useEffect(() => {
    const cookies =  cookies().getAll()
    console.log(cookies);
    const token = cookies.jwtToken;
    console.log("value is " + token);
    if (token) {
      setIsLogged(true);
    } else {
      //navigate to login
      setIsLogged(false);
      // redirect(`/auth/login`)
      
    }
  }, []);

  // if (!isLogged){
  //   return (
  //     <div className="flex flex-col w-full h-screen bg-white text-black">
  //       loading
  //     </div>
  //   );
  // }

  
  return (
    <div className="flex flex-col w-full h-screen bg-white text-black">
    <NavBar />
    <div className="flex flex-row w-full h-screen bg-white">
      <Sidemenu highlightedItem={'Admin'}/>
      {children}
    </div>
  </div>
  );
}
