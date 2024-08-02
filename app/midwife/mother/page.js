'use client';
import React, { useState } from 'react';
import Sidemenu from '../../components/sidemenu';
import NavBar from '@/app/components/NavBar';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
import Carousel from './carousel';

function MotherProfile() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  const router = useRouter();

  const handleNavigation = () => {
    router.push('/midwife/RegisterMother');
  };

  return (
    <div className="flex-1 flex-col overflow-auto p-6">
      <div className="bg-gray-100">
        <div className="w-full text-black bg-main-color">
          <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
            <div className="p-4 flex flex-row items-center justify-between">
              <a href="#" className="text-lg font-semibold tracking-widest uppercase rounded-lg focus:outline-none focus:shadow-outline">
                Prenatal Mother Profile
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
                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">Sapuni Muthunika</h1>
                <h3 className="text-gray-600 font-lg text-semibold leading-6">Mother</h3>
                <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                  Expecting her second child. Previous pregnancy was uncomplicated and delivered a healthy baby girl.
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
                    <span className="ml-auto">Jan 10, 2020</span>
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
                  <span>Past Children</span>
                </div>
                <div className="grid grid-cols-3">
                  <div className="text-center my-2">
                    <img className="h-16 w-16 rounded-full mx-auto" src="https://static.vecteezy.com/system/resources/previews/005/253/734/non_2x/isolated-cute-baby-boy-clipart-design-vector.jpg" alt="Child 1" />
                    <a href="#" className="text-main-color">Lihini Perera</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-9/12 mx-2 h-64">
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span className="text-green-500">
                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c.96 0 1.857.314 2.581.845M12 5a7 7 0 00-7 7v2.168A7.007 7.007 0 0112 8zm0-3a10 10 0 0110 10v2.168a7.007 7.007 0 00-7 0V10a10 10 0 00-10 10h2a8 8 0 018-8z" />
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
                      <div className="px-4 py-2">+94 123456789</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Current Address</div>
                      <div className="px-4 py-2">123 Main St, Colombo</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Email</div>
                      <div className="px-4 py-2">
                        <a className="text-blue-800" href="mailto:sapuni@example.com">sapuni@example.com</a>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Birthday</div>
                      <div className="px-4 py-2">Jan 1, 1990</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-4"></div>
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="grid grid-cols-2">
                  <div>
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                      <span className="text-green-500">
                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c.96 0 1.857.314 2.581.845M12 5a7 7 0 00-7 7v2.168A7.007 7.007 0 0112 8zm0-3a10 10 0 0110 10v2.168a7.007 7.007 0 00-7 0V10a10 10 0 00-10 10h2a8 8 0 018-8z" />
                        </svg>
                      </span>
                      <span className="tracking-wide">Past Medical Records</span>
                    </div>
                    
                    <ul className="list-inside space-y-2">
                      <li>
                        <div className="text-teal-600">Hypertension</div>
                        <div className="text-gray-500 text-xs">Managed with medication</div>
                      </li>
                      <li>
                        <div className="text-teal-600">Diabetes Mellitus</div>
                        <div className="text-gray-500 text-xs">Monitored regularly</div>
                      </li>
                      <li>
                        <div className="text-teal-600">Rubella Immunization</div>
                        <div className="text-gray-500 text-xs">Up to date</div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                      <span className="text-green-500">
                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c.96 0 1.857.314 2.581.845M12 5a7 7 0 00-7 7v2.168A7.007 7.007 0 0112 8zm0-3a10 10 0 0110 10v2.168a7.007 7.007 0 00-7 0V10a10 10 0 00-10 10h2a8 8 0 018-8z" />
                        </svg>
                      </span>
                      <span className="tracking-wide">Past Pregnancy Details</span>
                    </div>
                    <ul className="list-inside space-y-2">
                      <li>
                        <div className="text-teal-600">First Pregnancy</div>
                        <div className="text-gray-500 text-xs">Delivered a healthy baby girl</div>
                      </li>
                      <li>
                        <div className="text-teal-600">Second Pregnancy</div>
                        <div className="text-gray-500 text-xs">Current pregnancy, due in December</div>
                      </li>
                    </ul>
                  </div>
                </div>
                <Button onClick={handleNavigation}>Add Mother</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="my-4"></div>
        <div className="p-3 rounded-sm">
          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
            <span className="text-green-500">
              <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c.96 0 1.857.314 2.581.845M12 5a7 7 0 00-7 7v2.168A7.007 7.007 0 0112 8zm0-3a10 10 0 0110 10v2.168a7.007 7.007 0 00-7 0V10a10 10 0 00-10 10h2a8 8 0 018-8z" />
              </svg>
            </span>
            <span className="tracking-wide">Medical History</span>
          </div>
          <Carousel/>
        </div>
        <div className="my-4"></div>
        <div className="bg-white p-3 shadow-sm rounded-sm">
          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
            <span className="text-green-500">
              <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c.96 0 1.857.314 2.581.845M12 5a7 7 0 00-7 7v2.168A7.007 7.007 0 0112 8zm0-3a10 10 0 0110 10v2.168a7.007 7.007 0 00-7 0V10a10 10 0 00-10 10h2a8 8 0 018-8z" />
              </svg>
            </span>
            <span className="tracking-wide">Pregnancy History</span>
          </div>
          <div className="text-gray-700">
            <div className="grid md:grid-cols-2 text-sm">
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">First Pregnancy</div>
                <div className="px-4 py-2">Delivered a healthy baby girl</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Second Pregnancy</div>
                <div className="px-4 py-2">Current pregnancy, due in December</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotherProfile;
