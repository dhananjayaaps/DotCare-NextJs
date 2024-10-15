'use client'

import React from "react";

export default function OtpSentSuccess() {
  return (
    <div className="bg-white flex h-screen items-center justify-center text-black">
      <div className="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-28 w-28 text-green-600 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-4xl font-bold mb-4">OTP Sent Successfully!</h1>
        <p className="text-lg">
          We have sent a one-time password (OTP) to your registered email address.
          Please check your inbox and follow the instructions to verify your email.
        </p>
        <p className="mt-4">Didn&apos;t receive the email? Check your spam folder or try again.</p>

        {/* <a
          href="/auth/request-reset"
          className="inline-flex items-center mt-6 rounded border border-indigo-600 bg-white-600 px-4 py-2 hover:bg-gray-200 focus:outline-none focus:ring"
        > */}
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg> */}
          {/* <span className="text-sm font-medium">Back to Request Page</span> */}
        {/* </a> */}
      </div>
    </div>
  );
}
