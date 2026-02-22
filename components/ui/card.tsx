"use client";

import {
  Card as HeroCard,
  CardHeader as HeroCardHeader,
  CardBody as HeroCardBody,
  CardFooter as HeroCardFooter,
} from "@heroui/react";
import type { ComponentProps } from "react";

export type CardProps = ComponentProps<typeof HeroCard>;
export type CardHeaderProps = ComponentProps<typeof HeroCardHeader>;
export type CardContentProps = ComponentProps<typeof HeroCardBody>;
export type CardFooterProps = ComponentProps<typeof HeroCardFooter>;
export type CardTitleProps = ComponentProps<"h3">;
export type CardDescriptionProps = ComponentProps<"p">;

export const Card = (props: CardProps) => {
  return <HeroCard {...props} />;
};

export const CardHeader = (props: CardHeaderProps) => {
  return <HeroCardHeader className="flex-col items-start" {...props} />;
};

export const CardTitle = (props: CardTitleProps) => {
  return <h3 className="text-2xl font-semibold" {...props} />;
};

export const CardDescription = (props: CardDescriptionProps) => {
  return <p className="text-sm text-default-500" {...props} />;
};

export const CardContent = (props: CardContentProps) => {
  return <HeroCardBody {...props} />;
};

export const CardFooter = (props: CardFooterProps) => {
  return <HeroCardFooter {...props} />;
};
