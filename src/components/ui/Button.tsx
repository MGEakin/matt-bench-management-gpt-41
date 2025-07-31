import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

const variantClasses = {
  primary: "bg-blue-600 text-white",
  secondary: "bg-gray-300 text-gray-900",
  danger: "bg-red-600 text-white",
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => (
  <button
    className={`px-4 py-2 rounded ${variantClasses[variant]} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
