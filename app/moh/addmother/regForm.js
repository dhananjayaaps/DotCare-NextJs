'use client';
import React, { useState, useEffect } from 'react';

export default function RegForm() {
  const [step, setStep] = useState(1); // Step state
  const [antenatal, setAntenatal] = useState(true); // To track antenatal or postnatal
  const [riskFactors, setRiskFactors] = useState(['']); // Array for risk factors

  const [formData, setFormData] = useState({
    nic: '',
    Delivery_Date: '',
    Expected_Date_of_Delivery: '',
    POG: '', // Period of Gestational
    Parity_Gravidity: false,
    Parity_Parity: false,
    Parity_Children: false,
    reason_for_request: '',
    modes_of_delivery: '',
    birth_weight: '',
    postnatal_day: '',
    doctorName: '', 
  });

  const calculatePOG = (edd) => {
    const today = new Date();
    const eddDate = new Date(edd);
    const diffInTime = eddDate.getTime() - today.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
    const pogWeeks = 41 - Math.floor(diffInDays / 7); // Assuming full-term is 40 weeks
    return pogWeeks >= 0 ? pogWeeks : 0;
  };

  useEffect(() => {
    if (formData.Expected_Date_of_Delivery) {
      const pog = calculatePOG(formData.Expected_Date_of_Delivery);
      setFormData({ ...formData, POG: pog });
    }
  }, [formData.Expected_Date_of_Delivery]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission
    console.log({ ...formData, riskFactors });
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
                        name="Expected_Date_of_Delivery"
                        value={formData.Expected_Date_of_Delivery}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 rounded w-full"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 capitalize">Period of Gestational (POG)</label>
                      <input
                        type="text"
                        name="POG"
                        value={formData.POG}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 rounded w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 capitalize">Parity</label>
                      <div className="flex space-x-4">
                        <label>
                          <input
                            type="checkbox"
                            name="Parity_Gravidity"
                            checked={formData.Parity_Gravidity}
                            onChange={(e) =>
                              setFormData({ ...formData, Parity_Gravity: e.target.checked })
                            }
                            className="mr-2"
                          />
                          Gravidity
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            name="Parity_Parity"
                            checked={formData.Parity_Parity}
                            onChange={(e) =>
                              setFormData({ ...formData, Parity_Parity: e.target.checked })
                            }
                            className="mr-2"
                          />
                          Parity
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            name="Parity_Children"
                            checked={formData.Parity_Children}
                            onChange={(e) =>
                              setFormData({ ...formData, Parity_Children: e.target.checked })
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
              </>
            )}

            {step === 3 && (
              <div className="mb-4">
                <label className="block text-gray-700 capitalize">Doctor Name</label>
                <input
                  type="text"
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded w-full"
                  required
                />
              </div>
            )}

            <div className="flex justify-between mt-4">
              {step > 1 && (
                <button
                  type="button"
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                  onClick={handlePreviousStep}
                >
                  Previous
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleNextStep}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
