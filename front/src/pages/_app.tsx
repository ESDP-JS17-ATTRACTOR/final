import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout/Layout";
import "../styles/globals.scss";
import { Provider } from "react-redux";
import store, { persistor } from "../app/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "../../constants";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  );
}