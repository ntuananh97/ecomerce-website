import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./contexts/theme-provider";
import LanguageProvider from "./contexts/LanguageProvider";
import QueryProvider from "./contexts/QueryProvider";
import { adminRoutes } from "./modules/admin/routes";
import { clientRoutes } from "./modules/client/routes";
import { useResetSession } from "./hooks/useResetSession";

// Create a data router with proper configuration
const router = createBrowserRouter([...adminRoutes, ...clientRoutes], {
  // This enables the data router API features
  basename: '/'
});

function App() {
  useResetSession();
  
  return (
    <>
      <ThemeProvider>
        <QueryProvider>
          <LanguageProvider>
            <RouterProvider router={router} />
          </LanguageProvider>
        </QueryProvider>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}

export default App;
