import {React, useEffect, useState} from 'react';
import { usePathname } from 'next/navigation'

const Sidemenu = ({ highlightedItem , loggedUser}) => {

  const pathname = usePathname()
  const isActive = (item) => {
    const urlArray = pathname.split('/');
    const lastUrl = urlArray[urlArray.length - 1];
    return lastUrl === item ? 'text-gray-900 bg-gray-200' : 'text-gray-700';
  }

  
  const logout = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/auth/logout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      alert('Logged out successfully');
    }
  };

  return (
    <div>
      <div className="flex h-screen w-56 flex-col justify-between border-e bg-white">
        <div className="px-4 py-6">

          <ul className="mt-6 space-y-1">

            <li>
              <a
                href="/doctor/addmother"
                className={`block rounded-lg px-4 py-2 text-sm font-medium ${isActive('dashboard')} hover:bg-gray-100 hover:text-gray-700`}
              >
                Make Refferel
              </a>
            </li>

            <li>
              <a
                href="/doctor/mothers"
                className={`block rounded-lg px-4 py-2 text-sm font-medium ${isActive('mothers')}`}
              >
                Mothers
              </a>
            </li>

            <li>
              <a
                href="/doctor/appointments"
                className={`block rounded-lg px-4 py-2 text-sm font-medium ${isActive('appointments')} hover:bg-gray-100 hover:text-gray-700`}
              >
                Appointments
              </a>
            </li>

            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary
                  className={`flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 ${isActive('Account')} hover:bg-gray-100 hover:text-gray-700`}
                >
                  <span className="text-sm font-medium"> Account </span>

                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                  {/* <li>
                    <a
                      href="#"
                      className={`block rounded-lg px-4 py-2 text-sm font-medium ${isActive('Details')} hover:bg-gray-100 hover:text-gray-700`}
                    >
                      Details
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className={`block rounded-lg px-4 py-2 text-sm font-medium ${isActive('Security')} hover:bg-gray-100 hover:text-gray-700`}
                    >
                      Security
                    </a>
                  </li> */}

                  <li>
                    <form action="#">
                      <button
                        type="submit"
                        className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </form>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
            <img
              alt=""
              src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=626&ext=jpg&ga=GA1.1.2050956527.1719394239&semt=ais_hybrid"
              className="size-10 rounded-full object-cover"
            />

            <div>
              <p className="text-xs">
                <strong className="block font-medium">{loggedUser.name}</strong>

                <span> {loggedUser.email} </span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidemenu;
