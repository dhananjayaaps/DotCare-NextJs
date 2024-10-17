import React, { useState } from "react";
import axios from "axios";
import { getBirthdayFromNIC } from "../../utils/getbdfromnic";

const CheckUser = ({ formData, setFormData, setAntenatal }) => {
  const [error, setError] = useState("");
  const [userdata, setUserData] = useState(true);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkMotherDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.BACKEND_URL}/mother/${formData.nic}`,
        { withCredentials: true }
      );

      if (response.data) {
        const dob = getBirthdayFromNIC(formData.nic);
        setFormData({
          ...formData,
          name: response.data.name,
          dob: dob,
        });
        setError("");
      } else {
        setUserData(false);
      }
    } catch (err) {
      setError("No details found for this NIC.");
      setUserData(false);
      const dob = getBirthdayFromNIC(formData.nic);
      setFormData({
        ...formData,
        dob: dob,
      });
    }
  };

  const ChangeCheckBox = (value) => {
    setFormData({
      ...formData,
      antenatalOrPostnatal: value ? "Antenatal" : "Postnatal",
    });
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
          value={formData.nic || ""}
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
          value={formData.name || ""}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded w-full"
          required
        />
      </div>

      {/* Date of Birth Field */}
      <div className="mb-4">
        <label className="block text-gray-700 capitalize">Date of Birth</label>
        <input
          type="text"
          name="dob"
          value={formData.dob || ""}
          readOnly
          className="border border-gray-300 p-2 rounded w-full"
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
