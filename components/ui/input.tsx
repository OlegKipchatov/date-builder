import { Input as HeroInput } from "@heroui/react";
import type { ComponentProps } from "react";

export type InputProps = ComponentProps<typeof HeroInput>;

export const Input = (props: InputProps) => {
  return <HeroInput variant="bordered" {...props} />;
};
