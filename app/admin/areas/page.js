'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import AddUserDialog from './AddUserDialog';

export default function Admin() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="flex-1 flex-col overflow-auto p-6">
      <div className="flex-1 overflow-auto p-4">
        <Button
          color="primary"
          className="bg-blue-600 ml-3 rounded-lg text-white"
          onClick={() => setShowAddDialog(true)}
        >
          Add a new MOH area
        </Button>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <Table setShowAddDialog={setShowAddDialog} showAddDialog={showAddDialog} />
      </div>
    </div>
  );
}

const Table = ({ setShowAddDialog, showAddDialog }) => {
  const [clinics, setClinics] = useState([]); 
  const [showPopup, setShowPopup] = useState(false);
  const [currentClinic, setCurrentClinic] = useState(null);
  const [actionType, setActionType] = useState('');
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [mohUsers, setMohUsers] = useState([]); // State to store MOH users
  const [selectedMoh, setSelectedMoh] = useState(null); // State to track the selected MOH

  useEffect(() => {
    // Fetch clinics
    const fetchClinics = async () => {
      try {
        const response = await fetch('http://localhost:8080/clinics', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        if (result.success) setClinics(result.data.data);
      } catch (error) {
        console.error('Error fetching clinics:', error);
      }
    };

    // Fetch MOH users
    const fetchMohUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/roles/byrole?role=moh', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setMohUsers(result.data); // Assuming the API returns an array of MOH users
      } catch (error) {
        console.error('Error fetching MOH users:', error);
      }
    };

    fetchClinics();
    fetchMohUsers();
  }, []);

  
  const handleDelete = (clinic) => {
    setCurrentClinic(clinic);
    setActionType('delete');
    setShowPopup(true);
  };

  const handleUpdate = (clinic) => {
    setCurrentClinic(clinic);
    setSelectedMoh(clinic.moh || null); // Set the current MOH of the clinic
    setActionType('update');
    setShowUpdatePopup(true);
  };

  const handleSaveUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8080/clinics/${currentClinic.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          mohUsername: selectedMoh ? selectedMoh.username : null, // Send selected MOH's ID
        }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const result = await response.json();
      if (result.success) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating clinic:', error);
    }

    setShowUpdatePopup(false);
    setCurrentClinic(null);
  };


  const handleConfirmAction = async () => {
    if (actionType === 'delete') {
      // Perform the delete action
      try {
        const response = await fetch(`http://localhost:8080/clinics/${currentClinic.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        if (result.success) {
          console.log(`Clinic ${currentClinic.name} successfully deleted.`);
          setClinics(clinics.filter(clinic => clinic.id !== currentClinic.id)); // Remove from UI
        }
      } catch (error) {
        console.error('Error deleting clinic:', error);
      }
    } else if (actionType === 'update') {
      // Redirect to the update page or handle update logic here
      console.log(`Updating clinic ${currentClinic.name}...`);
    }

    setShowPopup(false);
    setCurrentClinic(null);
  };

  const handleCancel = () => {
    setShowPopup(false);
    setCurrentClinic(null);
    setActionType('');
  };

  return (
    <div>
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Area Name</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">MOH Name</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">MOH Username</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {clinics.map((clinic) => (
            <tr key={clinic.id}>
              <td className="px-6 py-4 whitespace-no-wrap">
                <p className="text-sm leading-5 text-gray-900">{clinic.name}</p>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <p className="text-sm leading-5 text-gray-900">
                  {clinic.moh ? `${clinic.moh.name}` : 'No MOH Assigned'}
                </p>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <p className="text-sm leading-5 text-gray-900">
                  {clinic.moh ? clinic.moh.username : 'N/A'}
                </p>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => handleUpdate(clinic)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(clinic)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0" onClick={handleCancel}></div>
          <div className="bg-white p-6 rounded-lg z-10">
            <p className="mb-4 text-black">
              Are you sure you want to {actionType === 'delete' ? 'delete' : 'update'} the clinic{' '}
              {currentClinic?.name}?
            </p>
            <div className="flex justify-end">
              <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2" onClick={handleCancel}>
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleConfirmAction}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddDialog && (
        <div>
          <AddUserDialog showAddDialog={showAddDialog} setShowAddDialog={setShowAddDialog} />
        </div>
      )}

      {showUpdatePopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0" onClick={() => setShowUpdatePopup(false)}></div>
          <div className="bg-white p-6 rounded-lg z-10">
            <h3 className="mb-4 text-black">Update Clinic</h3>
            <p>Clinic Name: {currentClinic.name}</p>
            
            <label className="block mb-2 text-sm font-medium text-gray-900">Select MOH:</label>
            <select
              className="block w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg"
              value={selectedMoh?.username || ''}
              onChange={(e) => {
                if (e.target.value === 'none') {
                  setSelectedMoh(null); // Handle 'None' selection
                } else {
                  const selectedUser = mohUsers.find(user => user.username === e.target.value);
                  setSelectedMoh(selectedUser);
                }
              }}
            >
              <option value="" disabled>Select MOH</option>
              <option value="none">None</option> {/* Added None option */}
              {mohUsers.map((user) => (
                <option key={user.id} value={user.username}>
                  {user.first_name} {user.last_name}
                </option>
              ))}
            </select>

            <div className="flex justify-end">
              <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2" onClick={() => setShowUpdatePopup(false)}>
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSaveUpdate}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <AddUserDialog showAddDialog={showAddDialog} setShowAddDialog={setShowAddDialog} mohUsers={mohUsers}/>
    </div>
  );
};