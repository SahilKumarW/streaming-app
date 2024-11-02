import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserService from '../api/userService';
import EditUserModal from "../Modals/EditUserModal";

const UserTable = ({ users = [], onDelete, onUserUpdate }) => {
    const { userId } = useParams(); // Get userId from the URL
    const [selectedUser, setSelectedUser] = React.useState(null);
    const [isEditing, setIsEditing] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [searchTerm, setSearchTerm] = React.useState(""); // Declare searchTerm state

    useEffect(() => {
        if (userId) {
            // Fetch user details by ID
            const fetchUser = async () => {
                try {
                    const response = await UserService.getUserById(userId);
                    if (response.data && response.data.userResponse) {
                        setSelectedUser(response.data.userResponse);
                        // Do not set isEditing to true here
                    } else {
                        setError("User not found.");
                    }
                } catch (err) {
                    console.error("Error fetching user:", err);
                    setError("Failed to fetch user data.");
                }
            };

            fetchUser();
        }
    }, [userId]); // Depend on userId

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const debounce = (fn, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                fn(...args);
            }, delay);
        };
    };

    const debouncedSearch = debounce((value) => setSearchTerm(value), 300);

    const filteredUsers = Array.isArray(users)
        ? users.filter((user) =>
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    // Use selectedUser if userId is present, otherwise use filteredUsers
    const displayUsers = userId ? (selectedUser ? [selectedUser] : []) : filteredUsers;

    const handleEdit = async (userId) => {
        // When the user clicks "Edit", we open the modal
        const userToEdit = users.find(user => user.id === userId);
        setSelectedUser(userToEdit);
        setIsEditing(true);
    };

    const handleUserUpdate = (updatedUser) => {
        onUserUpdate(updatedUser);
        setIsEditing(false);
    };

    return (
        <div className="overflow-x-auto">
            <div className="border-t border-l border-r border-white border-opacity-20 rounded-t-lg bg-stone-900">
                <div className="flex justify-between items-center p-4">
                    <p className="text-xl font-semibold text-white">All Users</p>
                    <div className="flex items-center bg-stone-900 border border-white border-opacity-20 rounded-md p-1">
                        <input
                            type="text"
                            placeholder="Search User"
                            className="bg-stone-900 text-white focus:outline-none"
                            onChange={(e) => debouncedSearch(e.target.value)}
                            aria-label="Search Users"
                        />
                        <i className="ri-search-line text-white ml-2" aria-hidden="true"></i>
                    </div>
                </div>
            </div>

            <div className="border-b border-l border-r border-white border-opacity-20 rounded-b-lg overflow-hidden">
                <table className="table-auto w-full bg-black text-white">
                    <thead>
                        <tr>
                            <th className="p-4 text-left">Full Name</th>
                            <th className="p-4 text-left">Email</th>
                            <th className="p-4 text-left">Role</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayUsers.length === 0 || (userId && !selectedUser) ? (
                            <tr>
                                <td colSpan="4" className="p-4 text-center">
                                    {error ? error : 'No users found. '}
                                    <button className="text-teal-500" onClick={() => window.location.href = "/addUser"}>
                                        Add User
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            displayUsers.map((user) => (
                                <tr key={user.id}>
                                    <td className="p-4">{user.name}</td>
                                    <td className="p-4">{user.email}</td>
                                    <td className="p-4">{user.role}</td>
                                    <td className="p-4">
                                        <button
                                            className="text-blue-500 mr-2"
                                            onClick={() => handleEdit(user.id)} // Open the modal on button click
                                            aria-label={`Edit ${user.name}`}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-500"
                                            onClick={() => {
                                                if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
                                                    onDelete(user.id);
                                                }
                                            }}
                                            aria-label={`Delete ${user.name}`}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {isEditing && selectedUser && (
                <EditUserModal
                    user={selectedUser}
                    onSave={handleUserUpdate}
                    onClose={() => setIsEditing(false)}
                />
            )}
        </div>
    );
};

export default UserTable;
