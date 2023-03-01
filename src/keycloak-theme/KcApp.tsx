/* eslint-disable react/jsx-props-no-spreading */
import './KcApp.css';
import { lazy, Suspense } from 'react';
import Fallback, { defaultKcProps, type KcProps } from 'keycloakify';
import DefaultTemplate from 'keycloakify/lib/Template';
import type { KcContext } from './kcContext';
import { useI18n } from './i18n';
import Template from './Template';

const Login = lazy(() => import('./pages/Login'));
// If you can, favor register-user-profile.ftl over register.ftl, see: https://docs.keycloakify.dev/realtime-input-validation
const Terms = lazy(() => import('./pages/Terms'));
const Info = lazy(() => import('keycloakify/lib/pages/Info'));

// This is like editing the theme.properties
// https://github.com/keycloak/keycloak/blob/11.0.3/themes/src/main/resources/theme/keycloak/login/theme.properties
const kcProps: KcProps = {
  ...defaultKcProps,
  // NOTE: The classes are defined in ./KcApp.css
  // You can add your classes alongside thoses that are present in the default Keycloak theme...
  kcHtmlClass: [...defaultKcProps.kcHtmlClass, 'my-root-class'],
  // ...or overwrite
  // "kcHeaderWrapperClass": "my-color my-font"
};

export default function App(props: { kcContext: KcContext; }) {
  const { kcContext } = props;

  const i18n = useI18n({ kcContext });

  if (i18n === null) {
    return null;
  }

  const pageProps = { i18n, Template, ...kcProps };

  return (
    <Suspense>
      {(() => {
        switch (kcContext.pageId) {
          case 'login.ftl': return <Login {...{ kcContext, ...pageProps }} />;
          case 'terms.ftl': return <Terms {...{ kcContext, ...pageProps }} />;
            // We choose to use the default Template for the
            // Info page and to download the theme resources.
          case 'info.ftl': return <Info {...{ kcContext, ...pageProps }} Template={DefaultTemplate} doFetchDefaultThemeResources />;
          default: return <Fallback {...{ kcContext, ...pageProps }} />;
        }
      })()}
    </Suspense>
  );
}
