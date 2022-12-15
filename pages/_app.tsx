import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "@web/components/layout/layout";
import { PageHead } from "@web/components/components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <PageHead title="Events calendar" />
      <Component {...pageProps} />
    </Layout>
  );
}
