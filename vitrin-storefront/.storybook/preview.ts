
import type { Preview, Decorator } from "@storybook/react";
import { ThemeProvider } from "../components/theme-provider";
import { Vazirmatn } from "next/font/google";
import React from "react";
import "../styles/globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-vazir",
});

const withTheme: Decorator = (Story, context) => {
  const { theme } = context.globals;

  return React.createElement(
    "div",
    { lang: "fa", dir: "rtl", className: vazirmatn.variable },
    React.createElement(
      ThemeProvider,
      {
        attribute: "class",
        defaultTheme: "system",
        enableSystem: true,
        disableTransitionOnChange: true,
        forcedTheme: theme || "light",
      },
      React.createElement(Story)
    )
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withTheme],
};

export default preview;
