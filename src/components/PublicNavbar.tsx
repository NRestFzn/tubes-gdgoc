import logo from '@/assets/mochi.jpg';
import {smoothScrollTo} from '@/helper/scrollBehaviour';
import styles from '@/styles/PublicNavbar.module.css';

import classNames from 'classnames';
import {useNavigate} from 'react-router-dom';

const NavbarMenu = [
  {
    name: 'Home',
    href: '#home',
  },
  {
    name: 'About',
    href: '#about',
  },
  {
    name: 'Desitnation',
    href: '#destination',
  },
  {
    name: 'Tour',
    href: '#tour',
  },
  {
    name: 'Manage',
    href: '#blog',
  },
];

const Navbar: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();

  return (
    <nav className={classNames(styles.root)}>
      <ul className={styles.logo}>
        <a href="/">
          <li>
            <img src={logo} alt="mochi-travel-logo" />
            <h1>Mochi Travel</h1>
          </li>
        </a>
      </ul>
      <ul className={classNames(styles.menu)}>
        {NavbarMenu.map((item, index) => (
          <li key={index}>
            <a
              onClick={(e) => {
                e.preventDefault();
                if (item.name === 'About') {
                  const bottom = document.body.scrollHeight;
                  smoothScrollTo(bottom, 400);
                } else if (item.name === 'Manage') {
                  navigate('/sign-in');
                } else {
                  const section = document.querySelector(item.href);
                  if (section) {
                    const offsetTop =
                      section.getBoundingClientRect().top + window.scrollY;
                    smoothScrollTo(offsetTop, 400);
                  }
                }
              }}
              href={item.href}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
