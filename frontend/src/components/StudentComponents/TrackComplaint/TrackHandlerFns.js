import axios from "axios";
import { getAccessToken } from "../../Authentication/RefreshToken";

const TrackHandlerFns = ({ complaintId, setComplaints, studentId, status, category }) => {

    const handleSearch = async () => {
        if (!complaintId.trim()) {
            alert("Please enter a Complaint ID");
            return;
        }
        setComplaints([]);
        const result = await getAccessToken();
        if (!result.token) {
            alert("Session expired! Login again to continue");
            window.location.href = "/login";
            return;
        }

        try {
            const params = new URLSearchParams({
                complaintId,
                studentId
            });

            const res = await fetch(`http://localhost:3000/user/complaint-search-by-id?${params.toString()}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${result.token}`
                }
            });
            if (!res.ok) {
                throw new Error('Complaint not found');
            }
            const data = await res.json();
            setComplaints(Array.isArray(data) ? data : [data]);
        } catch (error) {
            console.error(error);
        }
    }

    const handleFilter = async () => {
        setComplaints([]);
        const result = await getAccessToken();
        if (!result.token) {
            alert("Session expired! Login again to continue");
            window.location.href = "/login";
            return;
        }
        try {
            const params = new URLSearchParams({
                studentId,
                status,
                category
            });

            const res = await fetch(`http://localhost:3000/user/complaint-browse-by-filter?${params.toString()}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${result.token}`
                }
            });
            if (!res.ok) {
                throw new Error('Complaint not found');
            }
            const data = await res.json();
            setComplaints(Array.isArray(data) ? data : [data]);

        } catch (error) {
            console.error(error);
        }
    }

    return { handleSearch, handleFilter };
};

export default TrackHandlerFns;