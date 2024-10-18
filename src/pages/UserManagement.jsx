// // UserManagement.js
// import React from "react";
// import Button from "../components/Button";
// import { useNavigate } from "react-router-dom";

// const UserManagement = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="right_section">
//       <div className="flex h-[100px] justify-between">
//         <p className="text-[24px] font-semibold pt-[40px] pl-[40px]">
//           Administration
//         </p>
//         <div className="flex gap-6 mt-[45px] mr-12">
//           <p className="text-[16px] font-normal">John Doe</p>
//           <p className="text-[16px] font-normal">Logout</p>
//         </div>
//       </div>

//       <div className="h-[130px] bg-gray-900">
//         <div className="flex justify-between py-8">
//           <div className="pl-10">
//             <p className="text-[22px] font-semibold">Manage User</p>
//             <p className="text-[14px] font-normal text-gray-500">
//               This is lorem text for dummy purpose
//             </p>
//           </div>
//           <Button
//             name={"Add User"}
//             className={"mr-10 w-[100px]"}
//             onClick={() => {
//               navigate("/addUser");
//             }}
//           />
//         </div>
//       </div>

//       <div className="w-[95%] h-[50%] mt-8 ml-6 rounded-md">
//         <div className="w-full h-[38px] bg-slate-900 rounded-md">
//           <p className="pl-6 pt-1">All users</p>
//         </div>
//         <table className="table-auto w-full text-left border-collapse">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 border">Name</th>
//               <th className="px-4 py-2 border">Level</th>
//               <th className="px-4 py-2 border">Account Created Date</th>
//               <th className="px-4 py-2 border">Subscriptions</th>
//               <th className="px-4 py-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="px-4 py-2 border">John Doe</td>
//               <td className="px-4 py-2 border">Level 1</td>
//               <td className="px-4 py-2 border">2023-10-05</td>
//               <td className="px-4 py-2 border">Basic Plan</td>
//               <td className="px-4 py-2 border flex gap-4">
//                 <i className="ri-edit-line text-white p-2 rounded cursor-pointer"></i>
//                 <i className="ri-delete-bin-line text-white p-2 rounded cursor-pointer"></i>
//               </td>
//             </tr>
//             <tr>
//               <td className="px-4 py-2 border">Jane Smith</td>
//               <td className="px-4 py-2 border">Level 2</td>
//               <td className="px-4 py-2 border">2023-09-12</td>
//               <td className="px-4 py-2 border">Premium Plan</td>
//               <td className="px-4 py-2 border flex gap-4">
//                 <i className="ri-edit-line text-white p-2 rounded cursor-pointer"></i>
//                 <i className="ri-delete-bin-line text-white p-2 rounded cursor-pointer"></i>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserManagement;


import React, { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import UserTable from "../components/UserTable";
import EditUserModal from "../Modals/EditUserModal";
import tom from "/Assets/tom.jpg";

const UserManagement = () => {
    const navigate = useNavigate();

    // Initial users data in state
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Matthew Wilson",
            level: "Super Admin",
            accountCreated: "06-03-2024",
            subscription: "06-03-2021",
            avatar: "/Assets/mathew.png",
        },
        {
            id: 2,
            name: "Jaggy Martinez",
            level: "Super Admin",
            accountCreated: "06-03-2024",
            subscription: "06-03-2021",
            avatar: "/Assets/jeo.jpg",
        },
        {
            id: 3,
            name: "Christopher Brown",
            level: "Admin",
            accountCreated: "18-03-2024",
            subscription: "20-03-2021",
            avatar: "/Assets/bale.jpg",
        },
        {
            id: 4,
            name: "Emily Thompson",
            level: "Manager",
            accountCreated: "11-06-2024",
            subscription: "11-06-2021",
            avatar: "/Assets/SCARLET.jpg",
        },
        {
            id: 5,
            name: "David Smith",
            level: "Manager",
            accountCreated: "25-06-2024",
            subscription: "28-06-2021",
            avatar: "/Assets/leo.jpg",
        },
    ]);


    const [activeTab, setActiveTab] = useState("users");


    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

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
                        <UserTable
                            users={users}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            className="rounded-lg" // Adding rounded corners to the table
                        />

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


