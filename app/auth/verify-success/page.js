'use client'

import React from "react";
import { useRouter } from "next/navigation";

export default function VerificationSuccess() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/auth/login"); // Redirect to your login page
  };

  return (
    <div className="bg-white flex h-screen items-center justify-center text-black">
      <div className="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 text-green-600 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-2xl font-bold mb-2">Verification Successful!</h1>
        <p className="mb-4">Your email has been verified successfully.</p>
        <button
          onClick={handleLoginRedirect}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
