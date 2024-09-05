'use client';
import React, { useState } from 'react';
import Sidemenu from '../../components/sidemenu';
import NavBar from '@/app/components/NavBar';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
import AddAppointmentDialog from './AddAppointmentDialog';

export default function Mother() {

  const router = useRouter();

  const handleNavigation = () => {
    router.push('/midwife/RegisterMother');
  };

  return (
    <div className="flex-1 flex-col overflow-auto p-6">
        <div className="flex-1 overflow-auto p-6">
        <Table />
        </div>
    </div>
  );
}

const Table = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [currentAction, setCurrentAction] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [newmotherName, setNewmotherName] = useState('');

  const handleActionClick = (action, user) => {
    setCurrentAction(action);
    setCurrentUser(user);
    setShowPopup(true);
  };

  const handleConfirm = () => {
    // Perform the action (e.g., restrict or remove user)
    console.log(`User ${currentUser.name} will be ${currentAction}`);
    setShowPopup(false);
    setCurrentUser(null);
    setCurrentAction('');
  };

  const handleCancel = () => {
    setShowPopup(false);
    setCurrentUser(null);
    setCurrentAction('');
  };

  return (
  <div>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white light:bg-gray-900">
        <div>
            <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 light:bg-gray-800 light:text-gray-400 light:border-gray-600 light:hover:bg-gray-700 light:hover:border-gray-600 light:focus:ring-gray-700" type="button">
                <span class="sr-only">Action button</span>
                Action
                <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            <div id="dropdownAction" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 light:bg-gray-700 light:divide-gray-600">
                <ul class="py-1 text-sm text-gray-700 light:text-gray-200" aria-labelledby="dropdownActionButton">
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 light:hover:bg-gray-600 light:hover:text-white">Reward</a>
                    </li>
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 light:hover:bg-gray-600 light:hover:text-white">Promote</a>
                    </li>
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 light:hover:bg-gray-600 light:hover:text-white">Activate account</a>
                    </li>
                </ul>
                <div class="py-1">
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 light:hover:bg-gray-600 light:text-gray-200 light:hover:text-white">Delete User</a>
                </div>
            </div>
        </div>
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 light:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="text" id="table-search-users" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500" placeholder="Search for users"/>
        </div>
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                    <div class="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 light:focus:ring-blue-600 light:ring-offset-gray-800 light:focus:ring-offset-gray-800 focus:ring-2 light:bg-gray-700 light:border-gray-600" />
                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">Name</th>
                <th scope="col" class="px-6 py-3">Contact</th>
                <th scope="col" class="px-6 py-3">Delivery Date</th>
                <th scope="col" class="px-6 py-3">Next clinic date</th>
                <th scope="col" class="px-6 py-3">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b light:bg-gray-800 light:border-gray-700 hover:bg-gray-50 light:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 light:focus:ring-blue-600 light:ring-offset-gray-800 light:focus:ring-offset-gray-800 focus:ring-2 light:bg-gray-700 light:border-gray-600" />
                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap light:text-white">
                    <img class="w-10 h-10 rounded-full" src="https://via.placeholder.com/150" alt="John Doe image"/>
                    <div class="ps-3">
                        <div class="text-base font-semibold">John Doe</div>
                        <div class="font-normal text-gray-500">2103456756</div>
                    </div>
                </th>
                <td class="px-6 py-4">0713073456</td>
                <td class="px-6 py-4">
                    <div class="flex items-center">
                        2024-09-18
                    </div>
                </td>
                <td class="px-6 py-4">2023-08-21</td>
                <td class="px-6 py-4">
                    <button class="bg-yellow-500 text-white px-3 py-1 rounded mr-2" onClick={() => handleActionClick('restricted', { name: 'John Doe' })}>Restrict</button>
                    <button class="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleActionClick('removed', { name: 'John Doe' })}>Remove</button>
                </td>
            </tr>
            <tr class="bg-white border-b light:bg-gray-800 light:border-gray-700 hover:bg-gray-50 light:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-2" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 light:focus:ring-blue-600 light:ring-offset-gray-800 light:focus:ring-offset-gray-800 focus:ring-2 light:bg-gray-700 light:border-gray-600" />
                        <label for="checkbox-table-search-2" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap light:text-white">
                    <img class="w-10 h-10 rounded-full" src="https://via.placeholder.com/150" alt="Amal Kumara image" />
                    <div class="ps-3">
                        <div class="text-base font-semibold">Amal Kumara</div>
                        <div class="font-normal text-gray-500">2100056756</div>
                    </div>
                </th>
                <td class="px-6 py-4">0713074556</td>
                <td class="px-6 py-4">
                    <div class="flex items-center">
                        2024-09-18
                    </div>
                </td>
                <td class="px-6 py-4">2023-09-15</td>
                <td class="px-6 py-4">
                    <button class="bg-yellow-500 text-white px-3 py-1 rounded mr-2" onClick={() => handleActionClick('restricted', { name: 'Amal Kumara' })}>Restrict</button>
                    <button class="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleActionClick('removed', { name: 'Amal Kumara' })}>Remove</button>
                </td>
            </tr>
            <tr class="bg-white light:bg-gray-800 hover:bg-gray-50 light:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 light:focus:ring-blue-600 light:ring-offset-gray-800 light:focus:ring-offset-gray-800 focus:ring-2 light:bg-gray-700 light:border-gray-600" />
                        <label for="checkbox-table-search-3" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap light:text-white">
                    <img class="w-10 h-10 rounded-full" src="https://via.placeholder.com/150" alt="Samantha Perera image" />
                    <div class="ps-3">
                        <div class="text-base font-semibold">Samantha Perera</div>
                        <div class="font-normal text-gray-500">2104456756</div>
                    </div>
                </th>
                <td class="px-6 py-4">0713087456</td>
                <td class="px-6 py-4">
                    <div class="flex items-center">
                        2024-09-18
                    </div>
                </td>
                <td class="px-6 py-4">2023-10-10</td>
                <td class="px-6 py-4">
                    <button class="bg-yellow-500 text-white px-3 py-1 rounded mr-2" onClick={() => handleActionClick('restricted', { name: 'Samantha Perera' })}>Restrict</button>
                    <button class="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleActionClick('removed', { name: 'Samantha Perera' })}>Remove</button>
                </td>
            </tr>
        </tbody>
    </table>
  </div>

  <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        <span class="text-sm font-normal text-gray-500 light:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span class="font-semibold text-gray-900 light:text-black">1-10</span> of <span class="font-semibold text-gray-900 light:text-black">1000</span></span>
        <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
                <a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 light:bg-gray-800 light:border-gray-700 light:text-gray-400 light:hover:bg-gray-700 light:hover:text-white">Previous</a>
            </li>
            <li>
                <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 light:bg-gray-800 light:border-gray-700 light:text-gray-400 light:hover:bg-gray-700 light:hover:text-white">1</a>
            </li>
            <li>
                <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 light:bg-gray-800 light:border-gray-700 light:text-gray-400 light:hover:bg-gray-700 light:hover:text-white">2</a>
            </li>
            <li>
                <a href="#" aria-current="page" class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 light:border-gray-700 light:bg-gray-700 light:text-white">3</a>
            </li>
            <li>
                <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 light:bg-gray-800 light:border-gray-700 light:text-gray-400 light:hover:bg-gray-700 light:hover:text-white">4</a>
            </li>
            <li>
                <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 light:bg-gray-800 light:border-gray-700 light:text-gray-400 light:hover:bg-gray-700 light:hover:text-white">5</a>
            </li>
            <li>
        <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 light:bg-gray-800 light:border-gray-700 light:text-gray-400 light:hover:bg-gray-700 light:hover:text-white">Next</a>
            </li>
        </ul>
    </nav>

  </div>
  
  );
};
