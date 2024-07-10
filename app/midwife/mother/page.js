'use client';
import React, { useState } from 'react';
import Sidemenu from '../../components/sidemenu';
import NavBar from '@/app/components/NavBar';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';

export default function Mother() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  const router = useRouter();

  const handleNavigation = () => {
    router.push('/midwife/RegisterMother');
  };

  return (
    <div className="flex flex-col w-full h-screen bg-white text-black">
      <NavBar />
      <div className="flex flex-row w-full h-screen bg-white">
        <Sidemenu highlightedItem={'mother'} />
        <div className="flex-1 flex-col overflow-auto p-6">
          <div className="bg-gray-100">
            <div className="w-full text-black bg-main-color">
              <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
                <div className="p-4 flex flex-row items-center justify-between">
                  <a href="#" className="text-lg font-semibold tracking-widest uppercase rounded-lg focus:outline-none focus:shadow-outline">
                    Sapuni Muthunika profile
                  </a>
                  <button className="md:hidden rounded-lg focus:outline-none focus:shadow-outline" onClick={() => setShowAddDialog(!showAddDialog)}>
                    <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                      <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"></path>
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </button>
                </div>
                <nav className={`flex-col flex-grow pb-4 md:pb-0 ${showAddDialog ? 'flex' : 'hidden'} md:flex md:justify-end md:flex-row`}>
                  <div className="relative">
                    <div className={`absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48 ${showAddDialog ? 'block' : 'hidden'}`}>
                      <div className="py-2 bg-white text-blue-800 text-sm rounded-sm border border-main-color shadow-sm">
                        <a className="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
                          Settings
                        </a>
                        <a className="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
                          Help
                        </a>
                        <div className="border-b"></div>
                        <a className="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
                          Logout
                        </a>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
            <div className="container mx-auto my-5 p-5">
              <div className="md:flex no-wrap md:-mx-2">
                <div className="w-full md:w-3/12 md:mx-2">
                  <div className="bg-white p-3 border-t-4 border-green-400">
                    <div className="image overflow-hidden">
                      <img className="h-auto w-full mx-auto" src="https://media.istockphoto.com/id/1185367863/photo/smiling-business-woman-portrait.jpg?s=612x612&w=0&k=20&c=i19PDtTroZB0r1K1MmWARhdfQ4NHoTYB7SDyDn8W09I=" alt="Profile" />
                    </div>
                    <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">Jane Doe</h1>
                    <h3 className="text-gray-600 font-lg text-semibold leading-6">Owner at Her Company Inc.</h3>
                    <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt
                    </p>
                    <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                      <li className="flex items-center py-3">
                        <span>Status</span>
                        <span className="ml-auto">
                          <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span>
                        </span>
                      </li>
                      <li className="flex items-center py-3">
                        <span>Member since</span>
                        <span className="ml-auto">Nov 07, 2016</span>
                      </li>
                    </ul>
                  </div>
                  <div className="my-4"></div>
                  <div className="bg-white p-3 hover:shadow">
                    <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                      <span className="text-green-500">
                        <svg className="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857M12 14v6m0 0H7m5 0h5M12 8c.96 0 1.857.314 2.581.845M12 5a7 7 0 00-7 7v2.168A7.007 7.007 0 0112 8zm0-3a10 10 0 0110 10v2.168a7.007 7.007 0 00-7 0V10a10 10 0 00-10 10h2a8 8 0 018-8z" />
                        </svg>
                      </span>
                      <span>Similar Profiles</span>
                    </div>
                    <div className="grid grid-cols-3">
                      <div className="text-center my-2">
                        <img className="h-16 w-16 rounded-full mx-auto" src="https://avatars.com/avatar-1.jpg" alt="" />
                        <a href="#" className="text-main-color">John Doe</a>
                      </div>
                      <div className="text-center my-2">
                        <img className="h-16 w-16 rounded-full mx-auto" src="https://avatars.com/avatar-2.jpg" alt="" />
                        <a href="#" className="text-main-color">Jane Smith</a>
                      </div>
                      <div className="text-center my-2">
                        <img className="h-16 w-16 rounded-full mx-auto" src="https://avatars.com/avatar-3.jpg" alt="" />
                        <a href="#" className="text-main-color">Bob Johnson</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-9/12 mx-2 h-64">
                  <div className="bg-white p-3 shadow-sm rounded-sm">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                      <span clas="text-green-500">
                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 7v-4M5.236 16.707A1 1 0 005 16h14a1 1 0 00.763-1.707L12 10l-6.764 6.707z" />
                        </svg>
                      </span>
                      <span className="tracking-wide">About</span>
                    </div>
                    <div className="text-gray-700">
                      <div className="grid md:grid-cols-2 text-sm">
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">First Name</div>
                          <div className="px-4 py-2">Sapuni</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Last Name</div>
                          <div className="px-4 py-2">Muthunika</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Gender</div>
                          <div className="px-4 py-2">Female</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Contact No.</div>
                          <div className="px-4 py-2">+94 711111111</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Current Address</div>
                          <div className="px-4 py-2">No 123, Main Street, Colombo</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Permanent Address</div>
                          <div className="px-4 py-2">No 123, Main Street, Colombo</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Email</div>
                          <div className="px-4 py-2">
                            <a className="text-blue-800" href="mailto:jane@example.com">jane@example.com</a>
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Birthday</div>
                          <div className="px-4 py-2">Feb 16, 1988</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="my-4"></div>
                  <div className="bg-white p-3 shadow-sm rounded-sm">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                      <span className="text-green-500">
                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
                        </svg>
                      </span>
                      <span className="tracking-wide">Experience</span>
                    </div>
                    <ul className="list-inside space-y-2">
                      <li>
                        <div className="text-teal-600">Owner at Her Company Inc.</div>
                        <div className="text-gray-500 text-xs">March 2020 - Now</div>
                      </li>
                      <li>
                        <div className="text-teal-600">Frontend Developer</div>
                        <div className="text-gray-500 text-xs">July 2018 - February 2020</div>
                      </li>
                      <li>
                        <div className="text-teal-600">Web Developer</div>
                        <div className="text-gray-500 text-xs">June 2015 - July 2018</div>
                      </li>
                    </ul>
                  </div>
                  <div className="my-4"></div>
                  <div className="bg-white p-3 shadow-sm rounded-sm">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                      <span className="text-green-500">
                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="tracking-wide">Education</span>
                    </div>
                    <ul className="list-inside space-y-2">
                      <li>
                        <div className="text-teal-600">B.Sc. in Computer Science</div>
                        <div className="text-gray-500 text-xs">University of XYZ, 2011 - 2015</div>
                      </li>
                      <li>
                        <div className="text-teal-600">M.Sc. in Software Engineering</div>
                        <div className="text-gray-500 text-xs">University of ABC, 2016 - 2018</div>
                      </li>
                    </ul>
                  </div>
                  <div className="my-4"></div>
                  <div className="bg-white p-3 shadow-sm rounded-sm">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                      <span className="text-green-500">
                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18V5a1 1 0 011-1h10a1 1 0 011 1v13M12 22v-4" />
                        </svg>
                      </span>
                      <span className="tracking-wide">Skills</span>
                    </div>
                    <ul className="list-inside space-y-2">
                      <li>
                        <div className="text-teal-600">JavaScript</div>
                      </li>
                      <li>
                        <div className="text-teal-600">React</div>
                      </li>
                      <li>
                        <div className="text-teal-600">Node.js</div>
                      </li>
                      <li>
                      <div className="text-teal-600">Tailwind CSS</div>
                    </li>
                    <li>
                      <div className="text-teal-600">Next.js</div>
                    </li>
                  </ul>
                </div>
                <div className="my-4"></div>
                <div className="bg-white p-3 shadow-sm rounded-sm">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                    <span className="text-green-500">
                      <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </span>
                    <span className="tracking-wide">Projects</span>
                  </div>
                  <ul className="list-inside space-y-2">
                    <li>
                      <div className="text-teal-600">Maternal Care Web App</div>
                      <div className="text-gray-500 text-xs">2023 - Present</div>
                    </li>
                    <li>
                      <div className="text-teal-600">Metamet eCommerce Platform</div>
                      <div className="text-gray-500 text-xs">2022 - 2023</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="my-4"></div>
          <div className="flex justify-center">
            <Button color="secondary" onClick={handleNavigation}>
              Add New Mother
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
