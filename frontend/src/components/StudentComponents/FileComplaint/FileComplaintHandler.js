import { getAccessToken } from "../../Authentication/RefreshToken";
const API_URL = import.meta.env.VITE_API_URL;

export const handleFileComplaintSubmit = async ({
    title, text, category, subCategory, selectedFiles,
    setUploading, resetForm, navigate
}) => {
    if (!title || !text || !category || !subCategory) {
        alert("Please fill in all fields!");
        return false;
    }

    setUploading(true);

    let accessToken;
    try {
        const result = await getAccessToken();
        if (!result.token) {
            alert("Session expired! Login again to continue");
            navigate("/login");  // programmatic navigation
            return false;
        }
        accessToken = result.token;
    } catch (err) {
        console.error("Error fetching token:", err);
        alert("Authentication error!");
        setUploading(false);
        return false;
    }

    let uploadedMedia = [];
    if (selectedFiles.length > 0) {
        const formData = new FormData();
        selectedFiles.forEach((file) => formData.append("files", file));

        try {
            const uploadResponse = await fetch(`${API_URL}/user/upload-complaint`, {
                method: "POST",
                body: formData,
            });

            if (!uploadResponse.ok) throw new Error("Failed to upload files");

            uploadedMedia = await uploadResponse.json();
        } catch (error) {
            console.error("File Upload Error:", error);
            alert("File upload failed!");
            setUploading(false);
            return false;
        }
    }

    const complaintData = {
        category,
        subCategory,
        title,
        content: {
            text,
            media: uploadedMedia,
        },
    };

    try {
        const response = await fetch(`${API_URL}/user/create-complaint`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify(complaintData),
        });

        if (response.ok) {
            alert("Complaint filed successfully!");
            resetForm();
            return true;
        } else {
            alert("Failed to submit complaint");
            return false;
        }
    } catch (error) {
        console.error("Error submitting complaint:", error);
        return false;
    } finally {
        setUploading(false);
    }
};
