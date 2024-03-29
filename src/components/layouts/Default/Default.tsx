import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { NavBar } from 'components/elements';

const Default: FC<{ children: ReactNode; pageName: string }> = ({ children, pageName }) => (
  <>
    <Head>
      <title>{`${pageName} | Phoenix Grow Web3 Portfolio`}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <NavBar children={children} />
  </>
);

export default Default;
