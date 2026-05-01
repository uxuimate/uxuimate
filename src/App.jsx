import { HelmetProvider } from "react-helmet-async";
import AppRouter from "./routes/AppRouter";
import CookieConsentBar from "@/components/CookieConsentBar";
import "@vendor/css/bundle.min.css";
const App = () => {
  return <HelmetProvider>
      <AppRouter />
      <CookieConsentBar />
    </HelmetProvider>;
};
export default App;