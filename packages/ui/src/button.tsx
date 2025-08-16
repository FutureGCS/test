"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
}

export const Button = ({ children, className }: ButtonProps) => {
  return (
    <button
      className={className}
      style={{
        backgroundColor: "#2563EB",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
};
