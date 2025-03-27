import { login, register } from '@/services/api/authService';
import { ILoginFormValues, IRegisterFormValues } from '@/types/authTypes';
import { IUser } from '@/types/userTypes';
import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  access_token?: string;
  refresh_token?: string;
  loading: {
    login: boolean;
    logout: boolean;
    register: boolean;
  };
  login: (data: ILoginFormValues) => Promise<void>;
  register: (data: IRegisterFormValues) => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: {
        login: false,
        logout: false,
        register: false,
      },

      login: async (data: ILoginFormValues) => {
        set((state) => ({ loading: { ...state.loading, login: true } }));
        try {
          const response = await login(data);
          
          set({
            user: response.data.user,
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
            isAuthenticated: true,
            loading: { ...useAuthStore.getState().loading, login: false },
          });
        } catch (error) {
          set((state) => ({ loading: { ...state.loading, login: false } }));
          throw error;
        }
      },

      register: async (data: IRegisterFormValues) => {
        set((state) => ({ loading: { ...state.loading, register: true } }));
        try {
          await register(data);
          set((state) => ({ loading: { ...state.loading, register: false } }));
        } catch (error) {
          set((state) => ({ loading: { ...state.loading, register: false } }));
          throw error;
        }
      },

      logout: async () => {
        set((state) => ({ loading: { ...state.loading, logout: true } }));
        try {
          // Add API logout call here if needed
          set({
            user: null,
            access_token: undefined,
            refresh_token: undefined,
            isAuthenticated: false,
            loading: { ...useAuthStore.getState().loading, logout: false },
          });
        } catch (error) {
          set((state) => ({ loading: { ...state.loading, logout: false } }));
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage', // unique name for localStorage
      partialize: (state) => ({ 
        // user: state.user,
        isAuthenticated: state.isAuthenticated,
        access_token: state.access_token,
        refresh_token: state.refresh_token,
      }), // only persist these fields
    }
  )
);

export default useAuthStore;

// Trong component
//   const { login, loading } = useAuthStore();
//   const isLoginLoading = loading.login;
