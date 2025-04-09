import React, { useEffect, useState } from 'react';
import { viewAllUser } from '../../api/api';


function UserManagement() {
  const [userDetails, setUserDetails] = useState([]);
  const [sortOrder,setsortOrder] = useState("asc")

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await viewAllUser();
        console.log(res.data.data);
        setUserDetails(res?.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const handleSort = () => {
    const sortedUsers = [...userDetails].sort((a, b) => {
      if (!a.name) a.name = "NA";
      if (!b.name) b.name = "NA";
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
    setUserDetails(sortedUsers);
    setsortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className='min-h-screen bg-blue-50 p-10 rounded-lg  flex justify-center items-center'>
      <div className='w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 overflow-x-auto'>
        <h2 className='text-2xl font-semibold text-center text-gray-700 mb-4'>User Management</h2>
        <button
        onClick={handleSort}
        className="mb-4 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded"
      >
        Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
      </button>
        <table className='w-full border-collapse border border-gray-200 '>
          <thead className='bg-blue-50'>
            <tr>
              <th className='py-3 px-4 border border-gray-300 text-left'>Name</th>
              <th className='py-3 px-4 border border-gray-300 text-left'>Email</th>
              <th className='py-3 px-4 border border-gray-300 text-left'>Phone</th>
              <th className='py-3 px-4 border border-gray-300 text-left'>Address</th>
              <th className='py-3 px-4 border border-gray-300 text-left'>ID Proof</th>
            </tr>
          </thead>
          <tbody>
            {userDetails.length > 0 ? (
              userDetails.map((user, index) => (
                <tr key={index} className='border border-gray-200 hover:bg-gray-100 '>
                  <td className='py-2 px-4 border border-gray-300'>{user.name}</td>
                  <td className='py-2 px-4 border border-gray-300'>{user.email}</td>
                  <td className='py-2 px-4 border border-gray-300'>{user.phoneNumber}</td>
                  <td className='py-2 px-4 border border-gray-300'>{user.address}</td>
                  <td className='py-2 px-4 border border-gray-300'>{user.idProof}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='6' className='text-center text-gray-500 py-4'>
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;
