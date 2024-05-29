import React, { useState, useEffect, FC } from "react";
import { Menu, Search } from "react-feather";
import PokeSearch from "./PokeSearch";
import { Link } from "react-router-dom";
import { usePokeContext } from "../context/PokeContext";

interface MenuItem {
  label: string;
  path: string;
}

interface MobileMenuProps {
  menuItems: MenuItem[];
}

const getMenuItems = (selectedPokemon: any[]): MenuItem[] => {
  return [
    { label: "Pokedex", path: "/" },
    { label: "Battle", path: selectedPokemon.length === 3 ? "/battle" : "/" },
  ];
};

const MobileMenu: FC<MobileMenuProps> = ({ menuItems }) => (
  <div className="sm:hidden" id="mobile-menu">
    <div className="space-y-1 px-2 pb-3 pt-2">
      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`${
            index === 0 ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
          } block rounded-md px-3 py-2 text-base font-medium`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  </div>
);

const PokeNavbar: FC = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const { selectedPokemon } = usePokeContext();
  const [menuItems, setMenuItems] = useState<MenuItem[]>(getMenuItems(selectedPokemon));

  useEffect(() => {
    setMenuItems(getMenuItems(selectedPokemon));
  }, [selectedPokemon]);

  return (
    <nav className="bg-gray-800 fixed w-full top-0 left-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center flex-1 justify-between sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img className="block h-8 w-auto" src="https://pokeapi.deno.dev/assets/logo/logo.webp" alt="Poke API" />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className={`${
                      index === 0 ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    } rounded-md px-3 py-2 text-sm font-medium`}
                    aria-current="page"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              title={openSearch ? "Close search" : "Open search"}
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setOpenSearch(!openSearch)}
            >
              <Search className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              title={openMobileMenu ? "Close menu" : "Open menu"}
              type="button"
              className="sm:hidden ml-3 relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              onClick={() => setOpenMobileMenu(!openMobileMenu)}
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      {openMobileMenu && <MobileMenu menuItems={menuItems} />}
      {openSearch && <PokeSearch />}
    </nav>
  );
}

export default PokeNavbar;
