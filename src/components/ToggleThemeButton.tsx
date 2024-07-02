"use client";

import { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import DynamicIcon from "./DynamicIcon";

const ToggleThemeButton = () => {
  const [theme, setTheme] = useState("");
  useEffect(() => {
    const currentTheme =
      window.localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(currentTheme);
    themeChange(false);
  }, []);
  const handleThemeChange = () => {
    const currentTheme = theme;
    if (currentTheme === "dark") {
      window.localStorage.setItem("theme", "light");
      window.dispatchEvent(new Event("storage"));
      setTheme("light");
      themeChange(false);
    } else {
      window.localStorage.setItem("theme", "dark");
      window.dispatchEvent(new Event("storage"));
      setTheme("dark");
      themeChange(false);
    }
  };
  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        checked={theme === "dark" || !theme}
        data-toggle-theme="dark,light"
        data-act-class="ACTIVECLASS"
        onChange={handleThemeChange}
      />
      <div className="swap-on">
        <DynamicIcon name="sun" size="lg" />
      </div>
      <div className="swap-off">
        <DynamicIcon name="moon" size="lg" />
      </div>
    </label>
  );
};

export default ToggleThemeButton;
