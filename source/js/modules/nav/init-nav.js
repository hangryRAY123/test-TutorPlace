import {FocusLock} from '../../utils/focus-lock';

export const initNav = () => {
  const header = document.querySelector('.header');
  const overlay = document.querySelector('.header__overlay');
  const headerToggle = document.querySelector('.header__toggle');
  const nav = document.querySelector('.nav');
  const isEscapeKey = (key) => key === 'Escape';
  const focus = new FocusLock();

  header.classList.remove('header--no-js');

  const navClose = () => {
    headerToggle.classList.remove('is-active');
    nav.classList.remove('nav--open');
    header.classList.remove('header--nav-open');
    focus.unlock();
    document.removeEventListener('keydown', onEscKeydown);
  };

  const navOpen = () => {
    headerToggle.classList.add('is-active');
    nav.classList.add('nav--open');
    header.classList.add('header--nav-open');
    focus.lock('.header', false);
    document.addEventListener('keydown', onEscKeydown);
  };

  const onEscKeydown = (evt) => {
    if (isEscapeKey(evt.key)) {
      evt.preventDefault();
      navClose();
    }
  };

  if (headerToggle) {
    headerToggle.addEventListener('click', () => {
      if (headerToggle.classList.contains('is-active')) {
        navClose();
      } else {
        navOpen();
      }
    });
  }

  overlay.addEventListener('click', navClose);
};
