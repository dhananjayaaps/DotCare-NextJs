'use client';
import React, { useState, useEffect } from 'react';
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import PdfGenerator from '@/app/components/RefferelPDF';
import CheckUser from './checkUser';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function RegForm() {
  const [step, setStep] = useState(1); // Step state
  const [antenatal, setAntenatal] = useState(true); // To track antenatal or postnatal
  const [riskFactors, setRiskFactors] = useState(['']); // Array for risk factors

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [assignedDates, setAssignedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // Fetch list of doctors from API
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/doctordates/doctors`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include credentials if necessary
        });
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        setDoctors(data); // Assuming the response contains a "doctors" array
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    if (selectedDoctor) {
      // Fetch the dates assigned to the selected doctor
      const fetchAssignedDates = async () => {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/doctordates/byUsername?id=${selectedDoctor}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });

          if (!response.ok) {
            throw new Error('Failed to fetch assigned dates');
          }

          const data = await response.json();
          setAssignedDates(data); // Assuming the response contains a "days" array with numbers representing weekdays (e.g., [1, 3, 5])
        } catch (error) {
          console.error('Error fetching assigned dates:', error);
        }
      };

      fetchAssignedDates();
    }
  }, [selectedDoctor]);

  function findNameById(id) {
    const user = doctors.find((user) => user.doctorUsername == id);
    return user ? `${user.doctorName}` : "User not found";
  }

  // Handle change for the doctor dropdown
  const handleDoctorChange = (event) => {
    const doctorId = event.target.value;
    const userName = findNameById(doctorId);

    console.log(doctorId);
    console.log(userName);

    setSelectedDoctor(doctorId);
    setFormData((prevData) => ({
      ...prevData,
      doctorId: doctorId,
      doctorName: userName,
    }));
  };

  const isDateSelectable = (date) => {
    const today = new Date(); 
    const ndate = new Date(date);
    
    // Restrict past dates
    if (ndate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
      return false;
    }
    
    const day = ndate.getDay();
    return assignedDates.includes(day);
  };

  const [formData, setFormData] = useState({
    nic: '',
    antenatalOrPostnatal: 'Antenatal',
    deliveryDate: '',
    expectedDateOfDelivery: '',
    pog: '', // Period of Gestational
    parityGravidity: false,
    parityParity: false,
    parityChildren: false,
    riskFactors: [],
    reason_for_request: '',
    modes_of_delivery: '',
    birth_weight: '',
    postnatal_day: '',
    doctorId: '',
    channelDate: '',
    name: '',
    doctorName: '',
    dob: ''
  });

  const calculatepog = (edd) => {
    const today = new Date();
    const eddDate = new Date(edd);
    const diffInTime = eddDate.getTime() - today.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
    const pogWeeks = 41 - Math.floor(diffInDays / 7); // Assuming full-term is 40 weeks
    return pogWeeks >= 0 ? pogWeeks : 0;
  };

  useEffect(() => {
    if (formData.expectedDateOfDelivery) {
      const pog = calculatepog(formData.expectedDateOfDelivery);
      setFormData({ ...formData, pog: pog });
    }
  }, [formData.expectedDateOfDelivery]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleRiskFactorChange = (index, value) => {
    const newRiskFactors = [...riskFactors];
    newRiskFactors[index] = value;
    setRiskFactors(newRiskFactors);
  };

  const addRiskFactor = () => {
    setRiskFactors([...riskFactors, '']);
  };

  const removeRiskFactor = (index) => {
    setRiskFactors(riskFactors.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log('Updated selectedDate:', selectedDate);
  }, [selectedDate]);

  useEffect(() => {

    setFormData({
      ...formData,  
      riskFactors: riskFactors,
      doctorId: selectedDoctor,
      channelDate: formattedDate, 
      antenatalOrPostnatal: antenatal ? 'Antenatal' : 'Postnatal', 
    });

  }, [riskFactors, selectedDoctor, formattedDate, antenatal]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);
  

  const setSelectedDateLogic = (date) => {
  
    const options = { timeZone: 'Asia/Colombo', year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDateString = new Intl.DateTimeFormat('en-CA', options).format(date);

    setSelectedDate(date);
    setFormattedDate(formattedDateString);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(formData.name === '' && formData.nic === '') {
      alert('Please enter the NIC number and click on the check button');
      return
    }

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/referrals/byMoh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert('Data submitted successfully');
      handleNextStep();
    } catch (error) {
      console.error('Error Submit Data:', error);
    }
  };


  return (
    <div className="flex-1 flex-col overflow-auto ">
      <div className="inset-0 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg z-10 w-full max-w-6xl justify-around m-20 mt-0">
          <p className="mb-12 text-black font-bold text-lg">Insert maternal details here</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <>
                <CheckUser formData={formData} setFormData={setFormData} setAntenatal={setAntenatal} />
              </>
            )}

            {step === 2 && (
              <>
                {antenatal ? (
                  <>
                    <div className="mb-4">
                      <label className="block text-gray-700 capitalize">Expected Date of Delivery</label>
                      <input
                        type="date"
                        name="expectedDateOfDelivery"
                        value={formData.expectedDateOfDelivery}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 rounded w-full"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 capitalize">Period of Gestational (pog)</label>
                      <input
                        type="text"
                        name="pog"
                        value={formData.pog}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 rounded w-full"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-4">
                      <label className="block text-gray-700 capitalize">Modes of Delivery</label>
                      <select
                        name="modes_of_delivery"
                        value={formData.modes_of_delivery}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 rounded w-full"
                        required
                      >
                        <option value="">Select Mode</option>
                        <option value="NVD">NVD</option>
                        <option value="LSCS">LSCS</option>
                        <option value="IVD">IVD</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 capitalize">Birth Weight</label>
                      <input
                        type="number"
                        name="birth_weight"
                        value={formData.birth_weight}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 rounded w-full"
                        step="0.01" // Allows two decimal places
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 capitalize">Postnatal Day</label>
                      <input
                        type="date"
                        name="postnatal_day"
                        value={formData.postnatal_day}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 rounded w-full"
                        max={new Date().toISOString().split("T")[0]} // Sets the maximum date to today
                        required
                      />
                    </div>
                  </>
                )}
                <div className="mb-4">
                      <label className="block text-gray-700 capitalize">Parity</label>
                      <div className="flex space-x-4">
                        <label>
                          <input
                            type="checkbox"
                            name="parityGravidity"
                            checked={formData.parityGravidity}
                            onChange={(e) =>
                              setFormData({ ...formData, parityGravidity: e.target.checked })
                            }
                            className="mr-2"
                          />
                          Gravidity
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            name="parityParity"
                            checked={formData.parityParity}
                            onChange={(e) =>
                              setFormData({ ...formData, parityParity: e.target.checked })
                            }
                            className="mr-2"
                          />
                          Parity
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            name="parityChildren"
                            checked={formData.parityChildren}
                            onChange={(e) =>
                              setFormData({ ...formData, parityChildren: e.target.checked })
                            }
                            className="mr-2"
                          />
                          Children
                        </label>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 capitalize">Risk Factors</label>
                      {riskFactors.map((factor, index) => (
                        <div key={index} className="flex space-x-2 mb-2">
                          <input
                            type="text"
                            value={factor}
                            onChange={(e) => handleRiskFactorChange(index, e.target.value)}
                            className="border border-gray-300 p-2 rounded w-full"
                          />
                          <button
                            type="button"
                            className="bg-red-500 text-white px-2 py-1 rounded"
                            onClick={() => removeRiskFactor(index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                        onClick={addRiskFactor}
                      >
                        Add Risk Factor
                      </button>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 capitalize">Reason for Request</label>
                      <input
                        type="text"
                        name="reason_for_request"
                        value={formData.reason_for_request}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 rounded w-full"
                        required
                      />
                    </div>
              </>
            )}
            
            {step === 3 && (
              <>
              <div className="mb-4">
                <label className="block text-gray-700 capitalize">Select Doctor</label>
                <select
                  name="doctor"
                  value={selectedDoctor.doctorId}
                  onChange={handleDoctorChange}
                  className="border border-gray-300 p-2 rounded w-full"
                  required
                >
                  <option value="">Select a Doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.doctorId} value={doctor.doctorUsername}>
                      {doctor.doctorName}
                    </option>
                  ))}
                </select>
              </div>
            
              {selectedDoctor && (
                <div className="mb-4">
                  <label className="block text-gray-700 capitalize w-full">Select Date</label>
                  
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDateLogic(date)}
                    filterDate={isDateSelectable}
                    dateFormat="yyyy-MM-dd"
                    className="border border-gray-300 p-2 rounded w-full"
                    required
                  />
                </div>
              )}
            </>
            )}

            {  (
              <div className="flex justify-between mt-4">
                {step > 1 && step < 4 && (
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                    onClick={handlePreviousStep}
                  >
                    Previous
                  </button>
                )}
                {step < 3 && (
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleNextStep}
                  >
                    Next
                  </button>
                )}
                {step === 3 && (
                  <>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onSubmit={handleSubmit}
                    >
                      Submit
                    </button>
                  </>
                )}
                {step === 4 && <PdfGenerator data={formData} isAntenatal={antenatal} />}
              </div>
            )}

          </form>
        </div>
      </div>
    </div>
  );
}
