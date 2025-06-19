import React, { useEffect, useState } from 'react';
import { getAccessToken } from '../../components/Authentication/RefreshToken';
import { TrackCard } from '../../components/StudentComponents/TrackComplaint/TrackCard';
import StatBox from '../../components/StudentComponents/TrackComplaint/TrackCard';
import TrackHandlerFns from '../../components/StudentComponents/TrackComplaint/TrackHandlerFns';

export default function TrackComplaint(){
  const [mode, setMode] = useState('id')
  const [total, setTotal] = useState(0);
  const [resolved, setResolved] = useState(0);
  const [unresolved, setUnresolved] = useState(0);
  const [complaintId, setComplaintId] = useState('');
  const [studentId, setStudentId] = useState('');

  const [complaints, setComplaints] = useState([]);
  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('hostel');

  useEffect(()=>{
    const getComplaintsStats = async()=>{
      try {
        const result = await getAccessToken();
        if (!result.token) {
          alert("Session expired! Login again to continue");
          window.location.href = "/login";
          return;
        }
        const response = await fetch(`http://localhost:3000/auth/get-info/`, {
          headers: { Authorization: `Bearer ${result.token}` },
        });
        const infoData = await response.json();

        if (response.ok) {
          setStudentId(infoData.id);
          const params = new URLSearchParams({
            studentId: infoData.id
          });

          const res = await fetch(`http://localhost:3000/user/complaints-statistics?${params.toString()}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${result.token}`
            }
          });
          if (!res.ok) {
            throw new Error('Complaint not found');
          }
          const data = await res.json();

          setTotal(data.total);
          setResolved(data.resolved);
          setUnresolved(data.unresolved);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getComplaintsStats();
  }, [])

  const { handleSearch, handleFilter } = TrackHandlerFns({ complaintId, setComplaints, studentId, status, category });

  return (
    <div className="bg-stubgdark w-full h-full py-4 px-[4%] flex flex-col gap-y-3 overflow-auto scrollbar-thin scrollbar-webkit">
      {/* Heading */}
      <div>
        <h1 className="bg-stubgdark text-white py-2 flex justify-center text-2xl md:text-3xl font-bold">
          Complaints Tracking 
        </h1>
        <p className="text-center mb-6 text-gray-300">View and track all hostel and mess complaints</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatBox label="Total Complaints" value={total} />
        <StatBox label="Resolved" value={resolved} color="text-green-400" />
        <StatBox label="Unresolved" value={unresolved} color="text-red-400" />
      </div>

      {/* Toggle Bar and System*/}
      <div className="w-full bg-gray-800 p-4 rounded-lg mb-6 border-gray-700 border-1">
        {/* Toggle btns */}
        <div className='bg-gray-700 w-full flex mb-4 rounded-md p-1'>
          <button className={`w-full py-2 rounded-md ${mode === 'id' ? 'bg-gray-600' : 'bg-gray-700'} cursor-pointer`}
          onClick={() => {
            setMode('id');
            setComplaints([]);
            setComplaintId('');
          }}>
            Search by ID
          </button>

          <button className={`w-full py-2 rounded-md ${mode === 'filter' ? 'bg-gray-600' : 'bg-gray-700'} cursor-pointer`}
          onClick={() => {
            setMode('filter');
            setComplaints([]);
            setComplaintId('');
          }}>
            Browse by Filter
          </button>
        </div>

        {/* Options */}
        {mode === 'id' ? (
          <div className="flex gap-4 items-center">
            <input className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
              placeholder="Enter Complaint ID" value={complaintId}
              onChange={e => setComplaintId(e.target.value)}/>
            <button className="bg-btnblue px-4 py-2 rounded-md cursor-pointer" onClick={handleSearch}>
              Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <select className="bg-gray-700 text-white px-4 py-2 rounded-md" value={status}
              onChange={e => setStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="resolved">Resolved</option>
              <option value="unresolved">Unresolved</option>
            </select>

            <select className="bg-gray-700 text-white px-4 py-2 rounded-md" value={category}
              onChange={e => setCategory(e.target.value)}>
              <option value="hostel">Hostel</option>
              <option value="mess">Mess</option>
            </select>
            <button className="bg-btnblue px-4 py-2 rounded-md cursor-pointer" onClick={handleFilter}>
              Apply Filters
            </button>
          </div>
        )}
      </div>
      
      <div className='space-y-4'>
        {complaints.length > 0 ? (
          complaints.map((item) => ( 
            <TrackCard key={item._id} props={item} /> 
          ))
        ) : (
          <p className="text-gray-400 text-center">No complaints to display.</p>
        )}
      </div>
    </div>
  );
};