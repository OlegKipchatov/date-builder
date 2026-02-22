"use client";

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const iconSize = 16;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" size="sm" isIconOnly>
          {theme === "light" ? (
            <Sun key="light" size={iconSize} className="text-default-500" />
          ) : theme === "dark" ? (
            <Moon key="dark" size={iconSize} className="text-default-500" />
          ) : (
            <Laptop key="system" size={iconSize} className="text-default-500" />
          )}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Theme switcher"
        disallowEmptySelection
        selectedKeys={new Set([theme ?? "system"])}
        selectionMode="single"
        onSelectionChange={(keys) => {
          const selectedKey = Array.from(keys)[0];
          if (typeof selectedKey === "string") {
            setTheme(selectedKey);
          }
        }}
      >
        <DropdownItem key="light" startContent={<Sun size={iconSize} className="text-default-500" />}>
          Light
        </DropdownItem>
        <DropdownItem key="dark" startContent={<Moon size={iconSize} className="text-default-500" />}>
          Dark
        </DropdownItem>
        <DropdownItem key="system" startContent={<Laptop size={iconSize} className="text-default-500" />}>
          System
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
