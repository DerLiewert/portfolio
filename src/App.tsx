import { useEffect, useLayoutEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { HomePage, ProjectPage } from './pages';
import { Header, Footer } from './components';
import { useTheme } from './providers';
import { Theme } from './typescript';

function App() {
  const location = useLocation();
  const { theme } = useTheme();

  useLayoutEffect(() => {
    if (theme === Theme.Dark) {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.dataset.theme = theme;
    }
  }, []);

  useEffect(() => {
    window.scroll({ top: 0 });
  }, [location.pathname]);

  return (
    <div className="wrapper">
      <Header />
      <main className="page">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:slag" element={<ProjectPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
