import { useState } from 'react';

const AddUserDialog = ({ showAddDialog, setShowAddDialog }) => {
  const [userData, setUserData] = useState(null);

  const handleCheckUser = () => {
    // Dummy data for demonstration
    const dummyData = {
      name: "John Doe",
      nic: "123456789V",
      email: "john.doe@example.com",
    };
    setUserData(dummyData);
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
            <p className="mb-4 text-black">Add user Doctor details and check it.</p>
            <form>
              <div className="mb-4 flex items-center">
                <input
                  type="text"
                  className="border border-gray-300 p-2 rounded-l w-full"
                  placeholder="Username"
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
                      value={userData.name}
                      className="border border-gray-300 p-2 rounded w-full"
                      readOnly
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">NIC</label>
                    <input
                      type="text"
                      value={userData.nic}
                      className="border border-gray-300 p-2 rounded w-full"
                      readOnly
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="text"
                      value={userData.email}
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
                  onClick={() => {
                    // Add user logic here
                    setShowAddDialog(false);
                  }}
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
