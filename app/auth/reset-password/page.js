'use client'

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RequestReset() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state to disable button
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when the request is submitted
    try {
      await axios.post(`${process.env.BACKEND_URL}/reset-password/request`, { email });
      setMessage("Check your email for a reset link.");
    } catch (error) {
      setMessage("Error occurred, please try again.");
    } finally {
      setIsLoading(false); // Set loading to false once the request completes
    }
  };

  return (
    <div className="bg-white flex h-screen items-center justify-center text-black">
      <div>
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 w-full"
          />
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading} // Disable the button when isLoading is true
          >
            {isLoading ? "Processing..." : "Request Reset"}
          </button>
        </form>
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </div>
    </div>
  );
}
