import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import scribello from "../assets/images/scribello.png";
import { navLinks } from "../lib/constants";

export default function Navbar() {
  const [toggleMobileNav, setToggleMobileNav] = useState(false);

  function handleToggleMobileMenu() {
    setToggleMobileNav(!toggleMobileNav);
  }
  return (
    <nav className="sticky top-0 bg-white border-b-4 border-b-purple-900 backdrop-blur-xl px-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={scribello} className="w-16" />
          <span className="text-4xl tracking-wide font-text font-extrabold text-purple-900">
            Scribello&trade;
          </span>
        </Link>

        {/* Desk nav */}
        <ul className="hidden lg:flex gap-6">
          {navLinks.map((link, index) => (
            <Link
              to={link.path}
              className="font-bold text-neutral-800 hover:text-purple-600"
            >
              <li key={index}>{link.name}</li>
            </Link>
          ))}
        </ul>

        {/* Mobile nav */}
        <div className="lg:hidden">
          <button onClick={handleToggleMobileMenu}>
            {toggleMobileNav ? (
              <HiOutlineX size={30} />
            ) : (
              <HiOutlineMenuAlt3 size={30} />
            )}
          </button>
        </div>

        {toggleMobileNav && (
          <aside className="lg:hidden bg-neutral-200 shadow-2xl absolute right-0 top-12 z-50 h-[90vh] w-[350px] py-10 flex flex-col justify-center items-center rounded-md">
            <Link to="/" className="flex items-center">
              <img src={scribello} className="w-12 rounded-full" />
              <span className="text-xl tracking-wider font-text font-extrabold text-purple-900">
                Scribello
              </span>
            </Link>
            <hr className="w-[180px] mt-8 border-slate-700" />

            <ul className="flex flex-col justify-center w-full mt-10 space-y-6">
              {navLinks.map((link, index) => (
                <Link to={link.path}>
                  <li
                    key={index}
                    className="flex gap-3 items-center rounded-md w-5/6 mx-auto p-6"
                  >
                    {link.icon}{" "}
                    <span className="font-semibold text-neutral-700 text-xl font-title">
                      {link.name}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </nav>
  );
}
