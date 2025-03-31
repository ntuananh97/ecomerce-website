import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const handleAxiosError = (error: unknown, defaultMessage: string = "") => {
  if (error instanceof AxiosError) {
    const errorMessage = error.response?.data?.message || defaultMessage;
    toast.error(errorMessage);
    return errorMessage;
  }
  toast.error(defaultMessage);
}; 