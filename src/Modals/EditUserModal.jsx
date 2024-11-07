// EditUserModal.jsx

import React, { useState, useEffect } from "react";

const EditUserModal = ({ user, onSave, onClose }) => {
    const [editedUser, setEditedUser] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: 0,
        password: "",
        role: "",
        userType: 0,
        status: true
    });

    useEffect(() => {
        if (user) {
            setEditedUser(user);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditedUser((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Make sure the payload has all the necessary fields, including password.
        const updatedUser = {
            ...editedUser,
            id: editedUser.id,  // Ensure ID is passed
            password: editedUser.password || "", // If no password, send an empty string
        };

        // Call the onSave function with the updatedUser object
        onSave(updatedUser);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md h-[80vh] overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">Edit User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={editedUser.name || ""}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-md"
                            placeholder="Full Name"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={editedUser.email || ""}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-md"
                            placeholder="Email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={editedUser.phone || ""}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-md"
                            placeholder="Phone Number"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={editedUser.dateOfBirth || ""}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <select
                            name="gender"
                            value={editedUser.gender}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-md"
                        >
                            <option value={0}>Male</option>
                            <option value={1}>Female</option>
                            <option value={2}>Other</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={editedUser.password || ""}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-md"
                            placeholder="Password"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <input
                            type="text"
                            name="role"
                            value={editedUser.role || ""}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-md"
                            placeholder="Role"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">User Type</label>
                        <select
                            name="userType"
                            value={editedUser.userType}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-md"
                        >
                            <option value={0}>Regular</option>
                            <option value={1}>Premium</option>
                        </select>
                    </div>

                    <div className="mb-4 flex items-center">
                        <label className="block text-sm font-medium text-gray-700 mr-2">Status</label>
                        <input
                            type="checkbox"
                            name="status"
                            checked={editedUser.status || false}
                            onChange={handleChange}
                            className="mt-1"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-teal-500 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal;
