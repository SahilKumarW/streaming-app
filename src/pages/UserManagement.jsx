import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import UserTable from "../components/UserTable";
import EditUserModal from "../Modals/EditUserModal";
import tom from "/Assets/tom.jpg";
import UserService from '../api/userService'; // Adjust the path as necessary

const UserManagement = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [activeTab, setActiveTab] = useState("users");
    const [userName, setUserName] = useState("");

    useEffect(() => {
        // Fetch the logged-in user's name from local storage
        const storedUserName = localStorage.getItem("userName");
        if (storedUserName) {
            setUserName(storedUserName); // Set the user name in state
        }

        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await UserService.getAllUsers();
            console.log("Fetched user list:", response);
            if (response.apiCode === 0 && Array.isArray(response.data)) {
                setUsers(response.data); // Set the users from the 'data' array
            } else {
                throw new Error(response.displayMessage || "Fetched data is not an array");
            }
        } catch (err) {
            console.error("Error fetching users:", err);
            setError("Failed to load users.");
        } finally {
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
            setUsers((prevUsers) =>
                prevUsers.map((user) => (user.id === updatedUser.id ? response : user))
            );
            setIsEditing(false);
            setCurrentUser(null);
            console.log("User has been updated:", response);
        } catch (err) {
            console.error("Error updating user:", err);
            setError("Failed to update user. Please try again.");
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                console.log(`Attempting to delete user with ID: ${userId}`);
                await UserService.deleteUser(userId);
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
                console.log(`User with ID ${userId} has been deleted!`);
            } catch (err) {
                console.error("Error deleting user:", err);
                setError("Failed to delete user. Please try again.");
            }
        }
    };

    // Logout function
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");  // Navigate to login page after logout
    };

    const handleBulkAction = () => console.log("Bulk action triggered");
    const handleBlockUser = () => console.log("Block user triggered");

    return (
        <div className="right_section bg-black text-white min-h-screen flex flex-col">
            {/* First fixed header */}
            <div className="sticky top-0 bg-black text-white z-10 flex justify-between items-center p-4 px-6">
                <p className="text-2xl font-semibold">Administration</p>
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                        <img src={tom} alt="User Avatar" className="w-10 h-10 rounded-full" />
                        <p>{userName || "Guest"}</p> {/* Display the username */}
                    </div>
                    <div className="flex items-center cursor-pointer gap-2" onClick={handleLogout}>
                        <p>Logout</p>
                        <i className="ri-logout-circle-r-line mr-1"></i>
                    </div>
                </div>
            </div>

            <div className="sticky top-16 bg-stone-800 z-10 flex justify-between items-center py-4 px-6 mb-16"> {/* Add margin bottom here */}
                <div className="flex justify-between items-center w-full">
                    <div>
                        <p className="text-xl font-semibold">Manage Users</p>
                        <p className="text-gray-400">
                            Administer and oversee user accounts and privileges within the platform.
                        </p>
                    </div>
                    <Button
                        name={"Add User"}
                        className={"bg-teal-500 text-white px-4 py-2 rounded"}
                        onClick={() => navigate("/dashboard/addUser")}
                    />
                </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-grow p-6 rounded-lg overflow-y-auto">
                {activeTab === "users" && (
                    <>
                        {loading ? (
                            <p>Loading users...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            // Wrapping UserTable in a scrollable container
                            <div className="overflow-y-auto max-h-96 rounded-lg">
                                <UserTable
                                    users={users}
                                    onDelete={handleDelete}
                                    onUserUpdate={handleSaveEdit}
                                />
                            </div>
                        )}

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={handleBulkAction}
                                className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                            >
                                Bulk Actions
                            </button>
                            <button
                                onClick={handleBlockUser}
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500"
                            >
                                Block User
                            </button>
                        </div>
                    </>
                )}
            </div>

            {isEditing && (
                <EditUserModal
                    user={currentUser}
                    onClose={() => {
                        setIsEditing(false);
                        setCurrentUser(null);
                    }}
                    onSave={handleSaveEdit}
                />
            )}
        </div>
    );
};

export default UserManagement;
