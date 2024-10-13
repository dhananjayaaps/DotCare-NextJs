import React, { useState } from "react";
import axios from "axios";

const CheckUser = () => {
  const [formData, setFormData] = useState({ nic: "", name: "", status: "" });
  const [antenatal, setAntenatal] = useState(true); // True for antenatal, false for postnatal
  const [error, setError] = useState("");
  const [userdata, setUserData] = useState(true);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkMotherDetails = async () => {
    try {

        const response = await axios.get(
            `http://localhost:8080/mother/${formData.nic}`,
            { withCredentials: true }
            );
      
      if (response.data) {
        setFormData({
          ...formData,
          name: response.data.name,
          status: response.data.status,
        });
        setError('')

        if (response.data.status === "antenatal") {
          setAntenatal(true);
        } else if (response.data.status === "postnatal") {
          setAntenatal(false);
        }
      } else {
        clearForm();
        setUserData(false)
      }
    } catch (err) {
      setError("No details found for this NIC.");
      clearForm();
      setUserData(false)
    }
  };

  const clearForm = () => {
    setFormData({ nic: "", name: "", status: "" });
    setAntenatal(true); // Default to antenatal
  };

  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-700 capitalize">NIC</label>
        <input
          type="text"
          name="nic"
          value={formData.nic}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded w-full"
          required
        />
        <button
          type="button"
          onClick={checkMotherDetails}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Check
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 capitalize">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded w-full"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 capitalize">Antenatal or Postnatal</label>
        <div className="flex space-x-4">
          <label>
            <input
              type="radio"
              name="antenatal"
              value="prenatal"
              checked={antenatal === true}
              onChange={() => setAntenatal(true)}
              className="mr-2"
            />
            Antenatal
          </label>
          <label>
            <input
              type="radio"
              name="antenatal"
              value="postnatal"
              checked={antenatal === false}
              onChange={() => setAntenatal(false)}
              className="mr-2"
            />
            Postnatal
          </label>
        </div>
      </div>
    </>
  );
};

export default CheckUser;
