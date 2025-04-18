import React from "react";

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
    <nav className="mx-auto flex h-[114px] w-[1170px] items-center">
      <ul className="font-display justify-start">
        <a href="/">
          <li className="flex flex-row gap-1">
            <h1 className="text-h3 text-primary-black font-bold">Trabook</h1>
            <img src="/assets/logo.svg" alt="logo" />
          </li>
        </a>
      </ul>
      <ul className="text-nav flex flex-1 items-center justify-end gap-4 font-sans">
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
