import {React, useEffect} from 'react';
import { usePathname } from 'next/navigation'

const Sidemenu = ({ highlightedItem }) => {
  // const isActive = (item) => item === highlightedItem ? 'text-gray-900 bg-gray-200' : 'text-gray-700';

  // get is active as url last property
  const pathname = usePathname()
  const isActive = (item) => {
    const urlArray = pathname.split('/');
    const lastUrl = urlArray[urlArray.length - 1];
    return lastUrl === item ? 'text-gray-900 bg-gray-200' : 'text-gray-700';
  }

  return (
    <div>
      <div className="flex h-screen w-56 flex-col justify-between border-e bg-white">
        <div className="px-4 py-6">

          <ul className="mt-6 space-y-1">

          <li>
              <a
                href="/midwife/dashboard"
                className={`block rounded-lg px-4 py-2 text-sm font-medium ${isActive('dashboard')} hover:bg-gray-100 hover:text-gray-700`}
              >
                Home
              </a>
            </li>

            <li>
              <a
                href="/midwife/mothers"
                className={`block rounded-lg px-4 py-2 text-sm font-medium ${isActive('mothers')}`}
              >
                Mothers
              </a>
            </li>

            {/* <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary
                  className={`flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 ${isActive('Teams')} hover:bg-gray-100 hover:text-gray-700`}
                >
                  <span className="text-sm font-medium"> Teams </span>

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
                  <li>
                    <a
                      href="#"
                      className={`block rounded-lg px-4 py-2 text-sm font-medium ${isActive('Banned Users')} hover:bg-gray-100 hover:text-gray-700`}
                    >
                      Banned Users
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className={`block rounded-lg px-4 py-2 text-sm font-medium ${isActive('Calendar')} hover:bg-gray-100 hover:text-gray-700`}
                    >
                      Calendar
                    </a>
                  </li>
                </ul>
              </details>
            </li> */}

            <li>
              <a
                href="/midwife/addmother"
                className={`block rounded-lg px-4 py-2 text-sm font-medium ${isActive('addmother')} hover:bg-gray-100 hover:text-gray-700`}
              >
                Register Mothers
              </a>
            </li>

            <li>
              <a
                href="/midwife/appointments"
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
                  <li>
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
                  </li>

                  <li>
                    <form action="#">
                      <button
                        type="submit"
                        className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
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
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="size-10 rounded-full object-cover"
            />

            <div>
              <p className="text-xs">
                <strong className="block font-medium"> Thenu</strong>

                <span> thenu@gmail.com </span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidemenu;
