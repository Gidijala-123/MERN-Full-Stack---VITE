import React from "react";
import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
  const theme = useSelector((state) => state.theme.theme); // Access the theme property correctly
  return (
    <div className={theme}>
      <div className="bg-white text-gray-900 dark:text-gray-100 dark:bg-[rgb(16,23,42)] min-h-screen">
        {children}
      </div>
    </div>
  );
}
