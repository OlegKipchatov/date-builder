import type { ComponentProps } from "react";

export type LabelProps = ComponentProps<"label">;

export const Label = (props: LabelProps) => {
  return <label className="text-sm font-medium" {...props} />;
};
