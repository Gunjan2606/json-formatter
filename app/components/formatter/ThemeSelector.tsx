"use client";

import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Palette, Moon, Sun } from "lucide-react";

interface ThemeSelectorProps {
  theme: "vs-dark" | "light";
  onThemeChange: (theme: "vs-dark" | "light") => void;
}

export const ThemeSelector = ({ theme, onThemeChange }: ThemeSelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" title="Change theme">
          <Palette className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover">
        <DropdownMenuItem
          onClick={() => onThemeChange("vs-dark")}
          className="gap-2 cursor-pointer"
        >
          <Moon className="w-4 h-4" />
          Dark Theme
          {theme === "vs-dark" && <span className="ml-auto text-primary">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onThemeChange("light")}
          className="gap-2 cursor-pointer"
        >
          <Sun className="w-4 h-4" />
          Light Theme
          {theme === "light" && <span className="ml-auto text-primary">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
