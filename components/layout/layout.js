import { Fragment } from 'react';
import { SessionProvider } from 'next-auth/react';
import MainNavigation from './main-navigation';

function Layout(props, pageProps) {
  return (
    <Fragment>
      <SessionProvider session={pageProps.session}>
        <MainNavigation />
        <main>{props.children}</main>
      </SessionProvider>

    </Fragment>
  );
}

export default Layout;
