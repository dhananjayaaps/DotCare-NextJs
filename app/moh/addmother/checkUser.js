import React, { useState } from "react";
import axios from "axios";

const CheckUser = ({ formData, setFormData, setAntenatal }) => {
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
        //   antenatalOrPostnatal: response.data.status === "Antenatal" ? "Antenatal" : "Postnatal",
        });
        setError("");
      } else {
        setUserData(false);
      }
    } catch (err) {
      setError("No details found for this NIC.");
      setUserData(false);
    }
  };

  const ChangeCheckBox = (value) => {
    setFormData({
      ...formData,
      antenatalOrPostnatal: value ? "Antenatal" : "Postnatal",
    });
    // handle setAntenatal
    setAntenatal(value);
  };

  console.log(formData);

  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-700 capitalize">NIC</label>
        <input
          type="text"
          name="nic"
          value={formData.nic || ''}
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
        <label className="block text-gray-700 capitalize">
          Antenatal or Postnatal
        </label>
        <div className="flex space-x-4">
          <label>
            <input
              type="radio"
              name="antenatalOrPostnatal"
              value="Antenatal"
              checked={formData.antenatalOrPostnatal === "Antenatal"}
              onChange={() => ChangeCheckBox(true)}
              className="mr-2"
            />
            Antenatal
          </label>
          <label>
            <input
              type="radio"
              name="antenatalOrPostnatal"
              value="Postnatal"
              checked={formData.antenatalOrPostnatal === "Postnatal"}
              onChange={() => ChangeCheckBox(false)}
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
