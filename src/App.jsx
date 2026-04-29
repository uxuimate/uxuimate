import { useEffect } from "react";
import $ from "jquery";
import { HelmetProvider } from "react-helmet-async";
import AppRouter from "./routes/AppRouter";
import CookieConsentBar from "@/components/CookieConsentBar";
import "@vendor/css/bundle.min.css";
const App = () => {
  useEffect(() => {
    window.$ = window.jQuery = $;
    void import('@vendor/js/contact_us.js');
  }, []);
  return <HelmetProvider>
      <AppRouter />
      <CookieConsentBar />
    </HelmetProvider>;
};
export default App;