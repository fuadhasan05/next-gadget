"use client";
import React from "react";
import clsx from "clsx";

export default function Button({
  children,
  variant = "primary",
  className,
  icon: Icon,            // accept icon as a component
  iconPosition = "left", // left or right
  ...props               // other safe props (like onClick, type, disabled)
}) {
  const base =
    "px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none inline-flex items-center gap-2";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
    outline:
      "border border-gray-300 hover:bg-gray-700 hover:text-white dark:border-gray-600",
  };

  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {iconPosition === "left" && Icon && <Icon className="h-4 w-4" />}
      {children}
      {iconPosition === "right" && Icon && <Icon className="h-4 w-4" />}
    </button>
  );
}