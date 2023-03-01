import { createRoot } from 'react-dom/client';
import { StrictMode, lazy, Suspense } from 'react';
import { kcContext } from './keycloak-theme/kcContext';
import '@fontsource/roboto';

const App = lazy(() => import('./App'));
const KcApp = lazy(() => import('./keycloak-theme/KcApp'));

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense>
      {kcContext === undefined
        ? <App />
        : <KcApp kcContext={kcContext} />}
    </Suspense>
  </StrictMode>,
);
