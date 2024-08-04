import { Providers } from "@/redux/app/provider";
import "@/styles/globals.css";
import "react-tooltip/dist/react-tooltip.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/redux/app/store";
import { useEffect } from "react";
// import WOW from 'wow.js'
import { useRouter } from "next/router";
import PlaceBidModal from "@/components/modal/PlaceBidModal";
import LogoutModal from "@/components/modal/LogoutModal";
import createApolloClients from "@/graphql/apollo-client"
import { ApolloProvider } from "@apollo/client";

if (typeof window !== "undefined") {
  import("bootstrap");
}

const client = createApolloClients();

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()
  useEffect(() => {
    // if (typeof window !== "undefined") {
    //   new WOW({
    //     live: false,
    //   }).init();
    // }

  }, [pathname]);
  return (
    <ApolloProvider client={client}>

      <Providers>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer />
          <PlaceBidModal />
          <LogoutModal />


          <Component {...pageProps} />
        </PersistGate>

      </Providers>
    </ApolloProvider>

  );
}
