import React from "react";

const UserTable = ({ users, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = React.useState("");

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter(user => 
        user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-4 text-center">
                                    No users found. <button className="text-teal-500" onClick={() => window.location.href = "/addUser"}>Add User</button>
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td className="p-4">{user.fullName}</td>
                                    <td className="p-4">{user.email}</td>
                                    <td className="p-4">{user.role}</td>
                                    <td className="p-4">
                                        <button
                                            className="text-blue-500 mr-2"
                                            onClick={() => {
                                                console.log("Editing user:", user);
                                                onEdit(user);
                                            }}
                                            aria-label={`Edit ${user.fullName}`}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-500"
                                            onClick={() => onDelete(user.id)}
                                            aria-label={`Delete ${user.fullName}`}
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
        </div>
    );
};

export default UserTable;
