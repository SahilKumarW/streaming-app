import React, { useState } from "react";

const EditUserModal = ({ user, onSave, onClose }) => {
  const [editedUser, setEditedUser] = useState(user);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  // Save edited user
  const handleSave = () => {
    onSave(editedUser);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Edit User</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Level</label>
          <input
            type="text"
            name="level"
            value={editedUser.level}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Add more fields if needed */}

        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSave}
            className="bg-teal-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
