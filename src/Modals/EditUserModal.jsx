import React, { useState, useEffect } from "react";

const EditUserModal = ({ user, onSave, onClose }) => {
    const [editedUser, setEditedUser] = useState({});

    useEffect(() => {
        if (user) {
            console.log("Modal received user data:", user); // This should now log only user data
            setEditedUser(user);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({ ...prev, [name]: value }));
        console.log("Updated editedUser state:", editedUser);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Submitting updated user data:", editedUser);
            onSave(editedUser);
            onClose();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
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

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-black px-4 py-2 rounded"
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
