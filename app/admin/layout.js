'use client';
import { Inter } from "next/font/google";
import NavBar from '@/app/components/NavBar';
import Sidemenu from '../components/sidemenu';
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
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
