'use client';

import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";

const EmailVerify = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Send the verification request
        const response = await axios.get(`${process.env.BACKEND_URL}/auth/verify?token=${token}`);
        
          setMessage("Your email has been successfully verified!");
          setIsError(false);
       
      } catch (error) {
        // Handle error cases like network issues or non-200 status
        if (error.response) {
          setMessage("Invalid or expired token, please try again.");
        } else {
          setMessage("An error occurred, please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    };
  
    // Run token verification if the token exists
    if (token) {
      verifyToken();
    }
  }, [token]);
  

  return (
    <div className="bg-white flex h-screen items-center justify-center text-black">
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className={`text-center p-4 rounded ${isError ? "bg-red-100 text-red-500" : "bg-green-100 text-green-500"}`}>
            {isError ? (
              <img
                src="https://icons.veryicon.com/png/o/miscellaneous/logo-design-of-lingzhuyun/icon-error-24-1.png"
                alt="Error Icon"
                className="mx-auto mb-4 h-12 w-12"
              />
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1 className="text-2xl font-bold">{message}</h1>

                {/* Show the login button on success */}
                <button 
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => router.push('/auth/login')}
                >
                  Go to Login
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Wrap the component in a Suspense boundary
const Page = () => (
    <Suspense fallback={<div>Loading...</div>}>
      <EmailVerify />
    </Suspense>
);

export default Page;
