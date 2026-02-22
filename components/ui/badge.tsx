import { Chip } from "@heroui/react";
import type { ComponentProps } from "react";

export type BadgeProps = Omit<ComponentProps<typeof Chip>, "variant" | "color"> & {
  variant?: "default" | "secondary" | "destructive" | "outline";
};

export const Badge = ({ variant = "default", ...props }: BadgeProps) => {
  return (
    <Chip
      variant={variant === "outline" ? "bordered" : "flat"}
      color={variant === "destructive" ? "danger" : "default"}
      {...props}
    />
  );
};
