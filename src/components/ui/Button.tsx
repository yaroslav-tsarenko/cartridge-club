import { cn } from "@/lib/ui";

type Variant = "primary" | "secondary" | "ghost" | "sun";

const variants: Record<Variant, string> = {
  primary: "bg-red text-white",
  secondary: "bg-cobalt text-white",
  ghost: "bg-transparent text-cobalt",
  sun: "bg-sun text-ink",
};

export function Button({
  children,
  variant = "primary",
  className,
  size = "md",
  as = "button",
  href,
  type = "button",
  ...rest
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  size?: "sm" | "md" | "lg";
  as?: "button" | "a";
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
} & React.HTMLAttributes<HTMLElement>) {
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-[0.95rem]",
    lg: "px-7 py-3.5 text-lg",
  };
  const classes = cn(
    "cc-stamp cc-outline inline-flex items-center justify-center gap-2 rounded-xl font-heading tracking-tight",
    "hover:brightness-[1.03]",
    variants[variant],
    sizes[size],
    className
  );
  if (as === "a") {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
