import {toast} from "react-toastify";

export function ErrorMsg(error){
    if (error.response && error.response.data.errors) {
        const errors = error.response.data.errors;

        // Check for email validation error
        if(errors.phone)    toast.error(errors.phone._errors[0]);
        else if(errors.email)     toast.error(errors.email._errors[0]); // Show error to user
        else if(errors.password)    toast.error(errors.password._errors[0]); // Show password error
        else    toast.error("Signup failed. Please check your inputs.");
    } 
    else if (error.response && error.response.status === 400) {
        toast.error(error.response.data.msg);
    }
    else{
        console.error("Error signing up:", error);
        toast.error("Signup failed. Check your credentials.");
    }
}