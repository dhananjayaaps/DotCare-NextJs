'use client';
import React, { useState, useEffect } from 'react';
import Sidemenu from '../../components/sidemenu';
import NavBar from '@/app/components/NavBar';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
import { getBirthdayFromNIC } from "../../utils/getbdfromnic";
import ChatPopup from '../../utils/chatpopup';

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

const Table = ({ setShowAddDialog, showAddDialog }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRiskFactorsDialog, setShowRiskFactorsDialog] = useState(false);
  const [riskFactors, setRiskFactors] = useState([]);
  const [motherDetails, setMotherDetails] = useState(null); // New state to store mother's details
  const [riskLoading, setRiskLoading] = useState(false);
  const [selectedRefferelId, setSelectedRefferelId] = useState('');
  const [addRFwindow, setAddRFwindow] = useState(false);
  const [userNic, setUserNic] = useState(null);
  const [error, setError] = useState(false);
  const [showBotPopUp, setShowBotPopUp] = useState(false);

  const handleShowButton = (id) => {
    setSelectedRefferelId(id);
    setShowRiskFactorsDialog(true);
    fetchRiskFactors(id);
  };

  const handleAddRFButton = (nic) => {
    setUserNic(nic);
    setAddRFwindow(true);
  };

  const handleCancel = () => {
    setShowRiskFactorsDialog(false);
    setRiskFactors([]);
    setMotherDetails(null); // Reset mother's details on close
  };

  const handleChatButton = (nic) => {
    setUserNic(nic); 
    setShowBotPopUp(true);
  };

  const fetchRiskFactors = async (id) => {
    setRiskLoading(true);
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/mother/getRFandMomById?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch risk factors');
      }

      const data = await response.json();
      setRiskFactors(data.riskFactors.reverse());
      setMotherDetails(data.referralDTO); // Set mother's details

    } catch (error) {
      setRiskLoading(false);
      setRiskFactors([]);
      console.error('Error fetching risk factors:', error);
    } finally {
      setRiskLoading(false);
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/mother/doctor`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }

        const data = await response.json();
        if (data.length === 0) {
          setError(true);
        }
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError(true); // Set error flag when an error occurs
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(8); // Adjust the number of appointments per page as needed
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments
    .filter(appointment =>
      appointment.motherName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (searchDate === '' || new Date(appointment.referral.channelDate).toLocaleDateString() === new Date(searchDate).toLocaleDateString())
    )
    .slice(indexOfFirstAppointment, indexOfLastAppointment);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page after search
  };

  const handleDateChange = (e) => {
    setSearchDate(e.target.value);
    setCurrentPage(1); // Reset to first page after search
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || appointments.length === 0) {
    return <div>No mothers found</div>;
  }

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white light:bg-gray-900">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border px-2 py-1 rounded"
          />
          {/* <input
            type="date"
            value={searchDate}
            onChange={handleDateChange}
            className="border px-2 py-1 rounded"
          /> */}
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">NIC</th>
              <th scope="col" className="px-6 py-3">Category</th>
              {/* <th scope="col" className="px-6 py-3">Appointment Date</th> */}
              <th scope="col" className="px-6 py-3">Risk Factors</th>
            </tr>
          </thead>
          <tbody>
            {currentAppointments.map((appointment, index) => (
              <tr key={index} className="bg-white border-b light:bg-gray-800 light:border-gray-700 hover:bg-gray-50 light:hover:bg-gray-600">
                <td className="px-6 py-4">{appointment.motherName}</td>
                <td className="px-6 py-4">{appointment.motherNic}</td>
                <td className="px-6 py-4">{appointment.referral.antenatalOrPostnatal || 'N/A'}</td>
                {/* <td className="px-6 py-4">{new Date(appointment.referrals[0].channelDate).toLocaleDateString()}</td> */}
                <td className="px-6 py-4 whitespace-no-wrap">
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-5 w-15" onClick={() => handleAddRFButton(appointment.motherNic)}>
                    Add New
                  </button>
                  <button className="bg-green-500 text-white px-3 py-1 rounded w-15 mr-5" onClick={() => handleShowButton(appointment.motherNic)}>
                    Show
                  </button>
                  <button
                        className="bg-green-500 text-white px-3 py-1 rounded"
                        onClick={() => handleChatButton(appointment.motherNic)}
                      >
                        AI Chat
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
        {[...Array(Math.ceil(appointments.length / appointmentsPerPage)).keys()].map(number => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={`px-3 py-1 rounded ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
      {addRFwindow && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0" onClick={() => setAddRFwindow(false)}></div>
          <div className="bg-white p-6 rounded-lg z-10 max-w-md w-full">
            <h3 className="mb-4 text-black text-lg font-semibold">Add Risk Factor</h3>
            <AddRiskFactorForm nic={userNic} setAddRFwindow={setAddRFwindow} />
          </div>
        </div>
      )}

      {showRiskFactorsDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0" onClick={handleCancel}></div>
          <div className="bg-white p-6 rounded-lg z-10 max-w-md w-full overflow-auto">
            <h3 className="mb-4 text-black text-lg font-semibold">Refferel Latest Details</h3>
            {motherDetails && (
              <div className="mb-4">
                {/* <p><strong>Name:</strong> {motherDetails.name}</p>
                <p><strong>NIC:</strong> {motherDetails.nic}</p> */}
                <p><strong>Antenatal/Postnatal:</strong> {motherDetails.antenatalOrPostnatal}</p>
                <p>
                  <strong>DOB:</strong> {
                    (() => {
                      try {
                        return getBirthdayFromNIC(motherDetails.nic) || 'N/A';
                      } catch (e) {
                        return 'N/A';
                      }
                    })()
                  }
                </p>
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
                <div className='flex gap-10'>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" disabled checked={motherDetails.parityGravidity} />
                    <span>Gravidity</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" disabled checked={motherDetails.parityParity} />
                    <span>Parity</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" disabled checked={motherDetails.parityChildren} />
                    <span>Children</span>
                  </label>
                </div>
                
                <p><strong>reason for request:</strong> {motherDetails.reason_for_request}</p>
          
              </div>
            )}
            {riskLoading ? (
              <div>Loading...</div>
            ) : (
              <div className="overflow-auto max-h-64">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Factor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* reverse the risk factors */}
                    
                    {riskFactors.map((risk, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{risk.riskFactor}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(risk.channelDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{risk.doctorName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="flex justify-end mt-4">
              <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2" onClick={handleCancel}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showBotPopUp && (
        <ChatPopup 
          nic={userNic} 
          setShowBotPopUp={setShowBotPopUp} 
        />
      )}
    </div>
  );
};


const AddRiskFactorForm = ({ nic, setAddRFwindow }) => {
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
      const response = await fetch(`${process.env.BACKEND_URL}/referrals/addRiskFactor`, {
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
        setAddRFwindow(false);
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
            className="border border-gray-300 p-2 rounded w-full"
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
          onClick={() => setAddRFwindow(false)}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
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
