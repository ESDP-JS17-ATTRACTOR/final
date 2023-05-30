import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout/Layout';
import '../styles/globals.scss';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from '../../constants';
import { addInterceptors } from '../../axiosApi';
import { wrapper } from '@/app/store';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  addInterceptors(store);
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <Layout>
          <Component {...props.pageProps} />
        </Layout>
      </Provider>
    </GoogleOAuthProvider>
  );
}
