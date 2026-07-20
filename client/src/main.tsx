import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Disable browser scroll restoration so the page always starts at the top.
// Without this, browsers with 'auto' restoration will scroll back to the
// user's last position on every page reload.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

createRoot(document.getElementById("root")!).render(<App />);
