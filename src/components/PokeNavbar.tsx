// PokeNavbar.tsx
import React, { useState } from "react";
import { Menu, Search } from "react-feather";
import PokeSearch from "./PokeSearch";

const menuItems = [{ label: "Pokedex" }, { label: "Battle" }];

function MobileMenu() {
  return (
    <div className="sm:hidden" id="mobile-menu">
      <div className="space-y-1 px-2 pb-3 pt-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            type="button"
            className={`${
              index === 0 ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
            } block rounded-md px-3 py-2 text-base font-medium`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function PokeNavbar() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center flex-1 justify-between sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img className="block h-8 w-auto" src="https://pokeapi.deno.dev/assets/logo/logo.webp" alt="Poke API" />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`${
                      index === 0 ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    } rounded-md px-3 py-2 text-sm font-medium`}
                    aria-current="page"
                  >
                    {item.label}
                  </button>
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
      {openMobileMenu && <MobileMenu />}
      {openSearch && <PokeSearch />}
    </nav>
  );
}
