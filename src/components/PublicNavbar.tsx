import React from "react";
import logo from '@/assets/mochi.jpg';

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
          <a href={item.href} key={index}>
            <li className="text-primary-black">{item.name}</li>
          </a>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
