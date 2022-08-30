// Import the global style enabling tailwind classes
import "../src/shared/styles/globals.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
      boolean: /(has|is)$/i,
    },
  },
};
