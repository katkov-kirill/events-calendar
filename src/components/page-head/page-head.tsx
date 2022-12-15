import Head from "next/head";
import { FC } from "react";

type PageHeadProps = {
  title: string;
};

const PageHead: FC<PageHeadProps> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export { PageHead };
