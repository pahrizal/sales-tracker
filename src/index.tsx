import * as ReactDOMClient from "react-dom/client";
import "./index.css";
import "animate.css";
import App from "./App";

// get the root element
const container = document.getElementById("root") as Element;

// Create a root.
const root = ReactDOMClient.createRoot(container);

// Render the root.
root.render(<App />);
