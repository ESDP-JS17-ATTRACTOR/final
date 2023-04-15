import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from "@/components/Layout/Layout";
import '../styles/globals.scss';
import {Provider} from "react-redux";
import {store} from "@/app/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
