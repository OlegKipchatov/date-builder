"use client";

import { Checkbox as HeroCheckbox } from "@heroui/react";
import type { ComponentProps } from "react";

export type CheckboxProps = ComponentProps<typeof HeroCheckbox>;

export const Checkbox = (props: CheckboxProps) => {
  return <HeroCheckbox size="sm" {...props} />;
};
