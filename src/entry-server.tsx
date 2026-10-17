// Build-time renderer: scripts/prerender.mjs calls render() for every route and writes
// static HTML, so crawlers that don't run JavaScript (most AI answer engines) see full pages.
import React from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import App from "./App";
import { COMPLETE_PROPERTY_DATA } from "./components/lib/locations";

export { SITE_URL } from "./components/lib/seo";

type Area = { meta_title: string; meta_description?: string };

export const areaPages = Object.entries(COMPLETE_PROPERTY_DATA as Record<string, Area>).map(([key, area]) => ({
  path: `/luxury-apartments-in-${key}`,
  title: area.meta_title,
  description: area.meta_description ?? "",
}));

// Every route in App.tsx. A page missing here is served as a 404 in production.
export const routes = [
  "/",
  "/services",
  "/landlord-services/property-management",
  "/landlord-services/furnishing-solutions",
  "/team",
  "/news",
  ...areaPages.map((page) => page.path),
];

// Rendered to 404.html, which the server returns for unknown URLs
export const notFoundRoute = "/404";

const renderApp = (url: string, helmetContext: { helmet?: HelmetServerState }) =>
  prerenderToNodeStream(
    <React.StrictMode>
      <StaticRouter location={url}>
        <HelmetProvider context={helmetContext}>
          <App />
        </HelmetProvider>
      </StaticRouter>
    </React.StrictMode>,
    // Keep every page section inline. By default React moves large sections into a hidden
    // <div> that a script swaps in, which crawlers without JavaScript read poorly.
    { progressiveChunkSize: Number.POSITIVE_INFINITY }
  );

export async function render(url: string) {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const { prelude } = await renderApp(url, helmetContext);

  // A Node Readable at runtime; the DOM lib types it as a web ReadableStream
  const decoder = new TextDecoder();
  let html = "";
  for await (const chunk of prelude as unknown as AsyncIterable<Uint8Array>) html += decoder.decode(chunk, { stream: true });

  html += decoder.decode();

  const { helmet } = helmetContext;
  const head = helmet
    ? [helmet.title, helmet.meta, helmet.link, helmet.script].map((part) => part.toString()).join("\n    ")
    : "";
  return { html, head };
}
