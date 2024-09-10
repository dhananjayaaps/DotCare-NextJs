'use client';
import React, { useState, useEffect } from 'react';
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import PdfGenerator from '@/app/components/RefferelPDF';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function RegForm() {
  const [step, setStep] = useState(1); // Step state
  const [antenatal, setAntenatal] = useState(true); // To track antenatal or postnatal
  const [riskFactors, setRiskFactors] = useState(['']); // Array for risk factors

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [assignedDates, setAssignedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(useState(new Date()));

  useEffect(() => {
    // Fetch list of doctors from API
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:8080/roles/byrole?role=moh', {
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
        setDoctors(data.data); // Assuming the response contains a "doctors" array
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
          const response = await fetch(`http://localhost:8080/doctordates/byId?id=${selectedDoctor.id}`, {
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
          setAssignedDates(data.days); // Assuming the response contains a "days" array with numbers representing weekdays (e.g., [1, 3, 5])
        } catch (error) {
          console.error('Error fetching assigned dates:', error);
        }
      };

      fetchAssignedDates();
    }
  }, [selectedDoctor]);

  function findNameById(id) {
    const user = doctors.find((user) => user.id == id);
    return user ? `${user.first_name} ${user.last_name}` : "User not found";
  }

  // Handle change for the doctor dropdown
  const handleDoctorChange = (event) => {
    const doctorId = event.target.value;
    const userName = findNameById(doctorId);
    console.log(userName);

    setSelectedDoctor(doctorId);
    setFormData((prevData) => ({
      ...prevData,
      doctorId: doctorId,
      DoctorName: userName,
    }));
  };

  const isDateSelectable = (date) => {
    // make a date object and set the date
    const ndate = new Date(date);
    const day = ndate.getDay(); // Get the day of the week (0 = Sunday, 6 = Saturday)
    console.log(assignedDates.includes(day));
    return assignedDates.includes(day);
  };

  const [formData, setFormData] = useState({
    nic: '',
    antenatalOrPostnatal: '',
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
    doctorName: ''
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    formData.riskFactors = riskFactors;
    formData.doctorId = selectedDoctor;
    formData.channelDate = selectedDate.toISOString().slice(0, 10);
    formData.antenatalOrPostnatal = antenatal ? 'Antenatal' : 'Postnatal';

    try {
      const response = await fetch('http://localhost:8080/referrals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      console.log(response);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      handleNextStep();
      alert('Data submitted successfully');
    } catch (error) {
      console.error('Error Delete Data:', error);
    }

    console.log({ ...formData});
  };

  const [startDate, setStartDate] = useState(null);
  const isWeekday = (date) => {
    const daten= new Date(date);
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  return (
    <div className="flex-1 flex-col overflow-auto ">
      <div className="inset-0 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg z-10 w-full max-w-6xl justify-around m-20 mt-0">
          <p className="mb-12 text-black font-bold text-lg">Insert maternal details here</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <>
                <div className="mb-4">
                
                  <label className="block text-gray-700 capitalize">NIC</label>
                  <input
                    type="text"
                    name="nic"
                    value={formData.nic}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                    required
                  />
                  <label className="block text-gray-700 capitalize">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 capitalize">Antenatal or Postnatal</label>
                  <div className="flex space-x-4">
                    <label>
                      <input
                        type="radio"
                        name="antenatal"
                        value="antenatal"
                        checked={antenatal === true}
                        onChange={() => setAntenatal(true)}
                        className="mr-2"
                        required
                      />
                      Antenatal
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="antenatal"
                        value="postnatal"
                        checked={antenatal === false}
                        onChange={() => setAntenatal(false)}
                        className="mr-2"
                        required
                      />
                      Postnatal
                    </label>
                  </div>
                </div>
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
                        type="text"
                        name="birth_weight"
                        value={formData.birth_weight}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 rounded w-full"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 capitalize">Postnatal Day</label>
                      <input
                        type="text"
                        name="postnatal_day"
                        value={formData.postnatal_day}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 rounded w-full"
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
                value={selectedDoctor}
                onChange={handleDoctorChange}
                className="border border-gray-300 p-2 rounded w-full"
                required
              >
                <option value="">Select a Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.first_name} {doctor.last_name}
                  </option>
                ))}
              </select>
            </div>
            
            {selectedDoctor && (
              <div className="mb-4">
                <label className="block text-gray-700 capitalize">Select Date</label>
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  filterDate={isWeekday}
                  disabledDays={{ 
                    daysOfWeek: [0, 1, 2, 3, 4, 5, 6].filter(day => !isDateSelectable(new Date().setDate(day))) // Disable days that are not selectable
                  }}
                  modifiersClassNames={{ disabled: 'bg-gray-300 text-gray-500' }} // Custom styles for disabled dates
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
            )}
            </>
            )}

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
              {step < 3 &&(
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleNextStep}
                >
                  Next
                </button>
              )}
              {step === 3 &&(
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
              {step === 4 && (
                  <PdfGenerator data={formData} isAntenatal={antenatal} />
                )
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
