const openMenuClassName = 'menu-open';

export const openMenu = () => {
  document.documentElement.classList.add(openMenuClassName);
};
export const closeMenu = () => {
  document.documentElement.classList.remove(openMenuClassName);
};
export const toggleMenu = () => {
  document.documentElement.classList.toggle(openMenuClassName);
};
