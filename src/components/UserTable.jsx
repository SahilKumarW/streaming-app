import React, { useState } from "react";

// const UserTable = ({ users, onEdit, onDelete }) => {
//     const [searchTerm, setSearchTerm] = useState("");

//     const handleSearch = (event) => {
//         setSearchTerm(event.target.value);
//     };

//     return (
//         <div className="overflow-x-auto">
//             {/* "All Users" Heading and Search Box */}
//             <div className="border-t border-l border-r border-white border-opacity-20 rounded-t-lg bg-stone-900">
//                 <div className="flex justify-between items-center p-4">
//                     <p className="text-xl font-semibold text-white">All Users</p>
//                     <div className="flex items-center bg-stone-900 border border-white border-opacity-20 rounded-md p-1">
//                         <input
//                             type="text"
//                             placeholder="Search User"
//                             className="bg-stone-900 text-white focus:outline-none"
//                             value={searchTerm}
//                             onChange={handleSearch}
//                         />
//                         <i className="ri-search-line text-white ml-2"></i>
//                     </div>
//                 </div>
//             </div>

//             {/* User Table with Subtle Column Borders */}
//             <div className="border-b border-l border-r border-white border-opacity-20 rounded-b-lg overflow-hidden">
//                 <table className="table-auto w-full bg-black text-white">
//                     <thead>
//                         <tr className="border-b border-gray-600">
//                             <th className="px-4 py-2 border-r border-white border-opacity-10 text-left font-normal">Name</th>
//                             <th className="px-4 py-2 border-r border-white border-opacity-10 text-left font-normal">Level</th>
//                             <th className="px-4 py-2 border-r border-white border-opacity-10 text-left font-normal">Account Created Date</th>
//                             <th className="px-4 py-2 border-r border-white border-opacity-10 text-left font-normal">Subscriptions</th>
//                             <th className="px-10 py-2 text-left font-normal">Actions</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {users
//                             .filter((user) =>
//                                 user.name.toLowerCase().includes(searchTerm.toLowerCase())
//                             )
//                             .map((user) => (
//                                 <tr key={user.id} className="border-b border-gray-600">
//                                     <td className="px-4 py-2 border-r border-gray-600 flex items-center gap-2 text-left text-sm">
//                                         <img
//                                             src={user.avatar}
//                                             alt={user.name}
//                                             className="w-8 h-8 rounded-full"
//                                         />
//                                         {user.name}
//                                     </td>
//                                     <td className="px-4 py-2 border-r border-gray-600 text-left text-sm">{user.level}</td>
//                                     <td className="px-4 py-2 border-r border-gray-600 text-left text-sm">{user.accountCreated}</td>
//                                     <td className="px-4 py-2 border-r border-gray-600 text-left text-sm">{user.subscription}</td>

//                                     <td className="px-4 py-2 text-center">
//                                         <div className="flex justify-center gap-6">
//                                             <i
//                                                 className="ri-edit-line cursor-pointer"
//                                                 onClick={() => onEdit(user.id)}
//                                             ></i>
//                                             <i
//                                                 className="ri-delete-bin-line cursor-pointer"
//                                                 onClick={() => onDelete(user.id)}
//                                             ></i>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default UserTable;



// UserTable.jsx



const UserTable = ({ users, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
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
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <i className="ri-search-line text-white ml-2"></i>
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
                        {users.filter(user => user.fullName.toLowerCase().includes(searchTerm.toLowerCase())).map((user) => (
                            <tr key={user.id}>
                                <td className="p-4">{user.fullName}</td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4">{user.role}</td>
                                <td className="p-4">
                                    <button className="text-blue-500 mr-2" onClick={() => onEdit(user)}>Edit</button>
                                    <button className="text-red-500" onClick={() => onDelete(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;
