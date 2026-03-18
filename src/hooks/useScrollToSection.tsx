import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router';

export const useScrollToSection = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === 'POP') return;

    const id = location.state?.scrollTo;

    if (!id) return;

    const scroll = () => {
      const el = document.getElementById(id);
      if (!el) return;

      const headerHeight =
        parseFloat(document.documentElement.style.getPropertyValue('--header-height')) || 0;

      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - headerHeight,
        behavior: 'smooth',
      });
    };

    // ожидние рендера DOM-элементов
    requestAnimationFrame(scroll);
  }, [location]);
};
