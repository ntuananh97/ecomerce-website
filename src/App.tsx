import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from "./contexts/theme-provider";
import LanguageProvider from "./contexts/LanguageProvider";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <AppRoutes />
        </LanguageProvider>
      </ThemeProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
