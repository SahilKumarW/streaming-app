
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import UserTable from "../components/UserTable";
import EditUserModal from "../Modals/EditUserModal";
import tom from "/Assets/tom.jpg";
import axios from "axios";

const UserManagement = () => {
    const navigate = useNavigate();


    // State for managing users fetched from API
    const [users, setUsers] = useState([]);
    const [loading, setIsLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(null); // State for error handling
    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [activeTab, setActiveTab] = useState("users");

    // Fetch users from API
    useEffect(() => {
        fetch("/api/Users/get-all-users")
            .then((response) => response.json())
            .then((data) => {
                setUsers(data); // Assuming 'data' is the array of users
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching users:", err);
                setError("Failed to load users.");
                setIsLoading(false);
            });
    }, []);

    // Initial users data in state
    // const [users, setUsers] = useState([
    //     {
    //         id: 1,
    //         name: "Matthew Wilson",
    //         level: "Super Admin",
    //         accountCreated: "06-03-2024",
    //         subscription: "06-03-2021",
    //         avatar: "/Assets/mathew.png",
    //     },
    //     {
    //         id: 2,
    //         name: "Jaggy Martinez",
    //         level: "Super Admin",
    //         accountCreated: "06-03-2024",
    //         subscription: "06-03-2021",
    //         avatar: "/Assets/jeo.jpg",
    //     },
    //     {
    //         id: 3,
    //         name: "Christopher Brown",
    //         level: "Admin",
    //         accountCreated: "18-03-2024",
    //         subscription: "20-03-2021",
    //         avatar: "/Assets/bale.jpg",
    //     },
    //     {
    //         id: 4,
    //         name: "Emily Thompson",
    //         level: "Manager",
    //         accountCreated: "11-06-2024",
    //         subscription: "11-06-2021",
    //         avatar: "/Assets/SCARLET.jpg",
    //     },
    //     {
    //         id: 5,
    //         name: "David Smith",
    //         level: "Manager",
    //         accountCreated: "25-06-2024",
    //         subscription: "28-06-2021",
    //         avatar: "/Assets/leo.jpg",
    //     },
    // ]);




    const handleEdit = (user) => {
        setCurrentUser(user);
        setIsEditing(true);
    };


    const handleSaveEdit = (updatedUser) => {
        const updatedUsers = users.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
        );
        setUsers(updatedUsers);
        setIsEditing(false);
        console.log("User has been updated:", updatedUser);
    };


    const handleDelete = (userId) => {
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
        console.log(`User with ID ${userId} has been deleted!`);
    };


    const handleBulkAction = () => console.log("Bulk action triggered");
    const handleBlockUser = () => console.log("Block user triggered");

    return (
        <div className="right_section bg-black text-white min-h-screen">

            <div className="flex justify-between items-center p-10">
                <p className="text-2xl font-semibold">Administration</p>
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                        <img
                            src={tom}
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full"
                        />
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
                {/* Tabs (Users Section) */}
                <div className="flex items-end pb-0">
                    {/* "Users" Heading */}
                    <p
                        className={`text-lg font-semibold cursor-pointer text-white ${activeTab === "users" ? "underline text-teal-500" : ""
                            }`}
                        onClick={() => setActiveTab("users")}
                    >
                        Users
                    </p>
                </div>
            </div>



            <div className="p-6 rounded-lg">
                {/* Display User Table if the "Users" tab is active */}
                {activeTab === "users" && (
                    <>
                        {/* <UserTable
                            users={users}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            className="rounded-lg" // Adding rounded corners to the table
                        /> */}

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

                        {/* Bulk Action and Block User Buttons */}
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

            {/* Edit User Modal */}
            {isEditing && (
                <EditUserModal
                    user={currentUser}
                    onSave={handleSaveEdit}
                    onClose={() => setIsEditing(false)}
                />
            )}
        </div>
    );
};

export default UserManagement;


