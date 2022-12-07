import { SWRConfig } from "swr";
import type { AppProps } from 'next/app';
import '../styles/style.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((response) => response.json())
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
