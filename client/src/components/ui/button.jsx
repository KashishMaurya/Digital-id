// src/components/ui/button.jsx
import React from "react";

export const Button = ({ children, className = '', variant = 'default', ...props }) => {
  const base = "rounded-2xl font-semibold focus:outline-none transition-all";
  const variants = {
    default: "bg-blue-600 hover:bg-blue-700 text-white",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
  };
  const padding = "px-6 py-3";

  return (
    <button
      className={`${base} ${variants[variant] || ''} ${padding} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
