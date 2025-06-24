import React, { useEffect, useState } from 'react';
import { getAccessToken } from '../../components/Authentication/RefreshToken';
import { Navigate } from 'react-router-dom';
import { MediaDisplay } from '../../components/StudentComponents/MediaDisplay';
const API_URL = import.meta.env.VITE_API_URL;

export function MessMenu() {
  const [college, setCollege] = useState('');
  const [hostel, setHostel] = useState('');
  const [sessionExpired, setSessionExpired] = useState(false);
  const [error, setError] = useState('');
  const [updatedDate, setUpdatedDate] = useState('');
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const fetchStudentInfo = async () => {
      const result = await getAccessToken();
      if (!result.token) {
        alert("Session expired! Login again to continue");
        setSessionExpired(true);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/auth/get-info/`, {
          headers: { Authorization: `Bearer ${result.token}` },
        });

        const data = await res.json();
        if (res.ok) {
          setCollege(data.college);
          setHostel(data.hostel);
        } else {
          throw new Error(data.error || 'Failed to fetch student info');
        }
      } catch (err) {
        console.error(err.message);
        setError("Failed to fetch user info.");
        setLoading(false);
      }
    };

    fetchStudentInfo();
  }, []);

  useEffect(() => {
    const fetchMenu = async () => {
      if (!college || !hostel) return;

      try {
        const res = await fetch(`${API_URL}/user/mess/menu?college=${college}&hostel=${hostel}`);
        const data = await res.json();

        if (res.ok) {
          const formatted = [
            {
              type: "image",
              url: data.imageUrl
            }
          ];
          setMedia(formatted);

          const formattedDate = new Date(data.updatedDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          });

          setUpdatedDate(formattedDate);
        } else {
          setError(data.error || 'Mess menu not found');
        }
      } catch (err) {
        console.error(err.message);
        setError('Error loading mess menu');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [college, hostel]);

  if (sessionExpired) return <Navigate to="/login" />;
  return (
    <div className="bg-stubgdark w-full h-full p-4 flex flex-col gap-y-5 overflow-auto scrollbar-thin scrollbar-webkit">
        <div className="bg-stubgdark text-dashtext flex justify-center text-xl md:text-3xl font-bold">
          Mess Menu
        </div>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : media ? (
        <> 
          <div className="flex justify-center text-md md:text-lg text-menusecondary">
            Last updated on : {updatedDate}
          </div>
          <MediaDisplay media={media}/>
        </>
        
      ) : (
        <p>No mess menu available yet.</p>
      )}
    </div>
  );
}
