"use client";

import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("");
  useEffect(() => {
    const currentTheme =
      window.localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(currentTheme);
    const listenStorageChange = () => {
      if (localStorage.getItem("theme") === "light") {
        setTheme("light");
      } else {
        setTheme("dark");
      }
    };
    window.addEventListener("storage", listenStorageChange);
    return () => window.removeEventListener("storage", listenStorageChange);
  }, []);
  return (
    <>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
    </>
  );
};

export default ToastProvider;
