'use client';
import React, { useState, useEffect } from 'react';
import Sidemenu from '../../components/sidemenu';
import NavBar from '@/app/components/NavBar';
import { Button } from '@nextui-org/react';
import AddUserDialog from './AddUserDialog';

export default function Midwife() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="flex-1 flex-col overflow-auto p-6">
      <div className="flex-1 overflow-auto p-4">
        <Button
          color="primary"
          className="bg-blue-600 ml-3 rounded-lg text-white"
          onClick={() => setShowAddDialog(true)}
        >
          Add a new Midwife
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
  const [currentAction, setCurrentAction] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]); // State to store the users

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/roles/byrole?role=Midwife', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Use 'include' to send cookies with the request
        });
        console.log(response);
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const result = await response.json();
        if (result.success) {
          setUsers(result.data);
          console.log("users are " + users);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleDelete = (user) => {
    setCurrentUser(user);
    console.log(user);
    setShowPopup(true);
  };

  const handleConfirmDelete = () => {
    // Perform the action (e.g., restrict or remove user)
    // console.log(`User ${currentUser.first_name} ${currentUser.last_name} will be ${currentAction}`);
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/roles/deleteRole', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({username: currentUser.username, role: 'midwife'}),
        });
        console.log(response);
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const result = await response.json();
        if (result.success) {
          console.log("Successfull removed role from " + currentUser.username);
        }
      } catch (error) {
        console.error('Error Delete Data:', error);
      }
    };
  
    fetchData();
    setShowPopup(false);
    setCurrentUser(null);
  };

  const handleCancel = () => {
    setShowPopup(false);
    setCurrentUser(null);
    setCurrentAction('');
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
                <p className="text-sm leading-5 text-gray-900">
                  {user.first_name} {user.last_name}
                </p>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <p className="text-sm leading-5 text-gray-900">{user.nic}</p>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <p className="text-sm leading-5 text-gray-900">{user.phoneNumber}</p>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.enabled ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(user)}
                >
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
              Are you sure you want to {currentAction} the user {currentUser?.first_name} {currentUser?.last_name}?
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

      {showAddDialog && (
        <div>
          <AddUserDialog showAddDialog={showAddDialog} setShowAddDialog={setShowAddDialog} />
        </div>
      )}
    </div>
  );
};