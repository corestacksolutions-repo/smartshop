import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";
const Navbar = () => {
  const [nav, setNav] = useState(false);
  
  const toggleNav = ()=>{
        setNav(!nav)
        }
  const navLinks = [
    { name: "SEE ALL", path: "/products/shop" },
    { name: "MENS", path: "/products/mens" },
    { name: "WOMENS", path: "/products/womens" },
    { name: "ACCESSORIES", path: "/products/accessories" },
  ];

  return (
    <header className="w-full fixed top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-[1180px] mx-auto px-5">
        <nav className="h-20 flex items-center justify-between">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=200&auto=format&fit=crop"
              alt="Fashion Logo"
              className="w-11 h-11 rounded-full object-cover border border-gray-200"
            />

            <div className="leading-tight">
              <h1 className="text-xl font-bold tracking-wide text-gray-900">
                MODA
              </h1>
              <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
                Fashion Hub
              </p>
            </div>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-all duration-200 relative
                  ${
                    isActive
                      ? "text-black"
                      : "text-gray-500 hover:text-black"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          <Link to='/admin' className=" px-4 py-1 border border-black/70 rounded-md text-[24px] ">
             Admin
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleNav}
            className="md:hidden text-red-800 hover:scale-105 duration-200"
          >
            <HiOutlineMenuAlt4 size={30} />
          </button>
        </nav>
      </div>

      {/* Overlay */}
      {/*REMOVED ONCLICK HANDLER ON OVERLAY BECAUSE IT CONFLICTS WITH NATIVE REMOVE BUTTON ON MENU CONTAINER*/}
      <div
        className={`fixed inset-0 z-50 h-screen bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          nav ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Mobile Menu */}
      <aside
        className={`md:hidden fixed right-0 h-screen w-full bg-white z-50 shadow-2xl transition-all duration-300 ease-in-out
        ${nav ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Top */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-5">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=200&auto=format&fit=crop"
                alt="Logo"
                className="w-10 h-10 rounded-full object-cover"
              />

              <div>
                <h2 className="font-bold text-gray-900">MODA</h2>
                <p className="text-xs text-gray-500">Fashion Hub</p>
              </div>
            </div>

            <button
              onClick={toggleNav}
              className="text-gray-700 hover:text-black duration-200"
            >
              <IoIosClose size={38} />
            </button>
          </div>

          {/* Mobile Links */}
          <div className="flex flex-col mt-10 gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setNav(false)}
                className={({ isActive }) =>
                  `text-lg font-medium border-b border-gray-100 pb-3 transition-all duration-200
                  ${
                    isActive
                      ? "text-black"
                      : "text-gray-500 hover:text-black"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-auto">
            <button className="w-full bg-black text-white py-4 rounded-xl font-medium hover:bg-gray-900 transition-all duration-300">
              <Link to="/products/shop">
                SHOP NOW
              </Link>
            </button>
          </div>
        </div>
      </aside>
    </header>
  );
};

export default Navbar;