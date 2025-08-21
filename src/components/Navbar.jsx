// src/components/Navbar.jsx
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiShoppingBag,
  FiPlusCircle,
} from "react-icons/fi";
import Button from "./ui/Button";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    setMounted(true);

    // Check if user is logged in by looking for auth token in localStorage
    const checkAuthStatus = () => {
      try {
        const authData = localStorage.getItem("next-auth-session");
        if (authData) {
          const parsedData = JSON.parse(authData);
          setSession(parsedData);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      }
    };

    checkAuthStatus();

    // Listen for storage changes (for cross-tab sync)
    const handleStorageChange = (e) => {
      if (e.key === "next-auth-session") {
        if (e.newValue) {
          setSession(JSON.parse(e.newValue));
        } else {
          setSession(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleSignOut = () => {
    // Clear the session from localStorage and state
    localStorage.removeItem("next-auth-session");
    setSession(null);
    window.dispatchEvent(new Event("storage"));

    // Redirect to home page
    window.location.href = "/";
  };

  if (!mounted) return null; // avoid hydration mismatch

  return (
    <nav className="bg-base-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left - Logo and mobile menu */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                aria-label="Open menu"
              >
                {isMenuOpen ? (
                  <FiX className="h-6 w-6" />
                ) : (
                  <FiMenu className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Logo */}
            <Link href="/" className="ml-2 lg:ml-0 flex items-center">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                Next Gadget
              </span>
            </Link>
          </div>

          {/* Center - Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <div className="flex space-x-8">
              <Link
                href="/products"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
              >
                Products
              </Link>
              {session && (
                <Link
                  href="/dashboard/add-product"
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
                >
                  Add Product
                </Link>
              )}
            </div>
          </div>

          {/* Right - Theme toggle and auth buttons */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-md transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <FiMoon className="h-5 w-5" />
              ) : (
                <FiSun className="h-5 w-5" />
              )}
            </button>

            {/* Auth buttons */}
            {session ? (
              <div className="flex items-center space-x-3">
                <span className="hidden md:inline text-sm text-gray-600 dark:text-gray-400">
                  Hi, {session.user?.name || "User"}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  icon={FiLogOut}
                  onClick={handleSignOut}
                  className="hidden md:flex"
                >
                  Sign Out
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={FiLogOut}
                  onClick={handleSignOut}
                  className="md:hidden"
                  aria-label="Sign out"
                />
              </div>
            ) : (
              <Link href="/login">
                <Button variant="primary" size="sm" icon={FiUser}>
                  <span className="hidden md:inline">Login</span>
                  <span className="md:hidden">Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-2 py-4">
            <div className="flex flex-col space-y-4 px-4">
              <Link
                href="/products"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>

              {session && (
                <Link
                  href="/dashboard/add-product"
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Add Product
                </Link>
              )}

              {session ? (
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium py-2 text-left"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
