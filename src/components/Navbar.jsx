"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";
import Button from "./ui/Button";
import { FiMenu } from "react-icons/fi";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // avoid hydration mismatch

  return (
    <div className="container mx-auto navbar bg-base-100 px-4 lg:px-8 top-0 z-50 sticky">
      {/* Left */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <FiMenu className="h-6 w-6" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/products">Products</Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            Next Gadget
          </span>
        </Link>
      </div>

      {/* Center (Desktop Menu) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="">
          <li>
            <Link href="/products" className="hover:text-indigo-500 hover:underline">
              Products
            </Link>
          </li>
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-end gap-3">
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2 rounded-lg cursor-pointer"
        >
          {theme === "light" ? (
            <FiMoon className="h-6 w-6 text-gray-700" />
          ) : (
            <FiSun className="h-6 w-6 text-yellow-400" />
          )}
        </button>

        {/* Example Buttons */}
        <Button variant="primary">Login</Button>
      </div>
    </div>
  );
}
