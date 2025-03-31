import useAuthStore from "@/store/useAuthStore";
import { useEffect } from "react";

export const useResetSession = () => {
  const { logout, rememberMe } = useAuthStore();
  useEffect(() => {
    const handleBeforeUnload = () => {
      logout();
    };
    if (!rememberMe) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      if (!rememberMe) {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      }
    };
  }, [rememberMe, logout]);
};
