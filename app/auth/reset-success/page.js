'use client'
import React from "react";
import { useRouter } from "next/navigation";

export default function ResetSuccess() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/auth/login");  // Assuming you have a login page
  };

  return (
    <div className="bg-white flex h-screen items-center justify-center text-black">
      <div>
        <div className="bg-white flex flex-col items-center space-y-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-28 w-28 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-4xl font-bold text-black">Password Reset Successful!</h1>
          <p>Your password has been successfully reset. You can now log in.</p>
          <button
            onClick={handleLoginRedirect}
            className="inline-flex items-center rounded border border-indigo-600 bg-white px-4 py-2 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring">
            <span className="text-sm font-medium"> Login </span>
          </button>
        </div>
      </div>
    </div>
  );
}
