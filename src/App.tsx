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

// Create a data router with proper configuration
const router = createBrowserRouter([...adminRoutes, ...clientRoutes], {
  // This enables the data router API features
  basename: '/'
});

function App() {
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
