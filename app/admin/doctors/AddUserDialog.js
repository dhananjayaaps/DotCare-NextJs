import { useState } from 'react';
import axios from 'axios';

const AddUserDialog = ({ showAddDialog, setShowAddDialog }) => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({ username: '' , role: ''});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleCheckUser = async () => {
    try {
      setUserData(null);
      const response = await axios.get('http://localhost:8080/roles/check', {
        headers: {
          'Content-Type': 'application/json',
        },
        params: formData,
        withCredentials: true, 
      });
      if (response.status === 200) {
        setUserData(response.data.data);
      } else {
        alert('Failed to fetch user data');
      }
    } catch (error) {
      alert('Failed to fetch user data');
      console.error('Error checking username:', error);
    }
  };

  const handleAddRole = async () => {
    try {
      formData.role = 'doctor'
      console.log(formData)

      const response =  await fetch(`${process.env.BACKEND_URL}//roles/addRole`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (response.status === 200) {
        alert('Role added succesfully')
        setUserData({});
      } else {
        alert('Failed to add role');
      }
    } catch (error) {
      console.error('Error adding role:', error);
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add user logic here
    setShowAddDialog(false);
  };

  return (
    <>
      {showAddDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="bg-black bg-opacity-50 absolute inset-0"
            onClick={() => setShowAddDialog(false)}
          ></div>
          <div className="bg-white p-6 rounded-lg z-10">
            <p className="mb-4 text-black">Add user dialog content here.</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 flex items-center">
                <input
                  type="text"
                  name="username" // Added name attribute
                  className="border border-gray-300 p-2 rounded-l w-full"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-r"
                  onClick={handleCheckUser}
                >
                  Check
                </button>
              </div>
              {userData && (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                      type="text"
                      value={userData.name || ''}
                      className="border border-gray-300 p-2 rounded w-full"
                      readOnly
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">NIC</label>
                    <input
                      type="text"
                      value={userData.nic || ''}
                      className="border border-gray-300 p-2 rounded w-full"
                      readOnly
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="text"
                      value={userData.email || ''}
                      className="border border-gray-300 p-2 rounded w-full"
                      readOnly
                    />
                  </div>
                </>
              )}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
                  onClick={() => setShowAddDialog(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleAddRole}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddUserDialog;
