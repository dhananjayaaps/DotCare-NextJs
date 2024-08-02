import React from 'react';

const Calender = () => {
  // Static data for demonstration. Replace this with dynamic data as needed.
  const appointments = {
    1: 2,
    2: 1,
    8: 3,
    9: 1,
    15: 4,
    22: 2,
    26: 1,
  };

  return (
    <div className="flex items-center justify-center py-8 px-4">
      <div className="max-w-sm w-full shadow-lg">
        <div className="md:p-8 p-5 dark:bg-gray-800 bg-white rounded-t">
          <div className="px-4 flex items-center justify-between">
            <span tabIndex="0" className="focus:outline-none text-base font-bold dark:text-gray-100 text-gray-800">October 2020</span>
            <div className="flex items-center">
              <button aria-label="calendar backward" className="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="15 6 9 12 15 18" />
                </svg>
              </button>
              <button aria-label="calendar forward" className="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between pt-12 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                    <th key={day}>
                      <div className="w-full flex justify-center">
                        <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">{day}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(5).keys()].map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {[...Array(7).keys()].map((_, colIndex) => {
                      const day = rowIndex * 7 + colIndex + 1;
                      return (
                        <td key={colIndex} className="pt-6">
                          <div
                            className="px-2 py-2 cursor-pointer flex w-full justify-center relative"
                            data-tooltip={appointments[day] ? `${appointments[day]} appointments` : 'No appointments'}
                          >
                            <p className={`text-base ${appointments[day] ? 'text-gray-500' : 'text-gray-400'} dark:text-gray-100 font-medium`}>
                              {appointments[day] || ''}
                            </p>
                            {appointments[day] && (
                              <div
                                className="absolute bg-gray-700 text-white text-sm rounded-md px-2 py-1 -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 tooltip"
                                style={{ whiteSpace: 'nowrap' }}
                              >
                                {appointments[day]} appointments
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="md:py-8 py-5 md:px-16 px-5 dark:bg-gray-700 bg-gray-50 rounded-b">
          <div className="px-4">
            <div className="border-b pb-4 border-gray-400 border-dashed">
              <p className="text-xs font-light leading-3 text-gray-500 dark:text-gray-300">9:00 AM</p>
              <a tabIndex="0" className="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2">Zoom call with design team</a>
              <p className="text-sm pt-2 leading-4 leading-none text-gray-600 dark:text-gray-300">Discussion on UX sprint and Wireframe review</p>
            </div>
            <div className="border-b pb-4 border-gray-400 border-dashed pt-5">
              <p className="text-xs font-light leading-3 text-gray-500 dark:text-gray-300">10:00 AM</p>
              <a tabIndex="0" className="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2">Orientation session with new hires</a>
            </div>
            <div className="border-b pb-4 border-gray-400 border-dashed pt-5">
              <p className="text-xs font-light leading-3 text-gray-500 dark:text-gray-300">9:00 AM</p>
              <a tabIndex="0" className="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2">Zoom call with design team</a>
              <p className="text-sm pt-2 leading-4 leading-none text-gray-600 dark:text-gray-300">Discussion on UX sprint and Wireframe review</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calender;
