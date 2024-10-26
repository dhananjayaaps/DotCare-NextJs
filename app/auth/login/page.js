'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export default function LogIn() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        alert('Failed to login to account: ' + errorData.message);
        return; // Exit if there's an error
      }

      const { token, roles } = await response.json(); // Use await to parse JSON response
      Cookies.set("jwtToken", token, { expires: 7 });

      console.log("Login successful, token saved in cookies.");
      // alert('Log In successfully');
      Toastify({text: "Log In successfully"}).showToast();

      // Redirect based on roles
      if (roles.includes('ROLE_ADMIN')) {
        router.push('/admin/admins');
      } else if (roles.includes('ROLE_DOCTOR')) {
        router.push('/doctor/appointments');
      } else if (roles.includes('ROLE_MOH')) {
        router.push('/moh/addmother');
      } else if (roles.includes('ROLE_USER')) {
        alert('Contact Admin for the assign roles');
        router.push('/');
      }

      console.log({ roles }); // Log roles for debugging

    } catch (error) {
      console.error(error);
      alert('An error occurred while logging into the account.'+error);
    }
  };

  return (
    <div>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </aside>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <a className="block text-blue-600" href="#">
                <span className="sr-only">Home</span>
                <svg
                  className="h-8 sm:h-10"
                  viewBox="0 0 28 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* SVG content */}
                </svg>
              </a>

              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to DotCare
              </h1>

              <form onSubmit={handleSubmit} className="mt-8 gap-6 pt-10 flex flex-col">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="Username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>

                  <input
                    type="text"
                    id="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="h-10 mt-1 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    required // Make the field required
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <input
                    type="password"
                    id="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="h-10 mt-1 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    required // Make the field required
                  />
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                    type="submit"
                  >
                    Login
                  </button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Already have an account? {' '}
                    <a href="/auth/signup" className="text-gray-700 underline">
                      Sign Up
                    </a>
                    .
                  </p>
                  <br />
                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    <a href="/auth/reset-password" className="text-gray-700 underline">
                      Forgot your password?
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
