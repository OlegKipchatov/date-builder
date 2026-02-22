import { Button as HeroButton } from "@heroui/react";
import type { ComponentProps } from "react";

export type ButtonProps = Omit<ComponentProps<typeof HeroButton>, "variant" | "size" | "color" | "isIconOnly"> & {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
};

const variantMap = {
  default: "solid",
  destructive: "solid",
  outline: "bordered",
  secondary: "flat",
  ghost: "light",
  link: "light",
} as const;

const sizeMap = {
  default: "md",
  sm: "sm",
  lg: "lg",
  icon: "sm",
} as const;

export const Button = ({ variant = "default", size = "default", ...props }: ButtonProps) => {
  return (
    <HeroButton
      variant={variantMap[variant]}
      color={variant === "destructive" ? "danger" : "primary"}
      size={sizeMap[size]}
      isIconOnly={size === "icon"}
      {...props}
    />
  );
};
