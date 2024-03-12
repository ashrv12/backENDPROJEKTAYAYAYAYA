import "@/styles/globals.css";
import { ThemeProvider } from "../provider/Themeprovider";
import { AuthProvider } from "@/provider/Authprovider";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}
