import { Providers } from "@/redux/app/provider";
import "@/styles/globals.css";
import "react-tooltip/dist/react-tooltip.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <ToastContainer />
      <Component {...pageProps} />
    </Providers>
  );
}
