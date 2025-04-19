import logo from '@/assets/mochi.jpg';
import { smoothScrollTo } from "@/helper/scrollBehaviour";

const NavbarMenu = [
  {
    name: "Home",
    href: "#home",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Desitnation",
    href: "#destination",
  },
  {
    name: "Tour",
    href: "#tour",
  },
  {
    name: "Blog",
    href: "#blog",
  },
];

const Navbar: React.FC = (): React.ReactElement => {
  return (
    <nav className="mx-auto flex h-[114px] w-screen items-center">
      <ul className="font-display justify-start ml-15">
        <a href="/">
          <li className="flex flex-row gap-2 align-center">
            <img className="h-[37px] w-[37px]" src={logo} alt="mochi-travel-logo" />
            <h1 className="text-h3 text-primary-black font-bold">Mochi Travel</h1>
          </li>
        </a>
      </ul>
      <ul className="text-nav flex flex-1 items-center justify-end mr-15 gap-4 font-sans">
        {NavbarMenu.map((item, index) => (
          <li key={index} className="text-primary-black cursor-pointer">
            <a
              onClick={(e) => {
                e.preventDefault();
                const section = document.querySelector(item.href);
                if (section) {
                  const offsetTop = section.getBoundingClientRect().top + window.scrollY;
                  smoothScrollTo(offsetTop, 400);
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
