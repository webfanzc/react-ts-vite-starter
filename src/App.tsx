import "./App.css";
import { useRoutes } from "react-router-dom";
// @ts-expect-error
import routes from "~react-pages";
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>{useRoutes(routes)}</Suspense>
  );
}

export default App;
