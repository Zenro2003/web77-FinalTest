import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import i18n from './i18n'; // Import i18n configuration

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  { i18n } // Truyền i18n vào ở đây
);
