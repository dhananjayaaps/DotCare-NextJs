import { useState } from 'react';

const AddAppointmentDialog = ({ showAddDialog, setShowAddDialog }) => {
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [timeGap, setTimeGap] = useState(1); // Default value is 1 minute

  const handleAddAppointment = (e) => {
    e.preventDefault();
    // Add appointment logic here
    console.log('Appointment Date:', appointmentDate);
    console.log('Appointment Time:', appointmentTime);
    console.log('Time Gap:', timeGap);
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
            <p className="mb-4 text-black">Add Appointment</p>
            <form onSubmit={handleAddAppointment}>
              <div className="mb-4">
                <label className="block text-gray-700">Appointment Date</label>
                <input
                  type="date"
                  className="border border-gray-300 p-2 rounded w-64"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Appointment Time</label>
                <input
                  type="time"
                  className="border border-gray-300 p-2 rounded w-64"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Time Gap (minutes)</label>
                <input
                  type="number"
                  className="border border-gray-300 p-2 rounded w-64"
                  value={timeGap}
                  onChange={(e) => setTimeGap(e.target.value)}
                  min="1" // Minimum value is 1
                  step="1" // Increment by 1 minute
                  required
                />
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

export default AddAppointmentDialog;
