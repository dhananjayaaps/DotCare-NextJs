'use client';

import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

// export default function EnterNewPassword() {
const EnterNewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [loading, setLoading] = useState(true); // To handle loading state while verifying token
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Send request to verify the token
        await axios.get(`http://localhost:8080/reset-password/verify?token=${token}`);
        setIsTokenValid(true);  // Token is valid
      } catch (error) {
        setMessage("Invalid or expired token.");
        setIsTokenValid(false);  // Token is invalid
      } finally {
        setLoading(false);  // Stop loading
      }
    };

    if (token) {
      verifyToken();
    } else {
      setMessage("No token provided.");
      setLoading(false);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      await axios.post("http://localhost:8080/reset-password/reset", {
        token,
        password,
        confirmPassword,
      });
      router.push("/auth/reset-success");
    } catch (error) {
      setMessage("Error occurred, please try again.");
    }
  };

  if (loading) {
    return <div className="bg-white h-screen"></div>; // White screen during loading
  }

  return (
    <div className="bg-white flex h-screen items-center justify-center text-black">
      <div>
        {isTokenValid ? (
          <>
            <h1 className="text-2xl font-bold mb-4">Set New Password</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border p-2 w-full"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border p-2 w-full"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded">
                Reset Password
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <img 
              src="https://icons.veryicon.com/png/o/miscellaneous/logo-design-of-lingzhuyun/icon-error-24-1.png" 
              alt="Error Icon" 
              className="h-16 w-16 mb-4"
            />
            <p className="text-red-500 text-lg">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}


const Page = () => (
    <Suspense fallback={<div>Loading...</div>}>
      <EnterNewPassword />
    </Suspense>
);

export default Page;
