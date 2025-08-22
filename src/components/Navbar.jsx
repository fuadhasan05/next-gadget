"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FiSun, FiMoon, FiMenu } from "react-icons/fi";
import Button from "./ui/Button";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="bg-base-100 w-full top-0 z-50 sticky shadow-sm">
      <div className="container mx-auto navbar px-4 lg:px-8">
        {/* Left */}
        <div className="navbar-start">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              Next Gadget
            </span>
          </Link>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-4">
            <li>
              <Link
                href="/products"
                className="hover:text-indigo-500 hover:underline"
              >
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

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {session ? (
              <>
                {/* Show user name/email clickable → add-product */}
                <Link href="/dashboard/add-product">
                  <span className="cursor-pointer font-medium text-indigo-600 dark:text-indigo-300 hover:underline">
                    {session.user?.name || session.user?.email}
                  </span>
                </Link>
                <Button variant="secondary" onClick={() => signOut()}>
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button variant="primary">Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile Dropdown */}
          <div className="dropdown dropdown-left">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FiMenu className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-10 w-52 p-2 shadow"
            >
              <li>
                <Link href="/products">Products</Link>
              </li>
              {session && (
                <li>
                  <Link href="/dashboard/add-product">
                    {session.user?.name || session.user?.email}
                  </Link>
                </li>
              )}
              <li>
                {session ? (
                  <button onClick={() => signOut()}>Logout</button>
                ) : (
                  <Link href="/login">
                    <Button variant="primary">Login</Button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
