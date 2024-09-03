'use client';
import React, { useState, useEffect } from 'react';
import Sidemenu from '../../components/sidemenu';
import NavBar from '@/app/components/NavBar';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
import AddAppointmentDialog from './AddAppointmentDialog';

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

  const handleShowButton = (id) => {
    setSelectedRefferelId(id);
    setShowRiskFactorsDialog(true);
    fetchRiskFactors(id);
  };

  const handleCancel = () => {
    setShowRiskFactorsDialog(false);
    setRiskFactors([]);
    setMotherDetails(null); // Reset mother's details on close
  };

  const fetchRiskFactors = async (id) => {
    setRiskLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/referrals/getRFandMomById?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

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
      setLoading(false);
      try {
        const response = await fetch('http://localhost:8080/referrals/myAppointments', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await response.json();
        setAppointments(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white light:bg-gray-900">
          {/* Other elements like buttons and search input */}
        </div>
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
            {appointments.map((appointment, index) => (
              <tr key={index} className="bg-white border-b light:bg-gray-800 light:border-gray-700 hover:bg-gray-50 light:hover:bg-gray-600">
                <td className="px-6 py-4">{appointment.motherName}</td>
                <td className="px-6 py-4">{appointment.motherNic}</td>
                <td className="px-6 py-4">{appointment.referrals[0].antenatalOrPostnatal || 'N/A'}</td>
                <td className="px-6 py-4">{new Date(appointment.referrals[0].channelDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-5 w-15" onClick={() => handleDayDialog(user)}>
                    Add New
                  </button>
                  <button className="bg-green-500 text-white px-3 py-1 rounded w-15" onClick={() => handleShowButton(appointment.id)}>
                    Show
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showRiskFactorsDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0" onClick={handleCancel}></div>
          <div className="bg-white p-6 rounded-lg z-10 max-w-md w-full overflow-auto">
            <h3 className="mb-4 text-black text-lg font-semibold">Refferel Details {selectedRefferelId}</h3>
            {motherDetails && (
              <div className="mb-4">
                {/* <p><strong>Name:</strong> {motherDetails.name}</p>
                <p><strong>NIC:</strong> {motherDetails.nic}</p> */}
                <p><strong>Antenatal/Postnatal:</strong> {motherDetails.antenatalOrPostnatal}</p>
              
                {motherDetails.antenatalOrPostnatal === 'Antenatal' ? (
                  <div>
                    <p><strong>Expected Delivery Date:</strong> {new Date(motherDetails.expectedDateOfDelivery).toLocaleDateString()}</p>
                    <p><strong>POG:</strong> {motherDetails.pog}</p>
                  </div>
                ):(
                  <div>
                    <p><strong>Expected Delivery Date:</strong> {new Date(motherDetails.expectedDateOfDelivery).toLocaleDateString()}</p>
                    <p><strong>POG:</strong> {motherDetails.pog}</p>
                  </div>
                )}
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
    </div>
  );
};
