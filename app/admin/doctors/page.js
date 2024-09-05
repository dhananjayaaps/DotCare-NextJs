'use client';
import React, { useState, useEffect } from 'react';
import Sidemenu from '../../components/sidemenu';
import NavBar from '@/app/components/NavBar';
import { Button } from '@nextui-org/react';
import AddUserDialog from './AddUserDialog';

export default function Doctor() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="flex-1 flex-col overflow-auto p-6">
      <div className="flex-1 overflow-auto p-4">
        <Button
          color="primary"
          className="bg-blue-600 ml-3 rounded-lg text-white"
          onClick={() => setShowAddDialog(true)}
        >
          Add a new Doctor
        </Button>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <Table setShowAddDialog={setShowAddDialog} showAddDialog={showAddDialog} />
      </div>
    </div>
  );
}

const Table = ({ setShowAddDialog, showAddDialog }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [showDayDialog, setShowDayDialog] = useState(false);
  const [days, setDays] = useState([
    { name: 'Monday', number: 1, selected: false },
    { name: 'Tuesday', number: 2, selected: false },
    { name: 'Wednesday', number: 3, selected: false },
    { name: 'Thursday', number: 4, selected: false },
    { name: 'Friday', number: 5, selected: false }
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch users with the Doctor role
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/roles/byrole?role=Doctor', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include cookies with the request
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        if (result.success) {
          setUsers(result.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [showAddDialog]); // Re-fetch users when `showAddDialog` changes to refresh the list

  useEffect(() => {
    if (currentUser) {
      const fetchDays = async () => {
        try {
          const response = await fetch(`http://localhost:8080/doctordates/byId?id=${currentUser.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Include cookies if necessary
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          const fetchedDays = data.days; // Array of numbers representing weekdays

          setDays((prevDays) =>
            prevDays.map((day) => ({
              ...day,
              selected: fetchedDays.includes(day.number),
            }))
          );
        } catch (error) {
          console.error('Error fetching days:', error);
        }
      };

      fetchDays();
    }
  }, [currentUser]); // Fetch days when the `currentUser` is set

  const handleDelete = (user) => {
    setCurrentUser(user);
    setShowPopup(true);
  };

  const handleDayDialog = (user) => {
    setCurrentUser(user);
    setShowDayDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch('http://localhost:8080/roles/deleteRole', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username: currentUser.username, role: 'Doctor' }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      if (result.success) {
        setUsers(users.filter((user) => user.username !== currentUser.username)); // Remove deleted user from the state
        console.log(`Successfully removed role from ${currentUser.username}`);
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }

    setShowPopup(false);
    setCurrentUser(null);
  };

  const handleToggleDay = (index) => {
    setDays((prevDays) =>
      prevDays.map((day, i) =>
        i === index ? { ...day, selected: !day.selected } : day
      )
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Filter selected days and map to their corresponding numbers
      const selectedDays = days.filter((day) => day.selected).map((day) => day.number);
      
      // Send the request with the correct payload format
      const response = await fetch('http://localhost:8080/doctordates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: currentUser.username, 
          days: selectedDays 
        }),
        credentials: 'include'
      });
  
      if (!response.ok) {
        throw new Error('Error submitting days');
      }
  
      alert('Days submitted successfully!');
    } catch (error) {
      console.error('Error submitting days:', error);
      alert('Error submitting days');
    } finally {
      setShowDayDialog(false);
      setLoading(false);
    }
  };
  

  const handleCancel = () => {
    setShowPopup(false);
    setShowDayDialog(false);
    setShowAddDialog(false);
    setDays([
      { name: 'Monday', number: 1, selected: false },
      { name: 'Tuesday', number: 2, selected: false },
      { name: 'Wednesday', number: 3, selected: false },
      { name: 'Thursday', number: 4, selected: false },
      { name: 'Friday', number: 5, selected: false }
    ])
    setCurrentUser(null);
  };

  return (
    <div>
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">NIC</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.username}>
              <td className="px-6 py-4 whitespace-no-wrap">
                <p className="text-sm leading-5 text-gray-900">{user.first_name} {user.last_name}</p>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <p className="text-sm leading-5 text-gray-900">{user.nic}</p>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <p className="text-sm leading-5 text-gray-900">{user.phoneNumber}</p>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {user.enabled ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-5 w-15" onClick={() => handleDayDialog(user)}>
                  Edit Days
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded w-15" onClick={() => handleDelete(user)}>
                  Remove
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
              Are you sure you want to remove the user {currentUser?.first_name} {currentUser?.last_name}?
            </p>
            <div className="flex justify-end">
              <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2" onClick={handleCancel}>
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleConfirmDelete}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showDayDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0" onClick={handleCancel}></div>
          <div className="bg-white p-6 rounded-lg z-10">
            <p className="mb-4 text-black">Select the days:</p>
            <div className="mb-4">
              {days.map((day, index) => (
                <label key={day.number} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={day.selected}
                    onChange={() => handleToggleDay(index)}
                    className="form-checkbox"
                  />
                  <span className="ml-2">{day.name}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end">
              <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2" onClick={handleCancel}>
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
                {loading ? 'Loading...' : 'Submit'}
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
    </div>
  );
};
