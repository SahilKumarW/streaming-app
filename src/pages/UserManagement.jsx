import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import UserTable from "../components/UserTable";
import EditUserModal from "../Modals/EditUserModal";
import tom from "/Assets/tom.jpg";
import UserService from '../api/userService'; // Adjust the path as necessary
 // Import user service functions

const UserManagement = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]); // State for managing users
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(null); // State for error handling
    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [activeTab, setActiveTab] = useState("users");

    // Fetch all users from the API
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const userList = await UserService.getAllUsers();
            setUsers(userList);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching users:", err);
            setError("Failed to load users.");
            setLoading(false);
        }
    };

    const handleEdit = (user) => {
        setCurrentUser(user);
        setIsEditing(true);
    };

    const handleSaveEdit = async (updatedUser) => {
        try {
            console.log('Saving edited user:', updatedUser);
            const response = await UserService.updateUser(updatedUser);
            console.log("Update response:", response);
            setUsers(users.map((user) => (user.id === updatedUser.id ? response : user)));
            setIsEditing(false);
            setCurrentUser(null);
            console.log("User has been updated:", response);
        } catch (err) {
            console.error("Error updating user:", err);
            setError("Failed to update user. Please try again.");
        }
    };

    const handleDelete = async (userId) => {
        try {
            console.log(`Attempting to delete user with ID: ${userId}`);
            await UserService.deleteUser(userId);
            setUsers(users.filter((user) => user.id !== userId));
            console.log(`User with ID ${userId} has been deleted!`);
        } catch (err) {
            console.error("Error deleting user:", err);
            if (err.response) {
                console.error("Error response:", err.response);
                console.error("Error data:", err.response.data);
                console.error("Error status:", err.response.status);
                console.error("Error headers:", err.response.headers);
            } else if (err.request) {
                console.error("Error request:", err.request);
            } else {
                console.error("Error message:", err.message);
            }
            setError("Failed to delete user. Please try again.");
        }
    };

    const handleBulkAction = () => console.log("Bulk action triggered");
    const handleBlockUser = () => console.log("Block user triggered");

    return (
        <div className="right_section bg-black text-white min-h-screen">
            <div className="flex justify-between items-center p-10">
                <p className="text-2xl font-semibold">Administration</p>
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                        <img src={tom} alt="User Avatar" className="w-10 h-10 rounded-full" />
                        <p>Tom Cruise</p>
                    </div>
                    <div className="flex items-center cursor-pointer gap-2">
                        <p>Logout</p>
                        <i className="ri-logout-circle-r-line mr-1"></i>
                    </div>
                </div>
            </div>

            <div className="bg-stone-800 justify-between items-center mb-8 px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="text-xl font-semibold">Manage User</p>
                        <p className="text-gray-400">
                            Administer and oversee user accounts and privileges within the platform.
                        </p>
                    </div>
                    <Button
                        name={"Add User"}
                        className={"bg-teal-500 text-white px-4 py-2 rounded"}
                        onClick={() => navigate("/addUser")}
                    />
                </div>
                <div className="flex items-end pb-0">
                    <p
                        className={`text-lg font-semibold cursor-pointer text-white ${activeTab === "users" ? "underline text-teal-500" : ""}`}
                        onClick={() => setActiveTab("users")}
                    >
                        Users
                    </p>
                </div>
            </div>

            <div className="p-6 rounded-lg">
                {activeTab === "users" && (
                    <>
                        {loading ? (
                            <p>Loading users...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <UserTable
                                users={users}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                className="rounded-lg"
                            />
                        )}

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={handleBulkAction}
                                className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                            >
                                Bulk Action
                            </button>
                            <button
                                onClick={handleBlockUser}
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition"
                            >
                                Block User
                            </button>
                        </div>
                    </>
                )}
            </div>

            {isEditing && currentUser && (
                <EditUserModal
                    user={currentUser}
                    onSave={handleSaveEdit}
                    onClose={() => {
                        setIsEditing(false);
                        setCurrentUser(null);
                    }}
                />
            )}
        </div>
    );
};

export default UserManagement;
