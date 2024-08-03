'use client';
import React, { useState } from 'react';
import Sidemenu from '../../components/sidemenu';
import NavBar from '@/app/components/NavBar';

export default function RegForm() {
  const [formData, setFormData] = useState({
    nic: '',
    Marital_Status: 'Married',
    Marriage_Date: '',
    BloodGroup: '',
    Occupation: '',
    emergency_Number: '',
    Delivery_Date: '',
    Consanguinity: '1',
    history_subfertility: '1',
    Hypertension: '1',
    diabetes_mellitus: '1',
    rubella_immunization: '1',
    Allergies: '',
    // location: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission
    console.log(formData);
  };

  return (
    <div className="flex-1 flex-col overflow-auto ">
      <div className="inset-0 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg z-10 w-full max-w-6xl justify-around m-20 mt-0">
          <p className="mb-12 text-black font-bold text-lg">Insert maternal details here</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {Object.keys(formData).map((field) => (
                <div key={field} className="mb-4">
                  <label className="block text-gray-700 capitalize">
                    {field.replace(/_/g, ' ')}
                  </label>
                  {/* Date Fields */}
                  {['Marriage_Date', 'Delivery_Date'].includes(field) ? (
                    <input
                      type="date"
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-2 rounded w-full"
                    />
                    // Radio Buttons
                  ) : ['Consanguinity', 'history_subfertility', 'Hypertension', 'diabetes_mellitus', 'rubella_immunization'].includes(field) ? (
                    <div className="flex space-x-4">
                      <label>
                        <input
                          type="radio"
                          name={field}
                          value="1"
                          checked={formData[field] === '1'}
                          onChange={handleInputChange}
                          className="mr-2"
                          required
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={field}
                          value="0"
                          checked={formData[field] === '0'}
                          onChange={handleInputChange}
                          className="mr-2"
                          required
                        />
                        No
                      </label>
                    </div>
                  ) : field === 'BloodGroup' ? (
                    <select
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-2 rounded w-full"
                      required
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  ) : field === 'Marital_Status' ? (
                    <select
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-2 rounded w-full"
                      required
                    >
                      <option value="">Select Maritial Status</option>
                      <option value="A+">Maried</option>
                      <option value="A-">UnMaried</option>
                    </select>
                  ) : field === 'nic' ? (
                    <input
                      type="text"
                      name={field}
                      value="200121904063"
                      onChange={handleInputChange}
                      className="border border-gray-300 p-2 rounded w-full"
                      required
                      readOnly
                    />
                  ) : (
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-2 rounded w-full"
                      required
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
                onClick={() => setFormData({
                  nic: '',
                  Marital_Status: 'Married',
                  Marriage_Date: '',
                  BloodGroup: '',
                  Occupation: '',
                  Allergies: '',
                  Consanguinity: '1',
                  history_subfertility: '1',
                  Hypertension: '1',
                  diabetes_mellitus: '1',
                  rubella_immunization: '1',
                  emergencyNumber: '',
                  DeliveryDate: '',
                  location: '',
                })}
              >
                Reset
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
