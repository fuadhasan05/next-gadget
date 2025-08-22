"use client";
import React from "react";
import * as Icons from "react-icons/fi";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  iconName,
  iconPosition = "left",
  className = "",
  type = "button", // default button type
  onClick,
  disabled,
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
    outline:
      "border border-gray-300 hover:bg-gray-700 hover:text-white dark:border-gray-600",
    ghost:
      "text-gray-700 hover:bg-gray-100 focus:ring-indigo-500 dark:text-white dark:hover:bg-gray-800",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const iconSize = {
    sm: 16,
    md: 18,
    lg: 20,
  };

  // ✅ Only accept valid icon names
  const IconComponent = iconName && Icons[iconName] ? Icons[iconName] : null;

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {IconComponent && iconPosition === "left" && (
        <IconComponent size={iconSize[size]} className="mr-2" />
      )}
      {children}
      {IconComponent && iconPosition === "right" && (
        <IconComponent size={iconSize[size]} className="ml-2" />
      )}
    </button>
  );
};

export default Button;