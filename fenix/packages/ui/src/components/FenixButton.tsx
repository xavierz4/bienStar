import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export const FenixButton = ({ variant = "primary", className, ...props }: ButtonProps) => {
  const baseStyles = "px-6 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-md hover:shadow-lg flex items-center justify-center";
  const variants = {
    primary: "bg-primary hover:bg-primary-dark text-white shadow-primary/30",
    secondary: "bg-white text-secondary border border-gray-100 hover:bg-gray-50",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className || ""}`}
      {...props}
    />
  );
};
