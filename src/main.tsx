import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import { AppProviders } from './components';
import App from './App.tsx';

import './i18n.js';
import './styles/global.scss';

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <AppProviders>
      <App />
    </AppProviders>
  </HashRouter>,
);
