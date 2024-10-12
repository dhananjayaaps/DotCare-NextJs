import { useState } from 'react';

const AddUserDialog = ({ showAddDialog, setShowAddDialog, mohUsers }) => {
  const [formData, setFormData] = useState({ clinicname: '', moh: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddClinic = async () => {
    try {
      const selectedMoh = mohUsers.find(user => user.username === formData.moh);

      const clinicData = {
        name: formData.clinicname,
        mohUsername: selectedMoh.username || null,
      };

      const response = await fetch('http://localhost:8080/clinics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clinicData),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setFormData({ clinicname: '', moh: '' });
        setShowAddDialog(false);
        // Refresh the clinics list
        window.location.reload();
      } else {
        alert('Failed to add clinic');
      }
    } catch (error) {
      console.error('Error adding clinic:', error);
      alert('An error occurred while adding the clinic.');
    }
  };

  if (!mohUsers) {
    return null;
  }

  return (
    <>
      {showAddDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="bg-black bg-opacity-50 absolute inset-0"
            onClick={() => setShowAddDialog(false)}
          ></div>
          <div className="bg-white p-6 rounded-lg z-10">
            <h3 className="mb-4 text-black">Add Clinic</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Clinic Name:
                </label>
                <input
                  type="text"
                  name="clinicname"
                  value={formData.clinicname}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Select MOH:
                </label>
                <select
                  name="moh"
                  value={formData.moh}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">None</option>
                  {mohUsers.map((user) => (
                    <option key={user.id} value={user.username}>
                      {user.first_name} {user.last_name}
                    </option>
                  ))}
                </select>
              </div>

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
                  onClick={handleAddClinic}
                >
                  Add Clinic
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
