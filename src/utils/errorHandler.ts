import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { t } from "i18next";

export enum ErrorType {
  ALREADY_EXIST = "ALREADY_EXIST",
}

export const handleAxiosError = ({
  error,
  defaultMessage = t("error.DEFAULT") || "",
  customErrorMessages,
}: {
  error: unknown;
  defaultMessage?: string;
  customErrorMessages?: Record<keyof typeof ErrorType, string>;
}) => {
  let errorMessage = defaultMessage;

  if (error instanceof AxiosError) {
    const typeError = error.response?.data?.typeError;
    if (typeError in ErrorType) {
      const customMessage = customErrorMessages?.[typeError as keyof typeof ErrorType];
      errorMessage = customMessage || t(`error.${typeError}`) || defaultMessage;
    }
  }
  toast.error(errorMessage);
  return errorMessage;

};
