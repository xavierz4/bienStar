import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const FenixCard = ({ children, className, onClick }: CardProps) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white p-6 rounded-[20px] shadow-[0_20px_27px_0_rgba(0,0,0,0.05)] hover:shadow-[0_20px_27px_0_rgba(0,0,0,0.1)] transition-all duration-300 ${className || ""}`}
    >
      {children}
    </div>
  );
};
