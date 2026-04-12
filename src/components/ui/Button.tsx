import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "outline";
  children: ReactNode;
  icon?: ReactNode;
}

export default function Button({
  variant = "primary",
  children,
  icon,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-lg font-display text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 active:scale-95";
  
  const variants = {
    primary: "bg-primary-container text-on-primary editorial-shadow gold-glow hover:bg-primary-container/90",
    secondary: "bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80",
    tertiary: "bg-tertiary-container text-on-tertiary font-bold hover:brightness-110 shadow-sm",
    outline: "border border-outline-variant bg-transparent text-on-surface hover:bg-surface-container-low",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
      {icon && <span className="material-symbols-outlined text-lg">{icon}</span>}
    </button>
  );
}
