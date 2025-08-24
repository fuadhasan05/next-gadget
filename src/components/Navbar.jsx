"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  FiSun,
  FiMoon,
  FiMenu,
  FiUser,
  FiLogOut,
  FiShoppingCart,
  FiSettings,
} from "react-icons/fi";
import Button from "./ui/Button";
import { useSession, signOut } from "next-auth/react";
import { useUser } from '@/contexts/UserContext';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session, status } = useSession();
  const { user: userData, loading: userLoading } = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSignOut = () => {
    setTimeout(() => {
      signOut({ callbackUrl: "/" });
    }, 200);
  };

  // Get user display name from userData context
  const getUserDisplayName = () => {
    if (userData?.name) {
      return userData.name;
    }

    if (session?.user?.name) {
      return session.user.name;
    }

    if (session?.user?.email) {
      return session.user.email.split("@")[0];
    }

    return "User";
  };

  // Get user email from either source
  const getUserEmail = () => {
    return userData?.email || session?.user?.email || "";
  };

  return (
    <div className="bg-base-100 w-full top-0 z-50 sticky shadow-sm">
      <div className="container mx-auto navbar px-4 lg:px-8">
        {/* Left */}
        <div className="navbar-start">
          {/* Mobile menu button */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <FiMenu className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50"
            >
              <li>
                <Link href="/products" onClick={() => setIsDropdownOpen(false)}>
                  Products
                </Link>
              </li>
              <li>
                {session ? (
                  <Link
                    href="/dashboard/add-product"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Add Product
                  </Link>
                ) : (
                  <Link
                    href="/login?callbackUrl=/dashboard/add-product"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Add Product
                  </Link>
                )}
              </li>
              <li>
                <Link href="/cart" onClick={() => setIsDropdownOpen(false)}>
                  Shopping Cart
                </Link>
              </li>
              {session && (
                <>
                  <li>
                    <Link
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/orders"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      My Orders
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center ml-2 lg:ml-0">
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              Next Gadget
            </span>
          </Link>
        </div>

        {/* Center - Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-6">
            <li>
              <Link
                href="/products"
                className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors font-medium"
              >
                Products
              </Link>
            </li>
            <li>
              {session ? (
                <Link
                  href="/dashboard/add-product"
                  className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors font-medium"
                >
                  Add Product
                </Link>
              ) : (
                <Link
                  href="/login?callbackUrl=/dashboard/add-product"
                  className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors font-medium"
                >
                  Add Product
                </Link>
              )}
            </li>
            <li>
              <Link
                href="/cart"
                className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors font-medium"
              >
                Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* Right */}
        <div className="navbar-end gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 rounded-lg hover:bg-base-200 dark:hover:bg-base-300 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <FiMoon className="h-6 w-6 text-gray-700" />
            ) : (
              <FiSun className="h-6 w-6 text-yellow-400" />
            )}
          </button>

          {/* Shopping Cart (Desktop) */}
          <Link
            href="/cart"
            className="hidden lg:flex p-2 rounded-lg hover:bg-base-200 dark:hover:bg-base-300 transition-colors"
            aria-label="Shopping cart"
          >
            <FiShoppingCart className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </Link>

          {/* Auth Section */}
          {status === "loading" || userLoading ? (
            // Loading skeleton
            <div className="flex items-center gap-3">
              <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="w-16 h-9 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          ) : session ? (
            // User is logged in
            <div className="flex items-center gap-3">
              {/* User info and dropdown */}
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar placeholder flex items-center justify-center"
                >
                  <div className="bg-indigo-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt="User avatar"
                        className="rounded-full w-full h-full object-cover"
                      />
                    ) : (
                      <FiUser className="h-5 w-5" />
                    )}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50"
                >
                  {/* User info */}
                  <li className="menu-title">
                    <span className="text-xs text-gray-500">Signed in as</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {getUserDisplayName()}
                    </span>
                    {getUserEmail() && (
                      <span className="text-xs text-gray-500 truncate">
                        {getUserEmail()}
                      </span>
                    )}
                  </li>
                  <li>
                    <div className="divider my-1"></div>
                  </li>

                  {/* Menu items */}
                  <li>
                    <Link href="/profile" className="justify-between">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/orders">My Orders</Link>
                  </li>
                  <li>
                    <Link href="/settings">
                      <FiSettings className="h-4 w-4" />
                      Settings
                    </Link>
                  </li>
                  <li>
                    <div className="divider my-1"></div>
                  </li>

                  {/* Logout */}
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="text-red-600 dark:text-red-400"
                    >
                      <FiLogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>

              {/* User greeting (desktop) */}
              <div className="hidden lg:flex flex-col items-end">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Hello, {getUserDisplayName()}
                </span>
                {getUserEmail() && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]">
                    {getUserEmail()}
                  </span>
                )}
              </div>

              {/* Logout button (mobile) */}
              <div className="lg:hidden">
                <Button variant="secondary" size="sm" onClick={handleSignOut}>
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            // User is not logged in
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}