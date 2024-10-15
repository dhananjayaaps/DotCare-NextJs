'use client';

import React, { useState, useEffect } from 'react';
import Sidemenu from '../../components/sidemenu';
import NavBar from '@/app/components/NavBar';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
import AddAppointmentDialog from './AddAppointmentDialog';

// Mother Component
export default function Mother() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  const router = useRouter();

  const handleNavigation = () => {
    router.push('/midwife/RegisterMother');
  };

  return (
    <div className="flex-1 flex-col overflow-auto p-6">
      <div className="flex-1 overflow-auto p-6">
        <Table setShowAddDialog={setShowAddDialog} showAddDialog={showAddDialog} />
      </div>
    </div>
  );
}

// Table Component
const Table = ({ setShowAddDialog, showAddDialog }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRiskFactorsDialog, setShowRiskFactorsDialog] = useState(false);
  const [riskFactors, setRiskFactors] = useState([]);
  const [motherDetails, setMotherDetails] = useState(null);
  const [riskLoading, setRiskLoading] = useState(false);
  const [selectedReferralId, setSelectedReferralId] = useState('');
  const [addRFWindow, setAddRFWindow] = useState(false);
  const [userNic, setUserNic] = useState(null);

  // Pagination and Search States
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 8; // Number of appointments per page
  const [searchTerm, setSearchTerm] = useState('');
  // set today as the
  const [searchDate, setSearchDate] = useState('');

  // Fetch Appointments on Component Mount
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/referrals/myAppointments', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setAppointments([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Fetch Risk Factors for a Specific Appointment
  const fetchRiskFactors = async (id) => {
    setRiskLoading(true);
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/referrals/getRFandMomById?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setRiskFactors(data.riskFactors.reverse());
      setMotherDetails(data.referralDTO);
    } catch (error) {
      console.error('Error fetching risk factors:', error);
      setRiskFactors([]);
      setMotherDetails(null);
    } finally {
      setRiskLoading(false);
    }
  };

  // Handle Show Risk Factors Button Click
  const handleShowButton = (id) => {
    setSelectedReferralId(id);
    setShowRiskFactorsDialog(true);
    fetchRiskFactors(id);
  };

  // Handle Add Risk Factors Button Click
  const handleAddRFButton = (nic) => {
    setUserNic(nic);
    setAddRFWindow(true);
  };

  // Handle Cancel in Dialogs
  const handleCancel = () => {
    setShowRiskFactorsDialog(false);
    setRiskFactors([]);
    setMotherDetails(null);
  };

  // Handle Search Input Change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page after search
  };

  // Handle Date Input Change
  const handleDateChange = (e) => {
    setSearchDate(e.target.value);
    setCurrentPage(1); // Reset to first page after search
  };

  // Filtered Appointments Based on Search Terms
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesName = appointment.motherName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate =
      searchDate === '' ||
      (appointment.referral &&
        new Date(appointment.referral.channelDate).toLocaleDateString() === new Date(searchDate).toLocaleDateString());
    return matchesName && matchesDate;
  });

  // Pagination Logic
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 pb-4 bg-white light:bg-gray-900">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 light:border-gray-700 px-4 py-2 rounded w-full md:w-1/3"
          />
          <input
            type="date"
            value={searchDate}
            onChange={handleDateChange}
            className="border border-gray-300 light:border-gray-700 px-4 py-2 rounded w-full md:w-1/3"
          />
        </div>

        {/* Conditional Rendering: No Appointments */}
        {loading ? (
          <div className="flex justify-center items-center py-10">Loading...</div>
        ) : filteredAppointments.length === 0 ? (
          <div className="flex justify-center items-center py-10">
            <p className="text-gray-700 light:text-gray-300">No Appointments Found.</p>
          </div>
        ) : (
          <>
            {/* Appointments Table */}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">NIC</th>
                  <th scope="col" className="px-6 py-3">Category</th>
                  <th scope="col" className="px-6 py-3">Appointment Date</th>
                  <th scope="col" className="px-6 py-3">Risk Factors</th>
                </tr>
              </thead>
              <tbody>
                {currentAppointments.map((appointment) => (
                  <tr
                    key={appointment.id} // Assuming each appointment has a unique id
                    className="bg-white light:bg-gray-800 border-b light:border-gray-700 hover:bg-gray-50 light:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">{appointment.motherName}</td>
                    <td className="px-6 py-4">{appointment.motherNic}</td>
                    <td className="px-6 py-4">
                      {appointment.referral.antenatalOrPostnatal || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      {appointment.referral.channelDate
                        ? new Date(appointment.referral.channelDate).toLocaleDateString()
                        : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 mb-2 md:mb-0"
                        onClick={() => handleAddRFButton(appointment.motherNic)}
                      >
                        Add New
                      </button>
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded"
                        onClick={() => handleShowButton(appointment.id)}
                      >
                        Show
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === i + 1
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 light:bg-gray-700 light:text-gray-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Add Risk Factor Modal */}
      {addRFWindow && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="bg-black bg-opacity-50 absolute inset-0"
            onClick={() => setAddRFWindow(false)}
          ></div>
          <div className="bg-white light:bg-gray-800 p-6 rounded-lg z-10 max-w-md w-full">
            <h3 className="mb-4 text-black light:text-white text-lg font-semibold">Add Risk Factor</h3>
            <AddRiskFactorForm nic={userNic} setAddRFWindow={setAddRFWindow} />
          </div>
        </div>
      )}

      {/* Show Risk Factors Modal */}
      {showRiskFactorsDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="bg-black bg-opacity-50 absolute inset-0"
            onClick={handleCancel}
          ></div>
          <div className="bg-white light:bg-gray-800 p-6 rounded-lg z-10 max-w-md w-full overflow-auto">
            <h3 className="mb-4 text-black light:text-white text-lg font-semibold">
              Referral Details
            </h3>
            {motherDetails && (
              <div className="mb-4">
                <p>
                  <strong>Antenatal/Postnatal:</strong> {motherDetails.antenatalOrPostnatal}
                </p>
                {/* Display Mother Details */}
                {motherDetails.antenatalOrPostnatal === 'Antenatal'  && (<><p>
                    <strong>Expected Delivery Date:</strong>{' '}
                    {motherDetails.expectedDateOfDelivery
                      ? new Date(motherDetails.expectedDateOfDelivery).toLocaleDateString()
                      : 'N/A'}
                  </p><p>
                    <strong>POG:</strong> {motherDetails.pog || 'N/A'}
                  </p></>)
                }
                {motherDetails.antenatalOrPostnatal === 'Postnatal'  && (<><p>
                    <strong>Postnatal Date:</strong> {motherDetails.postnatal_day || 'N/A'}
                    </p><p>
                    <strong>Modes of Delivery:</strong> {motherDetails.modes_of_delivery || 'N/A'}
                    </p><p>
                    <strong>Birth Weight:</strong> {motherDetails.birth_weight || 'N/A'} g
                  </p></>)
                }
                <div className="flex gap-10 mt-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      disabled
                      checked={motherDetails.parityGravidity}
                    />
                    <span>Gravidity</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      disabled
                      checked={motherDetails.parityParity}
                    />
                    <span>Parity</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      disabled
                      checked={motherDetails.parityChildren}
                    />
                    <span>Children</span>
                  </label>
                </div>
                <p className="mt-2">
                  <strong>Reason for Request:</strong> {motherDetails.reason_for_request}
                </p>
              </div>
            )}

            {/* Risk Factors Table */}
            {riskLoading ? (
              <div className="flex justify-center items-center py-4">Loading...</div>
            ) : (
              <div className="overflow-auto max-h-64">
                <table className="min-w-full divide-y divide-gray-200 light:divide-gray-700">
                  <thead className="bg-gray-50 light:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Risk Factor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created By
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white light:bg-gray-800 divide-y divide-gray-200 light:divide-gray-700">
                    {riskFactors.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="text-center py-4 text-gray-700 light:text-gray-300">
                          No Risk Factors Found.
                        </td>
                      </tr>
                    ) : (
                      riskFactors.map((risk, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 light:text-gray-100">
                            {risk.riskFactor}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 light:text-gray-300">
                            {risk.channelDate
                              ? new Date(risk.channelDate).toLocaleDateString()
                              : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 light:text-gray-300">
                            {risk.doctorName || 'N/A'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Close Button */}
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-300 light:bg-gray-600 text-gray-800 light:text-gray-200 px-4 py-2 rounded mr-2"
                onClick={handleCancel}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// AddRiskFactorForm Component
const AddRiskFactorForm = ({ nic, setAddRFWindow }) => {
  const [riskFactors, setRiskFactors] = useState(['']);
  const [loading, setLoading] = useState(false);

  const handleAddRiskFactorField = () => {
    setRiskFactors([...riskFactors, '']);
  };

  const handleRiskFactorChange = (index, value) => {
    const updatedRiskFactors = [...riskFactors];
    updatedRiskFactors[index] = value;
    setRiskFactors(updatedRiskFactors);
  };

  const handleRemoveRiskFactorField = (index) => {
    const updatedRiskFactors = riskFactors.filter((_, i) => i !== index);
    setRiskFactors(updatedRiskFactors);
  };

  const handleAddRiskFactors = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/referrals/addRiskFactor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          nic,
          riskFactors,
        }),
      });

      if (response.ok) {
        setRiskFactors(['']);
        setAddRFWindow(false);
      } else {
        console.error('Failed to add risk factors:', response);
      }
    } catch (error) {
      console.error('Error adding risk factors:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleAddRiskFactors}>
      {riskFactors.map((riskFactor, index) => (
        <div key={index} className="mb-4 flex items-center">
          <input
            type="text"
            className="border border-gray-300 light:border-gray-700 p-2 rounded w-full"
            value={riskFactor}
            onChange={(e) => handleRiskFactorChange(index, e.target.value)}
            required
          />
          {index > 0 && (
            <button
              type="button"
              onClick={() => handleRemoveRiskFactorField(index)}
              className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <div className="mb-4">
        <button
          type="button"
          onClick={handleAddRiskFactorField}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add More
        </button>
      </div>
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={() => setAddRFWindow(false)}
          className="bg-gray-300 light:bg-gray-600 text-gray-800 light:text-gray-200 px-4 py-2 rounded mr-2"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </Button>
      </div>
    </form>
  );
};
