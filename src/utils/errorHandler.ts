import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const handleAxiosError = (error: unknown, defaultMessage: string = "An unexpected error occurred") => {
  if (error instanceof AxiosError) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(errorMessage);
    return errorMessage;
  }
  toast.error(defaultMessage);
}; 