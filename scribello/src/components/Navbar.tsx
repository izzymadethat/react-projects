import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

import { navLinks } from "../lib/constants";
import mainLogo from "../assets/images/bookbunny-logo.png";
import { useUserContextGlobal } from "../lib/UserContext";

export default function Navbar() {
  const { user, signOut } = useUserContextGlobal();
  const [toggleMobileNav, setToggleMobileNav] = useState(false);

  function handleToggleMobileMenu() {
    setToggleMobileNav(!toggleMobileNav);
  }

  const userButtons = (
    <>
      <button
        onClick={signOut}
        className="px-4 py-2 border border-purple-800 text-purple-800 font-bold font-title rounded-md"
      >
        Sign Out
      </button>
    </>
  );

  const nonUserButtons = (
    <>
      <Link to="/sign-in">
        <button className="px-4 py-2 border border-purple-800 text-purple-800 font-bold font-title rounded-md">
          Sign In
        </button>
      </Link>
      <Link to="/sign-up">
        <button className="px-4 py-2 font-bold font-title bg-purple-800 text-white rounded-md">
          Register
        </button>
      </Link>
    </>
  );
  return (
    <nav className="sticky top-0 bg-white border-b-4 border-b-purple-900 backdrop-blur-xl px-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/src/assets/images/bookbunny-logo.png" className="w-16" />
          <span className="text-4xl tracking-tight font-text font-extrabold bg-gradient-to-r from-purple-900 via-amber-600 to-purple-800 bg-clip-text text-transparent">
            BookBunny&trade;
          </span>
        </Link>

        {/* Desk nav */}
        <div className="hidden lg:flex items-center gap-6">
          <ul className="flex gap-6">
            {navLinks.map((link, index) => (
              <div key={index}>
                <Link
                  to={link.path}
                  className="font-bold text-neutral-800 hover:text-purple-600"
                  key={index}
                >
                  <li>{link.name}</li>
                </Link>
              </div>
            ))}
          </ul>
          <div className="flex gap-2">
            {user ? <>{userButtons}</> : <>{nonUserButtons}</>}
          </div>
        </div>

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
              <img src={mainLogo} className="w-12 rounded-full" />
              <span className="text-xl tracking-wider font-text font-extrabold text-purple-900">
                BookBunny
              </span>
            </Link>
            <hr className="w-[180px] mt-8 border-slate-700" />

            <div className="flex flex-col justify-between items-center h-full  w-full">
              <ul className="flex flex-col justify-center mt-10 gap-6">
                {navLinks.map((link, index) => (
                  <div key={index}>
                    <Link to={link.path}>
                      <li className="flex gap-3 items-center rounded-md w-full mx-auto p-4">
                        {link.icon}{" "}
                        <span className="font-semibold text-neutral-700 text-xl font-title">
                          {link.name}
                        </span>
                      </li>
                    </Link>
                  </div>
                ))}
              </ul>
              <div className="flex gap-4">
                {user ? <>{userButtons}</> : <>{nonUserButtons}</>}
              </div>
            </div>
          </aside>
        )}
      </div>
    </nav>
  );
}
