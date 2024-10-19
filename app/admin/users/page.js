'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';

export default function Admin() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="flex-1 flex-col overflow-auto p-6">

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
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/roles/all`, {
          method: 'GET',
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
          setUsers(result.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  const filteredUsers = users.filter(user =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleDelete = (user) => {
    setCurrentUser(user);
    setShowPopup(true);
  };

  const handleConfirmDelete = () => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/roles/deleteRole`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ username: currentUser.username, role: 'admin' }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const result = await response.json();
        if (result.success) {
          console.log("Successfully removed role from " + currentUser.username);
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 px-2 py-1 border rounded"
      />

      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">NIC</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Username</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentUsers.map((user) => (
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
                <p className="text-sm leading-5 text-gray-900">{user.username}</p>
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
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          Previous
        </button>
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          Next
        </button>
      </div>

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
    </div>
  );
};
