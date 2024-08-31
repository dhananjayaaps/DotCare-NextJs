'use client';
import React, { useState } from 'react';
import Sidemenu from '../../components/sidemenu';
import NavBar from '@/app/components/NavBar';
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
          Add a new Admin
        </Button>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <Table setShowAddDialog={setShowAddDialog} showAddDialog={showAddDialog} />
      </div>
      <ToastContainer /> 
    </div>
  );
}

const Table = ({ setShowAddDialog, showAddDialog }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [currentAction, setCurrentAction] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [newAdminName, setNewAdminName] = useState('');

  const handleActionClick = (action, user) => {
    setCurrentAction(action);
    setCurrentUser(user);
    setShowPopup(true);
  };

  const handleConfirm = () => {
    // Perform the action (e.g., restrict or remove user)
    console.log(`User ${currentUser.name} will be ${currentAction}`);
    setShowPopup(false);
    setCurrentUser(null);
    setCurrentAction('');
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
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              NIC
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap">
              <p className="text-sm leading-5 text-gray-900">John Doe</p>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
              <p className="text-sm leading-5 text-gray-900">2103456756</p>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
              <p className="text-sm leading-5 text-gray-900">0713073456</p>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                onClick={() => handleActionClick('restricted', { name: 'John Doe' })}
              >
                Restrict
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleActionClick('removed', { name: 'John Doe' })}
              >
                Remove
              </button>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap">
              <p className="text-sm leading-5 text-gray-900">Amal Kumara</p>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
              <p className="text-sm leading-5 text-gray-900">2100056756</p>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
              <p className="text-sm leading-5 text-gray-900">0713074556</p>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                onClick={() => handleActionClick('restricted', { name: 'John Doe' })}
              >
                Restrict
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleActionClick('removed', { name: 'John Doe' })}
              >
                Remove
              </button>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap">
              <p className="text-sm leading-5 text-gray-900">Nimal Sampath</p>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
              <p className="text-sm leading-5 text-gray-900">2100056789</p>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
              <p className="text-sm leading-5 text-gray-900">0713078456</p>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                onClick={() => handleActionClick('restricted', { name: 'John Doe' })}
              >
                Restrict
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleActionClick('removed', { name: 'John Doe' })}
              >
                Remove
              </button>
            </td>
          </tr>
          {/* Additional rows as needed */}
        </tbody>
      </table>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0" onClick={handleCancel}></div>
          <div className="bg-white p-6 rounded-lg z-10">
            <p className="mb-4 text-black">
              Are you sure you want to {currentAction} the user {currentUser.name}?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleConfirm}
              >
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
